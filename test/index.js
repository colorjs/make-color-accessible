const {describe, it} = require('mocha')
require('chai').should()
const makeColorAccesssible = require('..')
const Color = require('color2')

describe('makeColorAccesssible', () => {
  it('is a function', () => {
    makeColorAccesssible.should.be.a('function')
  })

  it('handles named colors', () => {
    makeColorAccesssible('black').should.equal('#000')
  })

  it('returns the same color if it is already accessible', () => {
    makeColorAccesssible('#333').should.equal('#333')
  })

  it('darkens the color if it is too light for a light bg', () => {
    const oldColor = Color('#996699')
    const newColor = Color(makeColorAccesssible(oldColor))
    oldColor.contrast(Color('white')).should.be.below(4.5)
    newColor.contrast(Color('white')).should.be.above(4.5)
  })

  it('lightens the color if it is too dark for a dark bg', () => {
    const oldColor = Color('#333')
    const newColor = Color(makeColorAccesssible(oldColor, {background: 'black'}))
    oldColor.contrast(Color('black')).should.be.below(4.5)
    newColor.contrast(Color('black')).should.be.above(4.5)
  })

  it('defaults to white on black instead of exceeding call stack', () => {
    const oldColor = Color('#010101')
    const newColor = Color(makeColorAccesssible(oldColor, {background: 'black'}))
    newColor.hexString().should.eq('#FFF')
    // oldColor.contrast(Color('black')).should.be.below(4.5)
    // newColor.contrast(Color('black')).should.be.above(4.5)
  })
})
