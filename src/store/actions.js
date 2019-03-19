export const ADD_OFFERS = 'ADD_OFFERS'
export const SET_OFFERS = 'SET_OFFERS'
export const GET_OFFERS = 'GET_OFFERS'
export const MUTATE_OFFER = 'MUTATE_OFFER'

export const SET_FILTERED_OFFERS = 'SET_FILTERED_OFFERS'
export const GET_FILTERED_OFFERS = 'GET_FILTERED_OFFERS'

export const SET_FILTER = 'SET_FILTER'
export const GET_FILTERS = 'GET_FILTERS'


//OffersList
export const addOffers = offers => ({
  type: ADD_OFFERS,
  offers
})

export const setOffers = offers => ({
  type: SET_OFFERS,
  offers
})

export const getOffers = () => ({
  type: GET_OFFERS
})

export const mutateOffer = (id, mutation) => ({
  type: MUTATE_OFFER,
  id,
  mutation
})

//FilteredOffersList
export const getFilteredOffers = () => ({
  type: GET_FILTERED_OFFERS
})

export const setFilteredOffers = offers => ({
  type: SET_FILTERED_OFFERS,
  offers
})

//Filters
export const getFilters = () => ({
  type: GET_FILTERS
})

export const setFilter = (name, value) => ({
  type: SET_FILTER,
  name,
  value
})