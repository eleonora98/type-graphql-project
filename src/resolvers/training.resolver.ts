import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { DeleteResult } from "typeorm";
import { Training } from "../entity/Training";
import { User } from "../entity/User";
import { BaseTrainingInput, CreateTrainingInput } from "../input_types/training.input";
import { CreateUserInput, BaseUserInput } from "../input_types/user.input";

@Resolver()
class TrainingResolver {
  @Query(() => User)
  book(@Arg("id") id: string) {
    return User.findOne({ where: { id } });
  }

  @Mutation(() => Training)
  async createTraining(@Arg("user") data: CreateTrainingInput) {
    const training = Training.create(data);
    await training.save();
    return training;
  }

  @Mutation(() => Training)
  async deleteTraining(@Arg('_id') _id: string):Promise<DeleteResult> {
    return Training.delete(_id)
  }
  @Mutation(() => Training)
  async updateUser(@Arg('_id') id: string,
                   @Arg('user') data: BaseTrainingInput):Promise<Training> {
    const training = await Training.findOne({ where: { id } });
    if (!training) throw new Error("Book not found!");
    Object.assign(training, data);
    await training.save();
    return training;
  }
  
  @Query(() => [Training])
  trainings() {
    return Training.find()
  }
}