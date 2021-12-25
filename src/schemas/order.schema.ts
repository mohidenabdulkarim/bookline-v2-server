import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { IsNotEmpty } from "class-validator";
import { nanoid } from "nanoid";
import { Field, InputType, ObjectType } from "type-graphql";
import { User } from ".";

@ObjectType()
export class Order {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @prop({ required: true, ref: () => User })
  user: Ref<User>;

  @Field(() => String)
  @prop({ type: String, required: true })
  name: string;

  @Field(() => [String])
  @prop({ type: String, required: true, default: [] })
  books: string[];

  @Field(() => String)
  @prop({ type: String })
  area: string;

  @Field(() => String)
  @prop({ type: String, default: () => `order_${nanoid()}` })
  orderId: string;

  @Field(() => String)
  @prop({ type: String })
  phoneNumber: string;
}

export const OrderModel = getModelForClass<typeof Order>(Order, {
  schemaOptions: { timestamps: true },
});

@InputType()
export class CreateOrderInput {
  @IsNotEmpty()
  @Field()
  name: string;

  @IsNotEmpty()
  @Field()
  phoneNumber: string;

  @IsNotEmpty()
  @Field(() => [String])
  books: string[];

  @IsNotEmpty()
  @Field()
  area: string;
}
