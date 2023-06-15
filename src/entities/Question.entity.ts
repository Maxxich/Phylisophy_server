import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class QuestionEntity {
  @PrimaryGeneratedColumn()
  id: number

  
  @Column({nullable: false})
  order: number
  
  @Column({nullable: false})
  charter: number

  @Column({nullable: false})
  question: string

  @Column({nullable: true})
  variants: string

  @Column({nullable: true})
  correct: string
}