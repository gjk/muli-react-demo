import React from 'react';
import ReactDOM from 'react-dom'
import cssModule from 'react-css-modules';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import styles from './sass/toast.scss'

class ToastBox extends React.Component {
  constructor() {
    super()
    this.transitionTime = 300
    this.state = { notices: [] }
    this.removeNotice = this.removeNotice.bind(this)
  }

  getNoticeKey() {
    const { notices } = this.state
    return `notice-${new Date().getTime()}-${notices.length}`
  }

  addNotice(notice) {
    const { notices } = this.state
    notice.key = this.getNoticeKey()

    notices.push(notice);//展示所有的提示
    // notices[0] = notice;//仅展示最后一个提示

    this.setState({ notices })
    if (notice.duration > 0) {
      setTimeout(() => {
        this.removeNotice(notice.key)
      }, notice.duration)
    }
    return () => { this.removeNotice(notice.key) }
  }

  removeNotice(key) {
    const { notices } = this.state
    this.setState({
      notices: notices.filter((notice) => {
        if (notice.key === key) {
          if (notice.onClose) setTimeout(notice.onClose, this.transitionTime)
          return false
        }
        return true
      })
    })
  }

  render() {
    const { notices } = this.state
    const icons = {
      info: 'icon-xinxi',
      success: 'icon-zhengque',
      error: 'icon-cuowu',
      loading: 'toast_loading'
    }
    return (
      <div styleName="toast">
        <ReactCSSTransitionGroup component="div" transitionName="toast" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          {
            notices.map(notice => (
              <div key={notice.key} styleName="toast_box">
                <span styleName="toast_text">
                  {/* {
                    notice.type == 'loading' ?
                    <i styleName={icons[notice.type]}></i> :
                    <i styleName={`iconfont ${icons[notice.type]}`}></i>
                  } */}
                  {notice.content}
                </span>
              </div>
            ))
          }
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

const ToastComponent = cssModule(ToastBox, styles, { allowMultiple: true/* 使用 styleName= 多个样式 */, handleNotFoundStyleName: 'ignore' });

function createNotification() {
  const div = document.createElement('div')
  document.body.appendChild(div)
  const notification = ReactDOM.render(<ToastComponent />, div)
  return {
    addNotice(notice) {
      return notification.addNotice(notice)
    },

    /**
     * 销毁啊销毁
     *
     */
    destroy() {
      ReactDOM.unmountComponentAtNode(div)
      document.body.removeChild(div)
    }
  }
}

let notification
const notice = (type, content, duration = 2000, onClose) => {
  if (!notification) notification = createNotification()
  return notification.addNotice({ type, content, duration, onClose })
}

export default {
  /**
   * toast 的普通方法
   * @param {*} opts 参数对象： text: 显示的文本； duration: 保持的时间
   * @param {*} onClose 关闭的回调
   */
  info(opts, onClose) {
    opts = Object.assign({text: '', duration: 2000}, opts)
    return notice('info', opts.text, opts.duration, onClose)
  },

    /**
   * toast 的success方法
   * @param {*} opts 参数对象： text: 显示的文本； duration: 保持的时间
   * @param {*} onClose 关闭的回调
   */
  success(opts, onClose) {
    opts = Object.assign({text: '操作成功', duration: 2000}, opts)
    return notice('success', opts.text, opts.duration, onClose)
  },

    /**
   * toast 的error方法
   * @param {*} opts 参数对象： text: 显示的文本； duration: 保持的时间
   * @param {*} onClose 关闭的回调
   */
  error(opts, onClose) {
    opts = Object.assign({text: '', duration: 2000}, opts)
    return notice('error', opts.text, opts.duration, onClose)
  },

    /**
   * toast 的loading方法
   * @param {*} opts 参数对象： text: 显示的文本； duration: 保持的时间
   * @param {*} onClose 关闭的回调
   */
  loading(opts, onClose) {
    opts = Object.assign({text: '加载中...', duration: 0}, opts)
    return notice('loading', opts.text, opts.duration, onClose)
  }
}