const updateCommon = (newOffers, currentOffers) => {
  currentOffers.map(currentOffer => {
    let commonFound = false
    newOffers.some(newOffer => {
      commonFound = newOffer.id === currentOffer.id
      if (commonFound) {
        newOffer.new = currentOffer.new = false
        const newOfferUpdated = JSON.stringify(currentOffer) !== JSON.stringify(newOffer)
        if (newOfferUpdated) {
          newOffer.ui.modified = true
          Object.assign(currentOffer, newOffer)
        }
      }
      return commonFound
    })
    return currentOffer
  })
}

export default updateCommon
