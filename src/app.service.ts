import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateQuestionDto, IQuestion, UpdateQuestionDto, getQuestions } from './types';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionEntity } from './entities/Question.entity';
import { ILike, IsNull, Repository } from 'typeorm';
import { constructSkip, constructTake } from './helpers';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {

  constructor(
    @InjectRepository(QuestionEntity)
    private repo: Repository<QuestionEntity>,
    private configService: ConfigService,
  ) {}

  async getQuestions({limit, page, search, notAnswered}: {limit?: number, page?: number, search?: string, notAnswered: boolean}): Promise<getQuestions> {
    console.log(notAnswered);
    
    const [questions, total] = await this.repo.findAndCount({
      skip: constructSkip(limit, page),
      take: constructTake(limit),
      order: {
        id: 'ASC'
      },
      where: 
        {
          question: search ?  ILike(`%${search}%`) : undefined,
          correct: notAnswered ? IsNull() : undefined
        },
    })
    return {
      questions,
      total
    }
  }
  async editQuestionById(dto: UpdateQuestionDto): Promise<void> {
    const {key, question: entity} = dto
    if (key !== this.configService.get<string>('KEY')) {
      throw new ForbiddenException()
    }
    const {correct, id, question, variants} = entity
    const questionEntity = await this.repo.findOneBy({id})
    questionEntity.correct = correct?.length > 0 ? correct : null
    questionEntity.question = question
    questionEntity.variants = variants || null
    await this.repo.save(questionEntity)
  }
  async postQuestions(dto: CreateQuestionDto): Promise<void> {
    const {key, questions: entities} = dto
    if (key !== this.configService.get<string>('ADD_KEY')) {
      throw new ForbiddenException()
    }
    for (let entity in entities) {
      const {correct, question, variants} = entities[entity]
      const questionEntity = this.repo.create({
        correct: correct?.length > 0 ? correct : null, 
        question, 
        variants: variants || null,
      })
      await this.repo.save(questionEntity)
    }
  }
}
