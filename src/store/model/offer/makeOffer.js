import { makeOffer as makeOfferOtodom } from '../service/otodom'
import { makeOffer as makeOfferOlx } from '../service/olx'
import { makeOffer as makeOfferMorizon } from '../service/morizon'

export default {
  otodom: makeOfferOtodom,
  morizon: makeOfferMorizon,
  olx: makeOfferOlx
}
