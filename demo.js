const makeColorAccessible = require('.')
const yo = require('yo-yo')
const randomColor = require('random-hex-color')

const colors = Array
  .apply(null, Array(100))
  .map(i => {
    const color = randomColor().toUpperCase()
    return {
      before: color,
      after: makeColorAccessible(color)
    }
  })

function list (colors) {
  return yo`<ul>
    ${colors.map(function (color) {
      return yo`<li>
        <div style="background:${color.before}">BEFORE</div>
        <div style="background:${color.after}">AFTER</div>
      </li>`
    })}
  </ul>`
}

document.body.appendChild(list(colors))
