"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const schemas_1 = require("../schemas");
const apollo_server_1 = require("apollo-server");
const bcrypt_1 = __importDefault(require("bcrypt"));
const utils_1 = require("../utils");
class UserService {
    async createUser(input) {
        return schemas_1.UserModel.create(input);
    }
    async login(input) {
        const e = "Invalid username/password";
        const user = await schemas_1.UserModel.findOne({ username: input.username }).lean();
        if (!user)
            throw new apollo_server_1.ApolloError(e);
        const isValid = await bcrypt_1.default.compare(input.password, user.password);
        if (!isValid)
            throw new apollo_server_1.ApolloError(e);
        const token = (0, utils_1.signJwt)(user);
        return token;
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map