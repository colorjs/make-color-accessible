// https://www.w3.org/TR/WCAG/#visual-audio-contrast

const Color = require('color2')

module.exports = function makeColorAccessible (color, opts) {
  const defaults = {
    background: 'white',
    minContrast: 4.5
  }
  opts = Object.assign(defaults, opts)
  color = Color(color)
  opts.background = Color(opts.background)

  const contrast = color.contrast(opts.background)

  if (contrast >= opts.minContrast) return color.hexString()
  if (opts.background.isLight()) return makeColorAccessible(color.darken(0.1), opts)
  if (opts.background.isDark()) return makeColorAccessible(color.lighten(0.1), opts)
}
