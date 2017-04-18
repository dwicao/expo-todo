import React, { Component } from 'react';
import {
  StyleSheet,
  ListView,
  Text,
  View,
} from 'react-native';
import uuidV4 from 'uuid/v4';
import AddTodo from './AddTodo';
import ListTodo from './ListTodo';
import { width, height } from '../utils';

export default class Home extends Component {
  constructor() {
    super();

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.rowData = [
      {
        _id: uuidV4(),
        isEdit: false,
        isDone: false,
        text: 'row 1 row 1 row 1 row 1 row 1 row 1 row 1 row 1 row 1 row 1 row 1 row 1 row 1 row 1 row 1 row 1 row 1 ',
      },
      {
        _id: uuidV4(),
        isEdit: false,
        isDone: false,
        text: 'row 2',
      },
      {
        _id: uuidV4(),
        isEdit: false,
        isDone: false,
        text: 'row 3',
      },
    ];

    this.state = {
      addTodoValue: '',
      dataSource: ds.cloneWithRows(this.rowData),
    };

    this.onChangeAddTodo = this.onChangeAddTodo.bind(this);
    this.onAddTodo = this.onAddTodo.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.onPressEdit = this.onPressEdit.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onSubmitAddTodo = this.onSubmitAddTodo.bind(this);
    this.onSubmitEditTodo = this.onSubmitEditTodo.bind(this);
  }

  onChangeAddTodo(text) {
    this.setState({ addTodoValue: text });
  }

  onAddTodo() {
    this.rowData.push({
      _id: uuidV4(),
      isDone: false,
      isEdit: false,
      text: this.state.addTodoValue,
    });
    
    this.setNewData();
  }

  onSubmitAddTodo() {
    this.onAddTodo();

    this.setState({ addTodoValue: '' });
  }

  onDelete(id) {
    const newData = this.rowData.filter(todo => todo._id !== id);
    this.rowData = newData;

    this.setNewData();
  }

  onCheck(id) {
    const newData = this.rowData.map(todo => {
      if (todo._id !== id) {
        return todo;
      }

      return Object.assign({}, todo, { isDone: !todo.isDone });
    });

    this.rowData = newData;

    this.setNewData();
  }

  onPressEdit(id) {
    const newData = this.rowData.map(todo => {
      if (todo._id !== id) {
        return todo;
      }

      return Object.assign({}, todo, { isEdit: !todo.isEdit });
    });

    this.rowData = newData;

    this.setNewData();
  }

  onSubmitEditTodo(id) {
    this.onPressEdit(id);
  }

  onEdit(id, text) {
    const newData = this.rowData.map(todo => {
      if (todo._id !== id) {
        return todo;
      }

      return Object.assign({}, todo, { text });
    });

    this.rowData = newData;

    this.setNewData();
  }

  setNewData() {
    this.setState({ dataSource: this.state.dataSource.cloneWithRows(this.rowData) });
  }
  
  render() {
    return (
      <View style={styles.container}>
        <AddTodo onChangeText={this.onChangeAddTodo}
          onPress={this.onAddTodo}
          value={this.state.addTodoValue}
          onSubmitEditing={this.onSubmitAddTodo}
        />
        <ListTodo dataSource={this.state.dataSource}
          onDelete={this.onDelete}
          onCheck={this.onCheck}
          onPressEdit={this.onPressEdit}
          onChangeText={this.onEdit}
          onSubmitEditing={this.onSubmitEditTodo}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    padding: width * 0.02,
    backgroundColor: '#e7e2d3',
  },
});