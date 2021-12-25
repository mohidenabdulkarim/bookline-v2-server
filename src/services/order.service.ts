import { CreateOrderInput, User, OrderModel } from "../schemas";

export class OrderService {
  async createOrder(input: CreateOrderInput & { user: User["_id"] }) {
    return OrderModel.create(input);
  }
}
