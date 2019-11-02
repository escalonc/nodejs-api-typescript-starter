import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import express, {Application} from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import 'reflect-metadata';
import {
  useContainer as routingUseContainer,
  useExpressServer,
} from 'routing-controllers';
import signale from 'signale';
import {Container} from 'typedi';
import {createConnection, useContainer as ormUseContainer} from 'typeorm';

dotenv.config();

export default class Server {
  public static bootstrap(): Application {
    this.configureServices();
    this.configureDatabase();
    this.configureMiddleware();
    this.configureRoutes();

    return this.app;
  }
  private static app: Application = express();

  private static configureServices(): void {
    routingUseContainer(Container);
    ormUseContainer(Container);
  }

  private static configureDatabase(): void {
    createConnection().catch(error =>
      signale.error('Error when trying to create a database', error)
    );
  }

  private static configureRoutes(): void {
    useExpressServer(this.app, {
      controllers: [`${__dirname}/**/*Controller.{ts,js}`],
      cors: true,
    });
  }

  private static configureMiddleware(): void {
    this.app.use(cors());
    this.app.use(compression());
    this.app.use(bodyParser.urlencoded({extended: true}));
    this.app.use(bodyParser.json());
    this.app.use(helmet());
    this.app.use(morgan('dev'));
  }
}
