import React from 'react';
import styles from './sass/button.scss'
import cssModule from 'react-css-modules';

class MyButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span>
        <button styleName="p-button" disabled={this.props.disabled} onClick={this.props.handleClick('112233')} >{this.props.text}</button>
      </span>
    );
  }
}

export default cssModule(MyButton, styles);