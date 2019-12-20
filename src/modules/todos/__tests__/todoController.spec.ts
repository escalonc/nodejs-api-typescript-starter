import request from 'supertest';
import ApplicationServer from '../../../server';
import { Container } from 'typedi';
import DefaultConnectionFactory from '../../../data/factories/defaultConnectionFactory';

const app = new ApplicationServer(
  Container.get(DefaultConnectionFactory)
).bootstrap();

test('returns something', () => {
  request(app)
    .get('/todo')
    .expect('Content-Type', /json/)
    .expect(200);
});
