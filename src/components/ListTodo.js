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
  }

  render() {
    return (
      <ListView
        dataSource={this.props.dataSource}
        renderRow={this.renderRow}
        contentContainerStyle={styles.contentContainerStyle}
      />
    );
  }

  renderRow(rowData) {
      return (
        <View style={styles.rowContainer}>
            <View style={styles.row}>
                <TouchableOpacity>
                    <MaterialIcons name="check-box-outline-blank" size={width * 0.07} color="gray" style={styles.icon}/>
                </TouchableOpacity>
                <Text style={styles.text}>{rowData}</Text>
            </View>
            <View style={styles.row}>
                <TouchableOpacity>
                    <MaterialIcons name="edit" size={width * 0.07} color="gray" style={styles.icon}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <MaterialIcons name="delete-forever" size={width * 0.07} color="gray" style={styles.icon}/>
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
        alignItems: 'center',
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: width * 0.01,
        height: height * 0.06,
        backgroundColor: '#BADA55',
    },
    text: {
        backgroundColor: 'transparent',
    },
    icon: {
        marginHorizontal: width * 0.02,
    },
});

ListTodo.propTypes = {
    dataSource: PropTypes.object.isRequired,
};

export default ListTodo;