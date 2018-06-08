//真实入口文件
//引入vue类库
import Vue from 'vue'
import App from './app.vue'
// import './assets/styles/test.css'
// import './assets/styles/test-stylus.styl'
// import './assets/images/bg.jpg'
import './assets/styles/global.styl'

//设置vue内容的挂载位置
const root = document.createElement('div')
document.body.appendChild(root)

//渲染内容
//.$mount(root)  将渲染的vue中的内容挂载到root上
new Vue({
  render: (h) => h(App)
}).$mount(root)

