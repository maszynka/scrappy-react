import getUnique from './getUnique'

const mergeNew = (uniqueOffers, currentOffers) => (
  getUnique(uniqueOffers, currentOffers).concat(currentOffers)
)

export default mergeNew
