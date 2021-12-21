import { ApolloError } from "apollo-server";
import {
  CreateProductInput,
  GetProductInput,
  User,
  ProductModel,
} from "../schemas";

export class ProductService {
  async createProduct(input: CreateProductInput & { user: User["_id"] }) {
    return ProductModel.create(input);
  }

  async findProducts() {
    return ProductModel.find().lean();
  }

  async getProduct(input: GetProductInput) {
    const product = await ProductModel.findOne(input).lean();
    if (!product) throw new ApolloError("No product with that id!");
    return product;
  }
}
