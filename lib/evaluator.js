'use strict'

let fs = require('fs')
let path = require('path')
let combinations = require('iter-tools').combinations

const handRankings = fs.readFileSync(path.join(__dirname, 'hand_rankings.txt')).toString().split('\n')
var tmp1 = {}
var tmp2 = {}
for (const i in handRankings) {
  if ((i < 10) || ((i > 321) && (i < 1599))) {
    tmp1[handRankings[i]] = parseInt(i) + 1
  } else {
    tmp2[handRankings[i]] = parseInt(i) + 1
  }
}
const flushLookup = tmp1
const handLookup = tmp2

console.log(Object.keys(flushLookup).length)

function handRank (hand) {
  var ranks = []
  var suits = new Set()

  for (let card of hand) {
    suits.add(card.suit)
    ranks.push(card.rank)
  }
  ranks = ranks.sort().join('')

  if (suits.size === 1) {
    return flushLookup[ranks]
  }
  return handLookup[ranks]
}

function bestFive (hand) {
  var rank, bestHand
  var maxRank = 7463

  for (let pokerHand of combinations(hand, 5)) {
    rank = handRank(pokerHand)
    if (rank < maxRank) {
      maxRank = rank
      bestHand = pokerHand
    }
  }

  return bestHand
}

function evaluator (hands) {
  var bestHands, rank, winningPlayers
  var maxRank = 7463

  for (var [player, hand] of hands.entries) {
    hand = bestFive(hand)
    rank = handRank(hand)

    if (rank < maxRank) {
      maxRank = rank
      bestHands = [hand]
      winningPlayers = [player]
    } else if (rank === maxRank) {
      bestHands.push(hand)
      winningPlayers.push(player)
    }
  }

  return (bestHands, winningPlayers)
}

module.exports = {
  handRank: handRank,
  bestFive: bestFive,
  evaluator: evaluator
}
