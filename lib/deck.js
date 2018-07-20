'use strict'

let card = require('./card')

class Deck {
  constructor (shuffle) {
    shuffle = shuffle || false
    this.reset(shuffle)
  }

  shuffle () {
    var currentIndex = this.deck.length
    var temporaryValue
    var randomIndex

    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1

      temporaryValue = this.deck[currentIndex]
      this.deck[currentIndex] = this.deck[randomIndex]
      this.deck[randomIndex] = temporaryValue
    }
  }

  draw (n) {
    n = n || 1

    if (n > this.deck.length) {
      n = this.deck.length
    }

    var cards = this.deck.slice(0, n)
    this.deck = this.deck.slice(n)

    return cards
  }

  reset (shuffle) {
    this.deck = []
    for (let suit of card.suits) {
      for (let rank of card.ranks) {
        this.deck.push(new card.Card(rank + suit))
      }
    }
    if (shuffle) {
      this.shuffle()
    }
  }

  inspect (depth, opts) {
    return (this.deck.map(x => x.inspect()).join(', '))
  }
}

module.exports.Deck = Deck
