import { Resolver, Query, Arg, Args, Authorized, Ctx, Mutation } from "type-graphql";
import { DeleteResult } from "typeorm";
import { User } from "../entity/User";
import { CreateUserInput, BaseUserInput, UserLoginArgs } from "../input_types/user.input";

@Resolver()
export class UserResolver {

  @Query(() => User)
  book(@Arg("id") id: string) {
    return User.findOne({ where: { id } });
  }

  @Mutation(() => User)
  async createUser(@Arg("data") data: CreateUserInput) {
    const user = User.insert(data);
    return user;
  }

  @Mutation(() => User)
  async deleteUser(@Arg('_id') _id: string):Promise<DeleteResult> {
    return User.delete(_id)
  }
  @Mutation(() => User)
  async updateUser(@Arg('_id') id: string,
                   @Arg('user') data: BaseUserInput):Promise<User> {
    const user = await User.findOne({ where: { id } });
    if (!user) throw new Error("Book not found!");
    Object.assign(user, data);
    await user.save();
    return user;
  }
}