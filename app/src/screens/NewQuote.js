import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {Header} from '@react-navigation/stack';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

import {createQuote, updateQuote} from '../actions';
import MyHeader from '../components/MyHeader';

const MAX_LENGTH = 250;

export default function NewQuote(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  let {quote} = props.route.params;
  const {quotes} = useSelector((state) => state.QuotesReducer);
  //   let quote =  navigation.getParam('quote', null);

  //1 - DECLARE VARIABLES
  const [isSaving, setIsSaving] = useState(false);
  const [author, setAuthor] = useState(quote ? quote.author : '');
  const [text, setText] = useState(quote ? quote.text : '');

  //==================================================================================================

  //2 - GET FLATLIST DATA
  const onSave = () => {
    let edit = quote !== null && quote !== undefined;
    let quote_ = {};
    if (edit) {
      quote_ = quote;
      quote_['author'] = author;
      quote_['text'] = text;
    } else {
      let id = generateID();
      quote_ = {id: id, author: author, text: text};
    }
    if (quotes !== null && quote !== undefined) {
      if (!edit) {
        //add the new quote to the top
        quotes.unshift(quote_);
      } else {
        //find the index of the quote with the quote id
        const index = quotes.findIndex((obj) => obj.id === quote_.id);

        //if the quote is in the array, replace the quote
        if (index !== -1) quotes[index] = quote_;
      }
    }
    if (!edit) dispatch(createQuote(quote_));
    else dispatch(updateQuote(quote_));
    navigation.goBack();
    //OPTION 2 - FAKE API
    // let url = "https://my-json-server.typicode.com/mesandigital/demo/items";
    // axios.post(url, quote_)
    //     .then(res => res.data)
    //     .then((data) => {
    //         dispatch(quote ? updateQuote(data) : addQuote(data));
    //         navigation.goBack();
    //     })
    //     .catch(error => alert(error.message))
  };

  //==================================================================================================

  //3 - GENERATE ID
  const generateID = () => {
    let d = new Date().getTime();
    let id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(5);
      },
    );

    return id.substring(1, 4);
  };

  //==================================================================================================

  //4 - RENDER
  let disabled = author.length > 0 && text.length > 0 ? false : true;
  return (
    <ScrollView>
      <MyHeader
        title={quote ? 'Update Quote' : 'Add Quote'}
        back={() => navigation.goBack()}
      />

      <SafeAreaView>
        <View>
          <TextInput
            onChangeText={(text) => setAuthor(text)}
            placeholder={'Author'}
            autoFocus={true}
            style={[styles.author]}
            value={author}
          />
          <TextInput
            multiline={true}
            onChangeText={(text) => setText(text)}
            placeholder={'Enter Quote'}
            style={[styles.text]}
            maxLength={MAX_LENGTH}
            value={text}
          />
        </View>

        <View style={styles.buttonContainer}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text
              style={[
                styles.count,
                MAX_LENGTH - text.length <= 10 && {color: 'red'},
              ]}>
              {' '}
              {MAX_LENGTH - text.length}
            </Text>
          </View>
          <View>
            <TouchableHighlight
              style={[styles.button]}
              disabled={disabled}
              onPress={onSave}
              underlayColor="rgba(0, 0, 0, 0)">
              <Text
                style={[
                  styles.buttonText,
                  {color: disabled ? 'rgba(255,255,255,.5)' : '#FFF'},
                ]}>
                Save
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  buttonContainer: {
    height: 70,
    flexDirection: 'row',
    padding: 12,
    backgroundColor: 'white',
  },

  count: {
    fontFamily: 'HelveticaNeue-Medium',
    fontSize: 17,
    color: '#6B9EFA',
  },

  button: {
    width: 80,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6B9EFA',
  },

  buttonText: {
    fontFamily: 'HelveticaNeue-Medium',
    fontSize: 16,
  },

  author: {
    fontSize: 20,
    lineHeight: 22,
    fontFamily: 'Helvetica Neue',
    height: 80,
    padding: 16,
    borderWidth: 1,
    margin: 10,
    // backgroundColor: 'white',
  },

  text: {
    fontSize: 30,
    lineHeight: 33,
    fontFamily: 'Helvetica Neue',
    color: '#333333',
    padding: 16,
    paddingTop: 16,
    minHeight: 170,
    borderTopWidth: 1,
    borderWidth: 1,
    margin: 10,
    borderColor: '#000',
  },
});
