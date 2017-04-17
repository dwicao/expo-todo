import React, { Component } from 'react';
import {
    ListView,
    Text,
    StyleSheet,
} from 'react-native';

class ListTodo extends Component {
  constructor() {
    super();

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      dataSource: ds.cloneWithRows(['Loading...']),
    };
  }

  componentDidMount() {
    const url = 'https://jsonplaceholder.typicode.com/posts';

    fetch(url)
        .then(res => res.json())
        .then(data => {
            this.setState({ dataSource: this.state.dataSource.cloneWithRows(data) });
        });

  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <Text style={styles.text}>{rowData.title}</Text>}
      />
    );
  }
}

const styles = StyleSheet.create({
    text: {
        margin: 5,
        backgroundColor: '#BADA55',
    },
});

export default ListTodo;