"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const type_graphql_1 = require("type-graphql");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const resolvers_1 = require("./resolvers");
const utils_1 = require("./utils");
async function main() {
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: resolvers_1.resolvers,
        authChecker: utils_1.authChecker,
    });
    const app = (0, express_1.default)();
    app.use((0, cookie_parser_1.default)());
    const server = new apollo_server_express_1.ApolloServer({
        schema,
        context: (ctx) => {
            if (ctx.req.headers["authorization"]) {
                const user = (0, utils_1.verifyJwt)(ctx.req.headers["authorization"]);
                ctx.user = user;
                return ctx;
            }
            return ctx;
        },
        plugins: [
            process.env.NODE_ENV === "production"
                ? (0, apollo_server_core_1.ApolloServerPluginLandingPageProductionDefault)()
                : (0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)(),
        ],
    });
    await server.start();
    server.applyMiddleware({ app });
    app.listen(4000, () => {
        console.log("Up...");
    });
    await (0, utils_1.connect)();
}
main().catch((err) => console.log("kh:", err));
//# sourceMappingURL=index.js.map