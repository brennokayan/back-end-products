import { FastifyInstance } from "fastify";
import { ProductRoute } from "./Products/productRoute";
export const routes = async (fastify: FastifyInstance) => {
  fastify.register(ProductRoute);
};
