import { ILike, IsNull } from "typeorm"

const constructSkip = (
  limit: number | undefined,
  page: number | undefined
): number => {
  if (limit && page) return limit*(page-1)
  else return 0
}

const constructTake = (
  limit: number | undefined
): number =>  limit || 50



const constructWhere = (
  search: string | undefined,
  notAnswered: boolean
) : any => {
  if (search && notAnswered) {
    return [
      {
        question: ILike(`%${search}%`),
        correct:  IsNull() 
      },
      {
        variants: ILike(`%${search}%`) ,
        correct: IsNull()
      },
    ]
  } else if (!search && notAnswered) {
    return {
      correct: IsNull()
    }
  } else if (search && !notAnswered) {
    return [
      {
        question: ILike(`%${search}%`),
      },
      {
        variants: ILike(`%${search}%`) ,
      },
    ]
  } else {
    return []
  }
}
export {
  constructTake,
  constructSkip,
  constructWhere
}