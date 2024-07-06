import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { db } from '../database';

export class AlertController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const AlertSchema = z.object({
      title: z.string(),
      message: z.string(),
      provinceId: z.string(),
      districtId: z.string()
    });

    const { title, message, districtId, provinceId } = AlertSchema.parse(request.body);
    const district = await db.district.findUnique({
      where: {
        id: districtId,
        provinceId
      }
    });
    if (!district) {
      return reply.status(400).send({ error: 'Distrito nao pertencente a provincia' });
    }
    //enviar notificacoes
    const alert = await db.alert.create({
      data: {
        title,
        message,
        districtId,
        provinceId
      }
    });

    return reply.send(alert);
  }
}
