import React, { Component } from 'react';
import {
  StyleSheet,
  ListView,
  Text,
  View,
} from 'react-native';
import AddTodo from './AddTodo';
import ListTodo from './ListTodo';
import { width, height } from '../utils';

export default class Home extends Component {
  constructor() {
    super();

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.rowData = [
        'row1',
        'row2',
        'row3',
    ];

    this.state = {
      addTodoValue: '',
      dataSource: ds.cloneWithRows(this.rowData),
    };

    this.onChangeAddTodo = this.onChangeAddTodo.bind(this);
    this.onAddTodo = this.onAddTodo.bind(this);
  }

  onChangeAddTodo(text) {
    this.setState({ addTodoValue: text });
  }

  onAddTodo() {
    this.rowData.push(this.state.addTodoValue);
    this.setState({ dataSource: this.state.dataSource.cloneWithRows(this.rowData) });
  }
  
  render() {
    return (
      <View style={styles.container}>
        <AddTodo onChangeText={this.onChangeAddTodo}
          onPress={this.onAddTodo}
          value={this.state.addTodoValue}
        />
        <ListTodo dataSource={this.state.dataSource}/>
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