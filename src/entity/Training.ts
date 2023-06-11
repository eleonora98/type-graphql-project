import { Field, ObjectType } from "type-graphql";
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
@ObjectType()
export class Training extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column({ default: false })
  @Field(() => String)
  duration: string;

  @Field(() => User)
  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  created_by: User
}