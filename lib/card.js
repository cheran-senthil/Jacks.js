'use strict'

let util = require('util')

const ranks = 'A23456789TJQK'
const suits = 'shdc'

class Card {
  constructor (card) {
    this.rank = card[0].toUpperCase()
    this.suit = card[1].toLowerCase()

    if (!ranks.includes(this.rank)) {
      throw Error(util.format('Invalid Rank "%s" Expected from %s', this.rank, ranks))
    }
    if (!suits.includes(this.suit)) {
      throw Error(util.format('Invalid Suit "%s" Expected from %s', this.suit, suits))
    }
  }

  inspect (depth, opts) {
    return (this.rank + this.suit)
  }
}

module.exports = {Card: Card, ranks: ranks, suits: suits}
