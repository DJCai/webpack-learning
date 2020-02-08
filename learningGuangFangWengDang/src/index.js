
import _ from 'lodash';
// import myPrint from './print.js'
function component() {
  let element = document.createElement('div');
  let btn = document.createElement('button');

  element.innerHTML = _.join(['Hello', 'webpack', '你gg好gfffgddd年'], ' ');

  btn.innerHTML = '点击这里，然后查看 console！'
  
  // btn.onclick = myPrint
  btn.onclick = e => import(/* webpackChunkName: print */ './print.js').then(module => {
    const myPrint = module.default
    myPrint()
  })
  element.appendChild(btn)
  return element;
}
  
document.body.appendChild(component());

//注册 Service Worker
if (process.env.WORKBOX && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-wroker.js').then(registration => {
       console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ',registrationError);
    })
  })
}
