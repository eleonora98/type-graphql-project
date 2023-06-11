import { InputType, Field, ArgsType } from "type-graphql"

@InputType()
export class BaseUserInput { 
    @Field()
    email: string
    @Field()
    password: string
}

@InputType()
export class CreateUserInput extends BaseUserInput {
    @Field()
    username: string
}

@ArgsType()
export class UserLoginArgs {
    @Field()
    username: string
    @Field()
    password: string
}
