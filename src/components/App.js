import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  componentDidMount() {
    const { params } = this.props.match;
    // reinstate local storage
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef)});
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });
  };

  componentDidUpdate() {
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
  };

  componentWillUnmount() {
    base.removeBinding(this.ref);
  };

  addFish = (fish) => {
    // take copy of existing state
    const fishes = {...this.state.fishes};
    // add new fish to existing fishes
    fishes[`fish${Date.now()}`] = fish;
    // set new fishes to state
    this.setState({
      fishes
    });
  };

  updateFish = (key, updatedFish) => {
    // copy of current state
    const fishes = {...this.state.fishes};
    // update the state
    fishes[key] = updatedFish;
    // set state
    this.setState({ fishes });

  };

  deleteFish = (key) => {
    // take copy of state
    const fishes = {...this.state.fishes};
    // update state
    fishes[key] = null;
    this.setState({ fishes });
  };

  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes
    });
  };

  addToOrder = (key) => {
    // take copy of state
    const order = { ...this.state.order };
    // add to the order or update the number of our order
    order[key] = order[key] + 1 || 1;
    // call setState ad update state object
    this.setState({ order });
  };

  removeFromOrder = (key) => {
    // take copy of state
    const order = { ...this.state.order };
    // remove from order
    delete order[key];
    // call setState ad update state object
    this.setState({ order });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh seafood market"/>
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)}
          </ul>
        </div>
        <Order fishes={this.state.fishes} removeFromOrder={this.removeFromOrder} order={this.state.order} />
        <Inventory fishes={this,this.state.fishes} updateFish={this.updateFish} addFish={this.addFish} deleteFish={this.deleteFish} loadSampleFishes={this.loadSampleFishes}/>
      </div>
    );
  }
};

export default App;