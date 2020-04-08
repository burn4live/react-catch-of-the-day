import React from 'react';
import { getFunName } from '../helpers';
import PropTypes from 'prop-types';

class StorePicker extends React.Component {
  myInput = React.createRef();
  static propTypes = {
    history: PropTypes.object
  };
  
  goToStore = e => {
    // stop form from submiting
    e.preventDefault();
    // get text from input
    const storeName = this.myInput.current.value
    // change the page to /store/whatever
    this.props.history.push(`/store/${storeName}`);
  }
  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        <input ref={this.myInput} type="text" required placeholder="Store Name" defaultValue={getFunName()}/>
        <button type="submit">Visit Store -></button>
      </form>
    );
  }
}

export default StorePicker