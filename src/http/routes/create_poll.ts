import { FastifyInstance } from "fastify"
import { prisma } from "../../lib/prisma"
import { z } from "zod"

export async function createPoll(app: FastifyInstance) {
    app.post('/polls', async (request, reply) => {
        const createPollBody = z.object({
            tittle: z.string(),
            options: z.array(z.string())
        })
    
        const { tittle, options } = createPollBody.parse(request.body)
    
        const poll = await prisma.poll.create({
            data: {
                tittle,
                options: {
                    createMany: {
                        data: options.map(option => {
                            return { tittle: option }
                        })
                    }
                }
            }
        })

        return reply.status(201).send({ pollId: poll.id })
    })
}