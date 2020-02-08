
const React = require('react');
const largeNumber = require('learning-large-number');
const logo = require('./images/logo.png').default;
const s = require('./search.less');

class Search extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      Text: null,
    };
  }

  loadComponent() {
    import('./text.jsx').then((Text) => {
      this.setState({
        Text: Text.default,
      });
    });
  }

  render() {
    const { Text } = this.state;
    const addResult = largeNumber('999', '1');
    return (
      <div className="search-text">
        {
                Text ? <Text /> : null
            }
        { addResult }
        搜索文字的内容
        <img src={ logo } alt='feiji' onClick={this.loadComponent.bind(this)}/>
      </div>
    );
  }
}

module.exports = <Search />;
