"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const order_resolver_1 = require("./order.resolver");
const product_resolver_1 = require("./product.resolver");
const user_resolver_1 = require("./user.resolver");
exports.resolvers = [
    user_resolver_1.UserResolver,
    product_resolver_1.ProductResolver,
    order_resolver_1.OrderResolver,
];
//# sourceMappingURL=index.js.map