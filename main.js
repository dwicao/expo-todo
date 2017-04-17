import Expo from 'expo';
import React from 'react';
import Home from './src/components/Home';

export default class App extends React.Component {
  render() {
    return <Home />;
  }
}

Expo.registerRootComponent(App);
