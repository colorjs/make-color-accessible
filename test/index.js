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
    const oldColor = new Color('#996699')
    const newColor = new Color(makeColorAccesssible(oldColor))
    oldColor.contrast(new Color('white')).should.be.below(4.5)
    newColor.contrast(new Color('white')).should.be.above(4.5)
  })

  it('lightens the color if it is too dark for a dark bg', () => {
    const oldColor = new Color('#333')
    const newColor = new Color(makeColorAccesssible(oldColor, {background: 'black'}))
    oldColor.contrast(new Color('black')).should.be.below(4.5)
    newColor.contrast(new Color('black')).should.be.above(4.5)
  })
})
