import getUnique from './getUnique'

const mergeNew = (uniqueOffers, currentOffers) => {
  let unique = getUnique(uniqueOffers, currentOffers)
  console.log(unique)
  return unique.concat(currentOffers)
}

export default mergeNew
