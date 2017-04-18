import React, { Component, PropTypes } from 'react';
import {
    ListView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { height, width } from '../utils';

class ListTodo extends Component {
  constructor() {
    super();

    this.renderRow = this.renderRow.bind(this);
  }

  render() {
    return (
      <ListView
        dataSource={this.props.dataSource}
        renderRow={this.renderRow}
        contentContainerStyle={styles.contentContainerStyle}
        enableEmptySections={true}
      />
    );
  }

  renderRow(rowData) {
    const isDoneOrNot = rowData.isDone ? "check-box" : "check-box-outline-blank";
    const textIsDoneOrNot = rowData.isDone ? styles.textIsDone : styles.text;

    return (
        <View style={styles.row}>
            <View style={styles.leftSection}>
                <TouchableOpacity onPress={() => this.props.onCheck(rowData._id)}>
                    <MaterialIcons name={isDoneOrNot} size={width * 0.07} color="#e7b109" style={styles.icon}/>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1 }}>
                    <Text numberOfLines={1} style={textIsDoneOrNot}>{rowData.text}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.rightSection}>
                <TouchableOpacity onPress={() => this.props.onDelete(rowData._id)}>
                    <MaterialIcons name="close" size={width * 0.07} color="#e7b109" style={styles.icon}/>
                </TouchableOpacity>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    contentContainerStyle: {
        marginTop: -(width * 0.01),
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: width * 0.01,
        height: height * 0.06,
        backgroundColor: '#2d2b69',
    },
    leftSection: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    rightSection: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#e7b109',
        backgroundColor: 'transparent',
    },
    textIsDone: {
        color: '#e7b109',
        backgroundColor: 'transparent',
        textDecorationLine: 'line-through',
    },
    icon: {
        marginHorizontal: width * 0.02,
    },
});

ListTodo.propTypes = {
    dataSource: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onCheck: PropTypes.func.isRequired,
};

export default ListTodo;