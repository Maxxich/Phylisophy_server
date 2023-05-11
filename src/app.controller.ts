import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateQuestionDto, IQuestion, UpdateQuestionDto, getQuestions } from './types';

@Controller('question')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/")
  async getQuestions(
    @Query('limit') limit?: number,
    @Query('page') page?: number,
    @Query('search') search?: string,
    @Query('not-answered') notAnswered?: string
  ): Promise<getQuestions> {    
    let bool
    if (notAnswered == 'true') {
      bool = true
    }
    if (notAnswered == 'false') {
      bool = false
    }
    return await this.appService.getQuestions({limit, page, search, notAnswered: bool})
  }

  @Put("/")
  async editQuestionById(
    @Body() dto: UpdateQuestionDto
  ): Promise<void> {
    return await this.appService.editQuestionById(dto)
  }

  @Post("/")
  async postQuestions(
    @Body() dto: CreateQuestionDto
  ): Promise<void>{
    return await this.appService.postQuestions(dto)
  }
}
