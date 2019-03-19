const getUnique = (newOffers, currentOffers) => {
  const currentOffersIds = currentOffers.map(currentOffer => currentOffer.id)

  return newOffers.filter(newOffer => !(currentOffersIds.includes(newOffer.id)))
}

export default getUnique
