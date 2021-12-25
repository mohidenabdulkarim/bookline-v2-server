import { getModelForClass, Index, prop, Ref } from "@typegoose/typegoose";
import { IsNumber, MaxLength, Min, MinLength } from "class-validator";
import { nanoid } from "nanoid";
import { Field, InputType, ObjectType } from "type-graphql";
import { User } from ".";

@ObjectType()
@Index({ productId: 1 })
export class Product {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @prop({ required: true, ref: () => User })
  user: Ref<User>;

  @Field(() => String)
  @prop({ type: String, required: true })
  name: string;

  @Field(() => String)
  @prop({ type: String, required: true })
  description: string;

  @Field(() => [String])
  @prop({ type: String, required: true, default: [] })
  categories: string[];

  @Field(() => String)
  @prop({ type: String, required: true })
  price: string;

  @Field(() => String)
  @prop({
    type: String,
    default: () => `product_${nanoid(20)}`,
    unique: true,
  })
  productId: string;

  @Field(() => Date)
  createdAt: Date;
  @Field(() => Date)
  updatedAt: Date;
}

export const ProductModel = getModelForClass<typeof Product>(Product, {
  schemaOptions: { timestamps: true },
});

@InputType()
export class CreateProductInput {
  @Field(() => String)
  name: string;

  @MinLength(10, {
    message: "Description must be at least 10 characters",
  })
  @MaxLength(100, {
    message: "Description must not be more than  100 characters",
  })
  @Field(() => String)
  description: string;

  @IsNumber()
  @Min(1)
  @Field()
  price: number;

  @Field(() => [String])
  categories: string[];
}

@InputType()
export class GetProductInput {
  @Field()
  productId: string;
}
