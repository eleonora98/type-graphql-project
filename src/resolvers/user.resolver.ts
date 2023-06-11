import { Resolver, Query, Arg, Args, Authorized, Ctx, Mutation } from "type-graphql";
import { DeleteResult } from "typeorm";
import { User } from "../entity/User";
import { CreateUserInput, BaseUserInput, UserLoginArgs } from "../input_types/user.input";

@Resolver()
export class UserResolver {

  @Query(() => User)
  getUser(@Arg("id") id: number) {
    return User.findOne({ where: { id } });
  }

  @Mutation(() => new User)
  async createUser(@Arg("data") data: CreateUserInput): Promise<User> {
    const user = User.create(data);
    await user.save();
    return user;
  }

  @Mutation(() => User)
  async deleteUser(@Arg('_id') _id: number):Promise<DeleteResult> {
    return User.delete(_id)
  }
  @Mutation(() => User)
  async updateUser(@Arg('_id') id: number,
                   @Arg('data') data: BaseUserInput):Promise<User> {
    const user = await User.findOne({ where: { id } });
    if (!user) throw new Error("User not found!");
    Object.assign(user, data);
    await user.save();
    return user;
  }
}