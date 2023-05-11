
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


export {
  constructTake,
  constructSkip,
}