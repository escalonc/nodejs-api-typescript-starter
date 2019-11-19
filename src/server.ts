import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import express, {Application} from "express";
import helmet from "helmet";
import morgan from "morgan";
import "reflect-metadata";
import {
  useContainer as routingUseContainer,
  useExpressServer,
  getMetadataArgsStorage,
} from "routing-controllers";
import {routingControllersToSpec} from "routing-controllers-openapi";
import signale from "signale";
import swaggerUi from "swagger-ui-express";
import {Container} from "typedi";
import {useContainer as ormUseContainer} from "typeorm";
import {validationMetadatasToSchemas} from "class-validator-jsonschema";
import {getFromContainer, MetadataStorage} from "class-validator";
import DatabaseConnectionFactory from "data/factories/databaseConnectionFactory";

dotenv.config();

export default class Server {
  private readonly controllersConfiguration = {
    controllers: [`${__dirname}/**/*Controller.{ts,js}`],
    cors: true,
  };

  constructor(private readonly connectionFactory: DatabaseConnectionFactory) {}

  public bootstrap(): Application {
    this.configureServices();
    this.configureDatabase();
    this.configureMiddleware();
    this.configureRoutes();

    return this.app;
  }

  private app: Application = express();

  private configureServices(): void {
    routingUseContainer(Container);
    ormUseContainer(Container);
  }

  private configureDatabase(): void {
    this.connectionFactory
      .create()
      .catch(error =>
        signale.error("Error when trying to create a database", error),
      );
  }

  private configureRoutes(): void {
    useExpressServer(this.app, this.controllersConfiguration);

    const metadatas = (getFromContainer(MetadataStorage) as any)
      .validationMetadatas;
    const schemas = validationMetadatasToSchemas(metadatas, {
      refPointerPrefix: "#/components/schemas/",
    });
    const storage = getMetadataArgsStorage();
    const spec = routingControllersToSpec(
      storage as any,
      this.controllersConfiguration,
      {
        components: {schemas},
        info: {title: "Node.js TypeScript API Boilerplate", version: "1.0.0"},
      },
    );
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spec));
  }

  private configureMiddleware(): void {
    this.app.use(cors());
    this.app.use(compression());
    this.app.use(bodyParser.urlencoded({extended: true}));
    this.app.use(bodyParser.json());
    this.app.use(helmet());
    this.app.use(morgan("dev"));
  }
}
