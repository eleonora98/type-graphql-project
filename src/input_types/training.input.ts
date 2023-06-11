import { InputType, Field, ArgsType } from "type-graphql"

@InputType()
export class BaseTrainingInput {
    @Field()
    name: string

    @Field()
    description: string

    @Field()
    duration: string

    @Field()
    userId: string
}

@InputType()
export class CreateTrainingInput extends BaseTrainingInput {}