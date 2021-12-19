"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const schemas_1 = require("../schemas");
const apollo_server_1 = require("apollo-server");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserService {
    async createUser(input) {
        return schemas_1.UserModel.create(input);
    }
    async login(input, ctx) {
        const user = await schemas_1.UserModel.findOne().findByEmail(input.email).lean();
        if (!user)
            throw new apollo_server_1.ApolloError("Invalid email");
        const isValid = await bcrypt_1.default.compare(input.password, user.password);
        if (!isValid)
            throw new apollo_server_1.ApolloError("Invalid password");
        return "logged in !!";
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map