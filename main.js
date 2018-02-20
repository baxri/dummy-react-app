import { AnimatedPythagorasTree } from './PythagorasTree.js'

// `createElement` is just a function. You can give it a new name to reduce
// the amount you'll need to type.
const createElement = React.createElement

let animating = false
let sway = 0.1

function renderApp() {
  const toggleText = `${animating ? 'Stop' : 'Start'} animation`

  ReactDOM.render(
    createElement(AnimatedPythagorasTree, { animating, sway },
      createElement('button', {}, toggleText),
      createElement('h5', {}, 'amount of sway'),
      createElement('button', {}, '<'),
      createElement('input', {value: sway, disabled: true }),
      createElement('button', {}, '>')
    ),
    document.getElementById('app')
  )
}

renderApp()
