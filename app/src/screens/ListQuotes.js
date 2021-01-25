import React, {useEffect} from 'react';

import {
  FlatList,
  SafeAreaView,
  TouchableHighlight,
  StyleSheet,
  Text,
} from 'react-native';
import SampleData from '../data/sample.json';
import {useNavigation} from '@react-navigation/native';
import ListItem from '../screens/ListItem';
import {useDispatch, useSelector} from 'react-redux';
import {syncQuotes, deleteQuote, createQuote, updateQuote} from '../actions';
import MyHeader from '../components/MyHeader';

export default function ListQuotes() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(syncQuotes());
  }, []);
  const {quotes} = useSelector((state) => state.QuotesReducer);
  // console.log('items', items);
  //4 - RENDER FLATLIST ITEM
  const navigation = useNavigation();
  const renderItem = ({item, index}) => {
    return (
      item.isDeleted != true && (
        <ListItem
          item={item}
          index={index}
          navigation={navigation}
          onDelete={1}
          onEdit={1}
        />
      )
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <MyHeader title="Quotes" />

      <FlatList
        data={quotes}
        renderItem={renderItem}
        keyExtractor={(item, index) => `quotes_${index}`}
      />

      <TouchableHighlight
        style={styles.floatingButton}
        underlayColor="#ff7043"
        onPress={() => navigation.navigate('NewQuote', {quote: undefined})}>
        <Text style={{fontSize: 25, color: 'white'}}>+</Text>
      </TouchableHighlight>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  activityIndicatorContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  floatingButton: {
    backgroundColor: '#6B9EFA',
    borderColor: '#6B9EFA',
    height: 55,
    width: 55,
    borderRadius: 55 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 60,
    right: 15,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
});
