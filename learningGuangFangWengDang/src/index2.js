
import _ from 'lodash';
function component() {
  let element = document.createElement('div');
  let btn = document.createElement('button');

  element.innerHTML = _.join(['Hello', 'webpack', '你gg好gfffgddd年'], ' ');

  btn.innerHTML = '点击这里，然后查看 console！'
  // 使用懒加载
  btn.onclick = e => import(/* webpackChunkName: print */ './print.js').then(module => {
    const myPrint = module.default
    myPrint()
  })
  element.appendChild(btn)
  return element;
}
  
document.body.appendChild(component());
