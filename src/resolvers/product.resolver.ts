import { ProductService } from "../services";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { CreateProductInput, GetProductInput, Product } from "../schemas";
import { ApolloError } from "apollo-server";
import { Context } from "../types";

@Resolver()
export class ProductResolver {
  constructor(private productService: ProductService) {
    this.productService = new ProductService();
  }

  @Authorized()
  @Query(() => [Product])
  products() {
    try {
      return this.productService.findProducts();
    } catch (e) {
      throw new ApolloError(e.toString() || "failed to fetch products");
    }
  }

  @Authorized()
  @Query(() => Product)
  findProducts(@Arg("input") input: GetProductInput) {
    return this.productService.getProduct(input);
  }
  @Authorized()
  @Mutation(() => Product)
  createProduct(@Arg("input") input: CreateProductInput, @Ctx() ctx: Context) {
    try {
      return this.productService.createProduct({
        ...input,
        user: ctx?.user?._id,
      });
    } catch (e) {
      throw new ApolloError(e.toString() || "failed to create product");
    }
  }
}
