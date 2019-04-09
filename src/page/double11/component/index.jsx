import React from 'react';
import styles from '../sass/index.scss';
import cssModule from 'react-css-modules';

import MyButton from '../../../components/button/button.jsx'
// import { info } from '../../../components/toast/index.js'
import Toast from '../../../components/toast/toast.jsx'
import DoubleList from './list.jsx'
import ChildMethod from './childMethod.jsx'

import logo from '../../../assets/img/bg.png'

class DoubleTest extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      str: '',
      showStr: '',
      list: [],
      btnDisabled: false,
      tabsIndex: 0
    }
  }

  // 加载完毕
  componentDidMount() {

    const list = [
      {name: '李磊', age: 18},
      {name: '韩梅梅', age: 17},
      {name: 'Lili', age: 19},
      {name: 'Lucy', age: 18}
    ]
    const _this = this
    setTimeout(() => {
      _this.setState({list})
    }, 1000)
  }

  // 卸载时
  componentWillUnmount() {
    console.log('卸载啦啦啦啦啦啦');
  }

  handleInput(e) {
    let ttt = Toast.loading({text: 'loading...'}, () => {
      console.log('干点啥呢。。。');
      // Toast.info({text: '关闭 loading'})
    })
    ttt()
    console.log(ttt, '====tttt');


    this.setState({str: e.target.value})
  }

  // 子组件到父组件--传参的方式 1
  handleSubmit = params => () => {
    Toast.error({text: '飞升成功之前，注定是失败的，失败的，败的，的', duration: 1000 * 60 * 10})
    this.setState(prev => {
      return {btnDisabled: !prev.btnDisabled}
    });
  }

  // 子组件到父组件--传参的方式 2
  handleSubmit2 = params =>  {
    Toast.success({text: '我又飞升成功啦啦啦啦啦我又飞升成功啦啦啦啦啦我又飞升成功啦啦啦啦啦我又飞升成功啦啦啦啦啦', duration: 1000 * 60 * 10})
    this.setState(prev => {
      return {btnDisabled: !prev.btnDisabled}
    });
  }

  handleShow = curr => () => {
    let myList = this.state.list;
    myList.forEach(item => {
      if(curr.name == item.name) {
        item.active = true
      } else {
        item.active = false
      }
    })
    this.setState(state => {
      return {list: myList}
    });
  }

  handleTabs = index => () => {
    this.setState(state => {
      return { tabsIndex: index }
    });
  }


  // 调用子组件到方法
  babyClick = () => {
    Toast.info({text: '啊，又显示了啊，老婆，快出来看 toast！', duration: 1000 * 60 * 10})
    this.refs.child.childFn()
  }

  // 重新绑定 this
  babyRef = child => () => {
    this.refs.child = child
  }

  render() {
    const {tabsIndex} = this.state
    return (
      <div>
        <div>
          <img styleName="double-logo" src={logo} alt="logo"/>
        </div>

        <div styleName="show-baby">
          <ChildMethod ref="child" onRef={this.babyRef}  onClick={this.babyClick}></ChildMethod>
        </div>

        <input disabled={this.state.btnDisabled} styleName="double-input" value={this.state.str} onChange={(e) => this.handleInput(e)} />
        <div>{this.state.str}</div>
        <div>
          <MyButton text="提个交" handleClick={this.handleSubmit}></MyButton>
        </div>
        <div>
          <MyButton text="提个交2" handleClick={(p) => this.handleSubmit2.bind(this, p)}></MyButton>
        </div>
        <DoubleList handleClick={this.handleShow} list={this.state.list}></DoubleList>

        <div styleName="double-tabs">
          <span styleName={tabsIndex == 0 ? 'tab_active' : ''} onClick={this.handleTabs(0)}>我是 tab 1</span>
          <span styleName={tabsIndex == 1 ? 'tab_active' : ''} onClick={this.handleTabs(1)}>我是 tab 2</span>
          { tabsIndex == 0 &&
            (<div styleName="tabs-context">
              我是 tab 1我是 tab 1我是 tab 1我是 tab 1我是 tab 1我是 tab 1我是 tab 1我是 tab 1我是 tab 1
            </div>)}
          { tabsIndex == 1 &&
            (<div styleName="tabs-context">
              我是 tab 2我是 tab 2我是 tab 2我是 tab 2我是 tab 2我是 tab 2我是 tab 2我是 tab 2我是 tab 2
            </div>)
          }
        </div>

        {/* <div>
          <MyButton text="点我显示信息" handleClick={this.handleSubmit}></MyButton>
          <MyButton text="点我显示正确" handleClick={this.handleSubmit}></MyButton>
          <MyButton text="点我显示错误" handleClick={this.handleSubmit}></MyButton>
        </div> */}
      </div>
    )
  }
}

export default cssModule(DoubleTest,styles);
