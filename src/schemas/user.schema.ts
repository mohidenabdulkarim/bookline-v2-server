import { getModelForClass, index, pre, prop } from "@typegoose/typegoose";
import { MaxLength, MinLength } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import bcrypt from "bcrypt";

// function findByEmail(
//   this: ReturnModelType<typeof User, QueryHelpers>,
//   email: string
// ) {
//   return this.findOne({ email });
// }

// interface QueryHelpers {
//   findByEmail: AsQueryMethod<typeof findByEmail>;
// }

@pre<User>("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password as string, salt);
  this.password = hash;
})
@index({ username: 1 })
// @queryMethod(findByEmail)
@ObjectType()
export class User {
  @Field(() => String)
  _id?: string;

  @Field(() => String)
  @prop({ required: true })
  username: string;

  @prop({ required: true })
  password?: string;
  @Field(() => Date)
  createdAt: Date;
  @Field(() => Date)
  updatedAt: Date;
}

// export const UserModel = getModelForClass<typeof User, QueryHelpers>(User, {
export const UserModel = getModelForClass<typeof User>(User, {
  schemaOptions: { timestamps: true },
});

@InputType()
export class CreateUserInput {
  @Field(() => String)
  username: string;

  @MinLength(5, { message: "min length is 5" })
  @MaxLength(50, { message: "max length is 50" })
  @Field(() => String)
  password: string;
}

@InputType()
export class LoginInput {
  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;
}
