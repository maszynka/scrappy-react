import getUnique from './getUnique'

/*
const mergeNew = (newOffers, currentOffers) => getUnique(
  newOffers,
  currentOffers
).concat(currentOffers)
*/

const mergeNew = (newOffers, currentOffers) => {
  let unique = getUnique(newOffers, currentOffers)
  console.log(unique)
  return getUnique(newOffers, currentOffers).concat(currentOffers)
}

export default mergeNew
