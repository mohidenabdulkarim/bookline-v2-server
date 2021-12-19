"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
async function connect() {
    try {
        await mongoose_1.default.connect("mongodb://127.0.0.1:27017/graphql-api");
        console.log("Db..");
    }
    catch (e) {
        console.error("Khalad:", e);
        process.exit(1);
    }
}
exports.connect = connect;
//# sourceMappingURL=mongo.js.map