export interface IQuestion{
  question: string
  variants: string | null | undefined
  correct: string | null | undefined
  id: number
}

export interface IQuestionNoId{
  question: string
  variants: string | null
  correct: string
}

export interface getQuestions{
  questions: IQuestion[]
  total: number
}

export interface CreateQuestionDto{
  key: string
  questions: IQuestionNoId[]
}


export interface UpdateQuestionDto{
  key: string
  question: IQuestion
}