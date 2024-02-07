import fastify from 'fastify'
import { createPoll } from './routes/create_poll';

//METODOS: GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS
const app = fastify();

app.register(createPoll)

app.listen({ port: 3333 }).then(() => {
    console.log("HTTP Server running now!");
});