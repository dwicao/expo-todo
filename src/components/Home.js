import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AddTodo from './AddTodo';
import ListTodo from './ListTodo';
import { width, height } from '../utils';

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      addTodoValue: '',
    };

    this.onChangeAddTodo = this.onChangeAddTodo.bind(this);
  }

  onChangeAddTodo(text) {
    this.setState({ addTodoValue: text });
  }
  
  render() {
    return (
      <View style={styles.container}>
        <AddTodo onChangeText={this.onChangeAddTodo}
          value={this.state.addTodoValue}
        />
        <ListTodo />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    padding: width * 0.02,
    backgroundColor: '#fff',
  },
});