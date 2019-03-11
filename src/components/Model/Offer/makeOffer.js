import { makeOffer as makeOfferOtodom } from '../Service/otodom'
import { makeOffer as makeOfferOlx } from '../Service/olx'
import { makeOffer as makeOfferMorizon } from '../Service/morizon'

export default {
  otodom: makeOfferOtodom,
  morizon: makeOfferMorizon,
  olx: makeOfferOlx
}
