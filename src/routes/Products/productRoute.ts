import fastify, { FastifyInstance, FastifyPluginOptions } from "fastify";
import { ProductController } from "../../controllers/productController";
const ProductControllers = new ProductController();
const ProductRoute = async (
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) => {
  fastify.get("/produtos", ProductControllers.ReadAllProducts);
  fastify.post("/produto", ProductControllers.CreateProduct);
  fastify.post("/produtos", ProductControllers.createManyProducts);
};

export { ProductRoute };
