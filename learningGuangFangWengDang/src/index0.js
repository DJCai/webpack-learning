import _ from 'lodash';
import '@/static/styles/style.css';
import Data from '@/static/xml/data.xml'
function getComponent() {
    let element = document.createElement('div');

    element.innerHTML = _.join(['Hello', 'webpack', '你好'], '  ');

    element.classList.add('hello')

    var myStbr = new Image()
    myStbr.src = `${location.href}static/images/feiji.jpg`
    element.appendChild(myStbr)

    console.log(Data)
    return element;
  }
export const component = function() {
  document.body.appendChild(getComponent());
}

  