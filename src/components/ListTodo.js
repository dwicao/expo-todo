import React, { Component, PropTypes } from 'react';
import {
    ListView,
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { height, width } from 'react-native-dimension';

class ListTodo extends Component {
  constructor(props) {
    super(props);

    this.renderRow = this.renderRow.bind(this);
  }

  static propTypes = {
    dataSource: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onCheck: PropTypes.func.isRequired,
    onPressEdit: PropTypes.func.isRequired,
    onChangeText: PropTypes.func.isRequired,
    onSubmitEditing: PropTypes.func.isRequired,
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
    const isDoneOrNot = rowData.status === "done" ? "check-box" : "check-box-outline-blank";
    const textIsDoneOrNot = rowData.status === "done" ? styles.textIsDone : styles.text;

    return (
        <View style={styles.row}>
            <View style={styles.leftSection}>
                { !rowData.isEdit &&
                    <TouchableOpacity onPress={() => this.props.onCheck(rowData.id, rowData.name, rowData.status)}>
                        <MaterialIcons name={isDoneOrNot} size={width(7)} color="#e7b109" style={styles.icon}/>
                    </TouchableOpacity>
                }
                { rowData.isEdit ?
                    <TextInput style={styles.textInput}
                        onChangeText={name => this.props.onChangeText(rowData.id, name)}
                        value={rowData.name}
                        onSubmitEditing={() => this.props.onSubmitEditing(rowData.id)}
                    />
                :
                    <TouchableOpacity onPress={() => this.props.onPressEdit(rowData.id)} style={{ flex: 1 }}>
                        <Text numberOfLines={1} style={textIsDoneOrNot}>{rowData.name}</Text>
                    </TouchableOpacity>
                }
            </View>
            { !rowData.isEdit &&
                <View style={styles.rightSection}>
                    <TouchableOpacity onPress={() => this.props.onDelete(rowData.id)}>
                        <MaterialIcons name="close" size={width(7)} color="#e7b109" style={styles.icon}/>
                    </TouchableOpacity>
                </View>
            }
        </View>
    );
  }
}

const styles = StyleSheet.create({
    contentContainerStyle: {
        marginTop: -width(1),
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: width(1),
        height: height(6),
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
    textInput: {
        flex: 1,
        color: '#e7b109',
        marginHorizontal: width(2),
    },
    icon: {
        marginHorizontal: width(2),
    },
});

ListTodo.propTypes = {
    dataSource: PropTypes.object.isRequired,
    onCheck: PropTypes.func.isRequired,
    onChangeText: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onPressEdit: PropTypes.func.isRequired,
    onSubmitEditing: PropTypes.func.isRequired,
};

export default ListTodo;