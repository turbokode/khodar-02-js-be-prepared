import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { authConfig } from '../config/auth';

export function authHook(request: FastifyRequest, reply: FastifyReply, done: (error?: FastifyError) => void) {
  console.log(request.headers);
  const [, token] = z.string().parse(request.headers.authorization).split(' ');

  try {
    const payload = jwt.verify(token, authConfig.secret);
    done();
  } catch (error) {
    console.log(error);
    return reply.status(401).send({ error: 'Falha de autenticacao' });
  }
}
