import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

//METODOS: GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS
const app = fastify();

const prisma = new PrismaClient();

app.post('/poll', async (request, reply) => {
    const createPollBody = z.object({
        tittle: z.string()
    });

    const { tittle } = createPollBody.parse(request.body);

    const poll = await prisma.poll.create({
        data: {
            tittle,
        }
    });

    return reply.status(201).send({ pollId: poll.id });
});

app.listen({ port: 3333 }).then(() => {
    console.log("HTTP Server running now!");
});