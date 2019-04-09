import React from 'react';
import PropTypes from 'prop-types';
import styles from '../sass/index.scss';
import cssModule from 'react-css-modules';

class DoubleList extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    const selfList = this.props.list
    return (
      <ul styleName="double-list">
        {selfList.map((item,index) => {
          return (
            <li key={index} styleName={item.active ? 'li_active' : ''} onClick={this.props.handleClick(item)}>
              <span>{item.name}</span>
              <span>{item.age}</span>
            </li>
          )
        })}
      </ul>
    )
  }
}

DoubleList.propTypes = {
  list: PropTypes.array
}

export default cssModule(DoubleList, styles);