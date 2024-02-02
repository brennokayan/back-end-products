import { prisma } from "../prisma";

class ProductController {
  async ReadAllProducts(request: any, reply: any) {
    const {
      take,
      pages,
      search,
      orderBy = "price" || "name" || "createdAt",
    } = request.query;
    const GetAllProducts = await prisma.product.findMany({
      // select:{
      //     id: true,
      //     name: true,
      //     price: true,
      //     description: true,
      //     // category: true
      // },
      where: {
        name: {
          contains: search ? search : "",
          mode: "insensitive",
        },
      },
      orderBy: orderBy
        ? {
            [orderBy]: "asc",
          }
        : {
            id: "asc",
          },

      take: take ? parseInt(take) : 5,
      skip: pages ? (parseInt(pages) - 1) * take : 0,
    });
    const total = await prisma.product.count();
    const totalPage = take ? Math.ceil(total / parseInt(take)) : 0;
    reply
      .send({ data: GetAllProducts, totalItens: total, totalPages: totalPage })
      .code(200);
  }
  async CreateProduct(request: any, reply: any) {
    const { name, price, description } = request.body;
    const PostProduct = await prisma.product.create({
      data: {
        name,
        price,
        description,
      },
    });
    reply.send("Product created successfully").code(201);
  }
  async createManyProducts(Request: any, reply: any) {
    const { products } = Request.body;
    const CreateManyProducts = await prisma.product.createMany({
      data: products,
    });
    reply.send("Products created successfully").code(201);
  }
}

export { ProductController };
