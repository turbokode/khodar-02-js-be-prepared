import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import { initializeApp } from 'firebase-admin/app';
import { routes } from './routes';
import './database/redis';
import { firebaseConfig } from './config/firebase';
import { PORT } from './utils/env';

initializeApp(firebaseConfig);

const fastify = Fastify({
  logger: true
});

fastify.register(cors, {
  origin: '*'
});

fastify.register(routes);

fastify.listen({ port: PORT }).then(() => {
  console.log(`Server listening to ${PORT}`);
});
