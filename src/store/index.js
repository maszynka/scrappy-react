import {
  addOffers,
  setOffers,
  getOffers,
  mutateOffer,
  getFilteredOffers,
  setFilteredOffers,
  getFilters,
  setFilter
} from './actions'

import store from './store'

console.log(store.getState())

const unsubscribe = store.subscribe(() => console.log(store.getState()))

store.dispatch(addOffers([
  {id: 1, a: 'dupa'},
  {id: 2, a: 'dupa2'}
]))

window.setTimeout( ()=> store.dispatch(mutateOffer(1, {a: 'pupcia'})), 5000)
