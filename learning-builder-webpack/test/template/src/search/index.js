import React from 'react';
import ReactDom from 'react-dom';
import _ from 'lodash';
// import feiji from '@/static/images/feiji.jpg'
import '@/static/styles/style.less';
// import common from '@/static/js/inline';

import largeNumber from 'learning-large-number';

class Search extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      Text: null,
    };
  }

  loadComponent() {
    import('./text.js').then((text) => {
      this.setState({
        Text: text.default,
      });
    });
  }

  render() {
    const { Text } = this.state;
    const addResult = largeNumber('11111111111', '222222222222');
    console.log('addResult', addResult);
    return (
      <div className="search-text">
        {_.join(['Search', 'Text'], ' ')}
        {
          Text ? <Text /> : null
        }
        {/* <img src={feiji} onClick={this.loadComponent.bind(this)}/> */}
      </div>
    );
  }
}

ReactDom.render(
  <Search />,
  document.getElementById('root'),
);
