import fastify from "fastify";
import { routes } from "./routes/Routes";
import Cors from "@fastify/cors"
const app = fastify();
app.register(routes);
app.register(Cors, {
    origin: "*"
});
app.listen({
    host: "0.0.0.0",
    port: process.env.PORT ? parseInt(process.env.PORT) : 3333
}).then(() => {console.log("Server is running")})