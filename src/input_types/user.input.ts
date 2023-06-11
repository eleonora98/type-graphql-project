import { InputType, Field, ArgsType } from "type-graphql"

@InputType()
export class BaseUserInput { 
    @Field()
    username: string
    @Field()
    password: string
}

@InputType()
export class CreateUserInput extends BaseUserInput {
    @Field()
    email: string
}

@ArgsType()
export class UserLoginArgs {
    @Field()
    username: string
    @Field()
    password: string
}
