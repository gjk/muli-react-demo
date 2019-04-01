

import React from 'react';
import '../../../assets/iconfont/iconfont.css'

import cssModule from 'react-css-modules';
 //import '../sass/index.scss'
// import '../sass/index.css'

import styles from '../sass/index.scss';

import logo from '../../../assets/img/bg.png'
class Main extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {

        return (
        <div styleName="nav">
          <div styleName="line" ></div>
          <p>Main-center</p>
          <p>这是js 内部引入图片</p>
          <img className="bitget-img" src={logo} alt=""/>
          <p>css 的背景图片</p>
          <div className="bg"></div>
          <p className="test">icon 加载</p>
          <i className="iconfont icon-bitclub"></i>
          <div id="example"></div>
        </div>);
    }
}

export default cssModule(Main,styles);