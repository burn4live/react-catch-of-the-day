import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes'

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
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
  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes
    });
  }
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh seafood market"/>
        </div>
        <Order />
        <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes}/>
      </div>
    );
  }
}

export default App;