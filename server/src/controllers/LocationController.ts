import { FastifyReply, FastifyRequest } from 'fastify';
import { db } from '../database';
import { z } from 'zod';

export class LocationController {
  async listProvinces(request: FastifyRequest, reply: FastifyReply) {
    const provinces = await db.province.findMany();
    return reply.send(provinces);
  }
  async listDistricts(request: FastifyRequest, reply: FastifyReply) {
    const ParamsSchema = z.object({
      provinceId: z.string()
    });
    const { provinceId } = ParamsSchema.parse(request.params);
    const districts = await db.district.findMany({
      where: {
        provinceId
      }
    });
    return reply.send(districts);
  }
}
