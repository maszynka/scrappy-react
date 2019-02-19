import getUnique from './getUnique'

const mergeNew = (newOffers, currentOffers) => {
  let unique = getUnique(newOffers, currentOffers)
  console.log(unique)
  return unique.concat(currentOffers)
}

export default mergeNew
