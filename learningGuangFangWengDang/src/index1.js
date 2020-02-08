
import _ from 'lodash';
function component() {
  let element = document.createElement('div');
  let btn = document.createElement('button');
  element.innerHTML = _.join(['Hello', 'webpack', '你gg好gfffgddd年'], ' ');

  btn.innerHTML = '点击这里，然后查看 console！'
  btn.onclick = function() {
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('i can use promise')
      },0)
    }).then(res => {
      console.log(res)
    })
  };
  element.appendChild(btn)
  return element;
}
export default function() {
  document.body.appendChild(component());
}

