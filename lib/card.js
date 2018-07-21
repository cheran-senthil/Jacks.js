'use strict'

let util = require('util')
let chalk = require('chalk')

const ranks = 'A23456789TJQK'.split('')
const suits = 'shdc'.split('')

class Card {
  constructor (card) {
    this.rank = card[0].toUpperCase()
    this.suit = card[1].toLowerCase()

    if (!ranks.includes(this.rank)) {
      throw RangeError(util.format(
        'Invalid Rank "%s" Expected from %s',
        this.rank,
        '["' + ranks.join('", "') + '"]'
      ))
    }
    if (!suits.includes(this.suit)) {
      throw RangeError(util.format(
        'Invalid Suit "%s" Expected from %s',
        this.suit,
        '["' + suits.join('", "') + '"]'
      ))
    }
  }

  inspect (depth, opts) {
    if (depth < 0) {
      return opts.stylize('[Card]', 'special')
    }

    let card = this.rank + this.suit
    if (opts.colors) {
      switch (this.suit) {
        case 'h':
          card = chalk.red(card)
          break
        case 'd':
          card = chalk.blue(card)
          break
        case 'c':
          card = chalk.green(card)
      }
    }

    return (card)
  }
}

module.exports = {Card: Card, ranks: ranks, suits: suits}
