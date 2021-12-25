import { LoginInput, UserModel } from "../schemas";
import { ApolloError } from "apollo-server";
import bcrypt from "bcrypt";
import { signJwt } from "../utils";
export class UserService {
  async createUser(input: any) {
    return UserModel.create(input);
  }
  async login(input: LoginInput) {
    const e: string = "Invalid username/password";
    //get user by email
    const user = await UserModel.findOne({ username: input.username }).lean();
    if (!user) throw new ApolloError(e);

    //validate the password
    const isValid = await bcrypt.compare(
      input.password,
      user.password as string
    );
    if (!isValid) throw new ApolloError(e);
    //sign a jwt
    const token: string = signJwt(user);

    // return the jwt string
    return token;
  }
}
