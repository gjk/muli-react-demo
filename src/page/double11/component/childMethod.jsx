import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ChildMethod extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showBaby: false
    }
  }

  componentDidMount(){
    this.props.onRef(this)
  }

  childFn = () => {
    this.setState((state, props) => { return { showBaby: true }});
    let _this = this
    setTimeout(() => {
      _this.setState((state, props) => { return { showBaby: false }});
    }, 1500)
  }

  render() {
    let { showBaby } = this.state
    return (
      <div>
        <div onClick={this.props.onClick}>你要点我的话，我会生出个 baby 哟！</div>
        {showBaby && <div>hello, i'm baby 告辞！！</div>}
      </div>
    );
  }
}

ChildMethod.propTypes = {
  onClick: PropTypes.func,
  onRef: PropTypes.func
};

export default ChildMethod;
