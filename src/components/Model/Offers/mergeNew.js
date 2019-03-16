import getUnique from './getUnique'

const mergeNew = (newOffers, currentOffers) => {
  // let unique = getUnique(newOffers, currentOffers)
  // console.log(unique)
  // console.log(unique)
  // console.log(currentOffers)
  return getUnique(newOffers, currentOffers).concat(currentOffers)
}

export default mergeNew
