/**
 * This file defines somes components that are used for the
 * demo in main.js. It is ok if you don't understand this,
 * we'll get to the important bits later.
 */

export var PythagorasTree = (function (superclass) {
    function PythagorasTree(props) {
      superclass.call(this, props)
  
      this.state = {
        animating: false,
      }
  
      this.toggleAnimation = this.toggleAnimation.bind(this)
    }
  
    if ( superclass ) PythagorasTree.__proto__ = superclass;
    PythagorasTree.prototype = Object.create( superclass && superclass.prototype );
    PythagorasTree.prototype.constructor = PythagorasTree;
  
    PythagorasTree.prototype.toggleAnimation = function toggleAnimation () {
      this.setState({ animating: !this.state.animating })
    };
  
    PythagorasTree.prototype.render = function render () {
      var animating = this.state.animating
      return (
        React.createElement( AnimatedPythagorasTree, Object.assign({}, this.props, { animating: animating }),
          React.createElement( 'button', {
            onClick: this.toggleAnimation, type: 'button' },
            animating ? 'Stop animation' : 'Start animation'
          )
        )
      )
    };
  
    return PythagorasTree;
  }(React.Component));
  
  
  // This Component expects to receive a function on its `onChange` prop.
  // It then calls that function from its own event handlers.
  export function NumericInput(ref) {
    var value = ref.value;
    var onChange = ref.onChange;
  
    var numericValue = !value ? 0 : parseFloat(value)
    var setSway = function (event) { return onChange(event.target.value); }
    var decreaseSway = function () { return onChange(String(numericValue - 0.02)); }
    var increaseSway = function () { return onChange(String(numericValue + 0.02)); }
  
    return (
      React.createElement( 'div', null,
        React.createElement( 'button', { type: 'button', onClick: decreaseSway }, "<"),
        React.createElement( 'input', { value: value, onChange: setSway }),
        React.createElement( 'button', { type: 'button', onClick: increaseSway }, ">")
      )
    )
  }
  
  
  export var AnimatedPythagorasTree = (function (superclass) {
    function AnimatedPythagorasTree(props) {
      superclass.call(this, props)
  
      this.state = {
        time: 0,
      }
    }
  
    if ( superclass ) AnimatedPythagorasTree.__proto__ = superclass;
    AnimatedPythagorasTree.prototype = Object.create( superclass && superclass.prototype );
    AnimatedPythagorasTree.prototype.constructor = AnimatedPythagorasTree;
  
    AnimatedPythagorasTree.prototype.scheduleFrame = function scheduleFrame () {
      var this$1 = this;
  
      this.nextFrame = window.requestAnimationFrame(function () {
        var now = new Date().getTime()
        var delta = now - this$1.lastFrameTime
        if (delta > 25) {
          // Max out at 40fps to conserve CPU cycles
          this$1.lastFrameTime = now
          this$1.setState(function (ref) {
            var time = ref.time;
  
            return ({ time: time + delta/25 });
          })
        }
        else {
          this$1.scheduleFrame()
        }
      })
    };
  
    AnimatedPythagorasTree.prototype.componentDidMount = function componentDidMount () {
      if (this.props.animating) {
        this.lastFrameTime = new Date().getTime()
        this.scheduleFrame()
      }
    };
  
    AnimatedPythagorasTree.prototype.componentWillReceiveProps = function componentWillReceiveProps (nextProps) {
      if (this.props.animating && !nextProps.animating && this.nextFrame) {
        window.cancelAnimationFrame(this.nextFrame)
        this.nextFrame = null
      }
      else if (!this.props.animating && nextProps.animating) {
        this.lastFrameTime = new Date().getTime()
        this.scheduleFrame()
      }
    };
  
    AnimatedPythagorasTree.prototype.componentDidUpdate = function componentDidUpdate () {
      if (this.props.animating) {
        this.scheduleFrame()
      }
    };
  
    AnimatedPythagorasTree.prototype.componentWillUnmount = function componentWillUnmount () {
      if (this.nextFrame) {
        window.cancelAnimationFrame(this.nextFrame)
        this.nextFrame = null
      }
    };
  
    AnimatedPythagorasTree.prototype.render = function render () {
      var ref = this.props;
      var children = ref.children;
      var sprout = ref.sprout;
      var sway = ref.sway;
      var baseHeightFactor = ref.baseHeightFactor;
      var baseLean = ref.baseLean;
      var size = ref.size;
      var totalLevels = ref.totalLevels;
      var t = this.state.time
  
      return React.createElement('div', {},
        React.createElement(TreeBox, {
          heightFactor: Math.cos(t / 43)*sprout + baseHeightFactor,
          lean: Math.sin(t / 50)*sway + baseLean,
          size: size,
          totalLevels: totalLevels,
          level: 0,
        }),
        React.createElement('div', {
          style: {
            position: 'absolute',
            right: 10,
            bottom: 10,
            left: 10,
          },
        }, children)
      )
    };
  
    return AnimatedPythagorasTree;
  }(React.Component));
  AnimatedPythagorasTree.defaultProps = {
    totalLevels: 5,
    baseLean: 0,
    baseHeightFactor: 0.37,
    size: 50,
    sprout: 0.01,
    sway: 0.04,
  }
  
  export var TreeBox = function (props) {
    var style = getBoxStyle(props)
    var baseProps = Object.assign({}, props, {
      level: props.level + 1,
    })
    var leftChild =
      props.level < props.totalLevels &&
      React.createElement(TreeBox, Object.assign({}, baseProps, { right: false }))
    var rightChild =
      props.level < props.totalLevels &&
      React.createElement(TreeBox, Object.assign({}, baseProps, { right: true }))
  
    return React.createElement('div', { style: style },
      leftChild,
      rightChild
    )
  }
  TreeBox.defaultProps = {
    level: 0,
  }
  
  
  export function getBoxStyle(ref) {
    var size = ref.size;
    var heightFactor = ref.heightFactor;
    var left = ref.left;
    var lean = ref.lean;
    var level = ref.level;
    var totalLevels = ref.totalLevels;
    var right = ref.right;
  
    var color = interpolateColor(Math.pow( (level/totalLevels), 2 ), 80, 120, 54, 240, 104, 64)
    var scale = right
        ? Math.sqrt(Math.pow( (size*heightFactor), 2 ) + Math.pow( (size * (0.5+lean)), 2 )) / size
        : Math.sqrt(Math.pow( (size*heightFactor), 2 ) + Math.pow( (size * (0.5-lean)), 2 )) / size
    var rotation =
      right
        ? Math.atan(heightFactor / (0.5+lean))
        : -Math.atan(heightFactor / (0.5-lean))
  
    var style = {
      position: 'absolute',
      bottom: 0,
      width: size,
      height: size,
      transformOrigin: right ? (size + "px " + size + "px") : ("0 " + size + "px"),
      transform: level === 0 ? '' : ("\n      translate3d(0, " + (-size) + "px, 0)\n      scale3d(" + scale + ", " + scale + ", 1)\n      rotate(" + rotation + "rad)\n    "),
      backgroundColor: color,
    }
  
    if (level === 0) {
      style.left = "calc(50% - " + (size/2) + "px + " + (left || 0) + "px)"
    }
  
    return style
  }
  
  
  function interpolateColor(x, r1, r2, g1, g2, b1, b2) {
    var r = Math.round(clamp(x, r1, r2))
    var g = Math.round(clamp(x, g1, g2))
    var b = Math.round(clamp(x, b1, b2))
    return ("rgb(" + r + ", " + g + ", " + b + ")")
  }
  
  
  function clamp(x, min, max) {
    return min + (max - min)*x
  }