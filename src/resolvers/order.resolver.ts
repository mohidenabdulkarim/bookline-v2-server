import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { OrderService } from "../services";
import { CreateOrderInput, Order } from "../schemas";
import { Context } from "../types";
import { ApolloError } from "apollo-server";

@Resolver()
export class OrderResolver {
  constructor(private orderService: OrderService) {
    this.orderService = new OrderService();
  }

  @Authorized()
  @Mutation(() => Order)
  async createOrder(
    @Arg("input") input: CreateOrderInput,
    @Ctx() ctx: Context
  ) {
    try {
      return await this.orderService.createOrder({
        ...input,
        user: ctx.user._id,
      });
    } catch (e) {
      console.log(e);
      throw new ApolloError("failed to create order");
    }
  }
}
