import React, {useRef} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {deleteQuote} from '../actions';
let colours = ['#ff8e42', '#4F6384'];

export default function ListItem({item, index, navigation}) {
  const dispatch = useDispatch();
  //5 - EDIT QUOTE
  const onEdit = (item) => {
    navigation.navigate('NewQuote', {quote: item, title: 'Edit Quote'});
  };

  //==================================================================================================

  //6 - DELETE QUOTE
  const onDelete = (id) => {
    //OPTION 1 - UPDATE LOCAL STORAGE DATA
    //Update the local storage
    dispatch(deleteQuote(id));
  };

  function random() {
    if (index % 2 === 0) {
      //check if its an even number
      return colours[0];
    } else {
      return colours[1];
    }
  }

  return (
    <View style={styles.row}>
      <View style={[styles.container, {backgroundColor: random()}]}>
        <Text style={styles.quote}>{item.text}</Text>
        <Text style={styles.author}>- {item.author}</Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => onEdit(item)}>
            <Text>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => onDelete(item.id)}>
            <Text>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
    backgroundColor: '#FFF',
    padding: 10,
  },

  container: {
    padding: 10,
  },

  author: {
    marginTop: 25,
    marginBottom: 10,
    fontFamily: 'HelveticaNeue-Medium',
    fontSize: 15,
    color: '#FFF',
    textAlign: 'right',
  },

  quote: {
    marginTop: 5,
    fontFamily: 'HelveticaNeue-Medium',
    fontSize: 17,
    lineHeight: 21,
    color: '#FFF',
  },

  buttons: {
    width: 190,
    flexDirection: 'row',
  },
  buttonContainer: {
    backgroundColor: '#fff',
    width: 100,
    height: 40,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },

  rightAction: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: 95,
  },

  editAction: {
    backgroundColor: '#497AFC',
  },

  deleteAction: {
    backgroundColor: '#dd2c00',
  },

  actionText: {
    color: '#fff',
    fontWeight: '600',
    padding: 20,
  },
});
