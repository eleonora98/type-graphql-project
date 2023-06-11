import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { DeleteResult } from "typeorm";
import { Training } from "../entity/Training";
import { User } from "../entity/User";
import { BaseTrainingInput, CreateTrainingInput } from "../input_types/training.input";
import { CreateUserInput, BaseUserInput } from "../input_types/user.input";

@Resolver()
export class TrainingResolver {
  @Query(() => Training)
  getTraining(@Arg("id") id: number) {
    return Training.findOne({ where: { id } });
  }

  @Mutation(() => Training) 
  async createTraining(@Arg("data") data: CreateTrainingInput): Promise<Training> {
    const training = Training.create(data);
    await training.save();
    return training;
  }

  @Mutation(() => Training)
  async deleteTraining(@Arg('_id') _id: number):Promise<DeleteResult> {
    return Training.delete(_id)
  }
  @Mutation(() => Training)
  async updateTraining(@Arg('_id') id: number,
                   @Arg('data') data: BaseTrainingInput):Promise<Training> {
    const training = await Training.findOne({ where: { id } });
    if (!training) throw new Error("Training not found!");
    Object.assign(training, data);
    await training.save();
    return training;
  }
  
  @Query(() => [Training])
  trainings() {
    return Training.find()
  }
}