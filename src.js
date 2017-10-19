// https://www.w3.org/TR/WCAG/#visual-audio-contrast

const Color = require('color2')

module.exports = function makeColorAccessible (inputColor, opts) {
  const defaults = {
    background: 'white',
    minContrast: 4.5
  }
  opts = Object.assign(defaults, opts)
  const color = Color(inputColor)
  opts.background = Color(opts.background)

  const contrast = color.contrast(opts.background)

  // If given color is already accessible, return the _exact input string_.
  // This allows folks to do checks like `color === makeColorAccessible(color)`
  if (contrast >= opts.minContrast) {
    return (String(inputColor).match(/^#/)) ? inputColor : color.hexString()
  }

  if (opts.background.isLight()) {
    try {
      return makeColorAccessible(color.darken(0.1), opts)
    } catch (e) {
      return '#000'
    }
  }

  if (opts.background.isDark()) {
    try {
      return makeColorAccessible(color.lighten(0.1), opts)
    } catch (e) {
      return '#FFF'
    }
  }
}
