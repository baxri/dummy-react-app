import { getBoxStyle } from './spiral.js'

const boxes = [
  React.createElement('div', { style: getBoxStyle(0), key: '0' }, '1'),
  React.createElement('div', { style: getBoxStyle(1), key: '1' }, '2'),
  React.createElement('div', { style: getBoxStyle(2), key: '2' },
    React.createElement('strong', {}, 'Fizz')
  ) ,
]

ReactDOM.render(
  React.createElement('div', {}, boxes),
  document.getElementById('app')
)
