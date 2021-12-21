import { Context } from "../types";
import { AuthChecker } from "type-graphql";

export const authChecker: AuthChecker<Context> = ({
  //   root,
  //   args,
  context,
  //   info,
}) => {
  return !!context.user;
};
