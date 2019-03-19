import { combineReducers } from 'redux'
import mergeNew from './model/offers/mergeNew'


import {
  ADD_OFFERS,
  GET_OFFERS,
  SET_OFFERS,
  MUTATE_OFFER,
  SET_FILTERED_OFFERS,
  GET_FILTERED_OFFERS,
  GET_FILTERS,
  SET_FILTER
} from './actions'

function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    return (handlers.hasOwnProperty(action.type)) ? (
      handlers[action.type](state, action)
    ) : (
      state
    )
  }
}

const initialState = {
  offersCount: null,
  offersList: [],
  filteredOffersCount: [],
  filteredOffersList: [],
  filters: {
    min: '',
    max: ''
  }
}

export const offers = createReducer( initialState.offersList, {
  [ADD_OFFERS]: (offersListState , action) => mergeNew(
    action.offers,
    offersListState.slice()
  ),
  [GET_OFFERS]: (offersListState, action) => offersListState,
  [MUTATE_OFFER]: (offersListState, action) => {
    //TODO: Move mutation there
    const index = offersListState.map(offer => offer.id).indexOf(action.id)

    if (index === -1) { return offersListState }

    let mutatedOffersList = offersListState.slice()

    Object.assign(mutatedOffersList[index], action.mutation)

    return mutatedOffersList;
  },
  [SET_OFFERS]: (offersListState, action) => action.offers
})

export const filteredOffers = createReducer( initialState.filteredOffersList, {
  [GET_FILTERED_OFFERS]: (filteredOffersListState, action) => filteredOffersListState,
  [SET_FILTERED_OFFERS]: (filteredOffersListState, action) => action.offers
})

export const filters = createReducer( initialState.filters, {
  [SET_FILTER]: (filtersState, action) => {
    Object.assign({}, state, {
      [action.name]: action.value
    })
  },
  [GET_FILTERS]: (filtersState, action) => filtersState,
})

const app = combineReducers({
  offers,
  filteredOffers,
  filters
})

export default app