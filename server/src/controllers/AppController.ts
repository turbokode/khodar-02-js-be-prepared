import { FastifyRequest, FastifyReply } from 'fastify';
import { db } from '../database';
import dayjs from 'dayjs';

interface StatsProps {
  [unknown: string]: {
    total: number;
    recent: number;
  };
}

export class AppController {
  async getStats(request: FastifyRequest, reply: FastifyReply) {
    const stats: StatsProps = {};
    console.log(dayjs().subtract(28, 'day').format());
    const date = dayjs().subtract(28, 'day').format();
    const subscribers = await db.$queryRaw`
			SELECT
				COUNT (*) FILTER (WHERE verified = true) AS total,
				COUNT (*) FILTER (WHERE created_at > ${new Date(date)}) AS recent
			FROM subscribers`;
    const serializedSubscribers = {
      total: Number(subscribers[0].total),
      recent: Number(subscribers[0].recent)
    };
    stats.subscribers = serializedSubscribers;
    return reply.send(stats);
  }
}
