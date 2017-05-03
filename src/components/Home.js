import React, { Component } from 'react';
import {
  StyleSheet,
  ListView,
  Text,
  View,
} from 'react-native';
import AddTodo from './AddTodo';
import ListTodo from './ListTodo';
import { width, height } from 'react-native-dimension';

const API_URL = 'http://192.168.1.67:9090';

export default class Home extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.rowData = [];

    this.state = {
      addTodoValue: '',
      dataSource: ds.cloneWithRows([]),
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

  componentDidMount() {
    fetch(`${API_URL}/task`)
      .then(res => res.json())
      .then(data => {
        this.setNewData(data);
      });
  }

  onChangeAddTodo(text) {
    this.setState({ addTodoValue: text });
  }

  onAddTodo() {
    const formData = new FormData();
    formData.append('name', this.state.addTodoValue);

    fetch(`${API_URL}/create-task`, {
      method: 'POST',
      body: formData
    }).then(res => res.json())
      .then(data => {
        this.rowData.push({
          id: data.id,
          name: data.name,
          created_at: data.created_at,
          updated_at: data.updated_at
        });
        
        this.setNewData();
      }).catch(err => console.log(err));
  }

  onSubmitAddTodo() {
    this.onAddTodo();
    this.setState({ addTodoValue: '' });
  }

  onDelete(id) {
    fetch(`${API_URL}/delete-task/${id}`, {
      method: 'DELETE'
    }).then(res => {
      const newData = this.rowData.filter(todo => todo.id !== id);
      this.setNewData(newData);
    }).catch(err => console.log(err));
  }

  onCheck(id, name, status) {
    const newStatus = (status === 'done') ? 'no' : 'done';
    const formData = new FormData();
    formData.append('name', name);
    formData.append('status', newStatus);

    fetch(`${API_URL}/update-task/${id}`, {
      method: 'POST',
      body: formData
    }).then(res => res.json())
      .then(data => {
        const newData = this.rowData.map(todo => {
          if (todo.id !== id) return todo;

          return Object.assign({}, todo, { status: data.status });
        });

        this.setNewData(newData);
      }).catch(err => console.log(err));
  }

  onPressEdit(id) {
    const newData = this.rowData.map(todo => {
      if (todo.id !== id) return todo;

      return Object.assign({}, todo, { isEdit: !todo.isEdit });
    });

    this.setNewData(newData);
  }

  onSubmitEditTodo(id) {
    const formData = new FormData();

    this.rowData.map(todo => {
      if (todo.id !== id) return todo;

      return formData.append('name', todo.name);
    });

    fetch(`${API_URL}/update-task/${id}`, {
      method: 'POST',
      body: formData
    }).then(res => res.json())
      .then(data => {
        const newData = this.rowData.map(todo => {
          if (todo.id !== id) return todo;

          return Object.assign({}, todo, {
            name: data.name,
            status: todo.status,
            isEdit: !todo.isEdit
          });
        });

        this.setNewData(newData);
      }).catch(err => console.log(err));
  }

  onEdit(id, name) {
    const newData = this.rowData.map(todo => {
      if (todo.id !== id) return todo;

      return Object.assign({}, todo, { name });
    });

    this.setNewData(newData);
  }

  setNewData(newData) {
    if (newData) {
      this.rowData = newData;
    }

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
    padding: width(2),
    backgroundColor: '#e7e2d3',
  },
});
