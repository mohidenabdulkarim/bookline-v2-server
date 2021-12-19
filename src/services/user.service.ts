import { Context } from "../types";
import { LoginInput, UserModel } from "../schemas";
import { ApolloError } from "apollo-server";
import bcrypt from "bcrypt";
export class UserService {
  async createUser(input: any) {
    return UserModel.create(input);
  }
  async login(input: LoginInput, ctx: Context) {
    //get user by email
    const user = await UserModel.findOne().findByEmail(input.email).lean();
    if (!user) throw new ApolloError("Invalid email");

    //validate the password
    const isValid = await bcrypt.compare(
      input.password,
      user.password as string
    );
    if (!isValid) throw new ApolloError("Invalid password");
    //sign a jwt
    //set a cookie
    // return the jwt string
    return "logged in !!";
  }
}
