import Fastify from 'fastify';
import { routes } from './routes';
import './database/redis';

const fastify = Fastify({
  logger: true
});

fastify.register(routes);

fastify.listen({ port: 3333 }).then(() => {
  console.log(`Server listening to 3333`);
});
