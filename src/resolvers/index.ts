import { OrderResolver } from "./order.resolver";
import { ProductResolver } from "./product.resolver";
import { UserResolver } from "./user.resolver";

export const resolvers = [
  UserResolver,
  ProductResolver,
  OrderResolver,
] as const;
