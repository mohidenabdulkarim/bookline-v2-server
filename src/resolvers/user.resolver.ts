import { CreateUserInput, LoginInput, User } from "../schemas";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { UserService } from "../services";
import { Context } from "../types";

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {
    this.userService = new UserService();
  }

  @Mutation(() => User)
  createUser(@Arg("input") input: CreateUserInput) {
    return this.userService.createUser(input);
  }

  @Mutation(() => String)
  login(@Arg("input") input: LoginInput) {
    return this.userService.login(input);
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() ctx: Context): User {
    return ctx.user;
  }
}
