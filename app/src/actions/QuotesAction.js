import {makeSyncLoop, isNotSync} from '../utils/itemSyncUtils';
import constFactory from '../factories/const.factory';

export const types = constFactory('quote');

export const syncQuotes = (options) => {
  return (dispatch, getState) => {
    return dispatch(loadQuotes(options)).then(() => {
      const itemsToSync = getState().QuotesReducer.quotes.filter(isNotSync);
      return Promise.all(itemsToSync.map((item) => dispatch(saveQuote(item))));
    });
  };
};
export const startSyncLoop = makeSyncLoop(syncQuotes);

export const loadQuotes = (options) => {
  return {
    url: 'quotes',
    method: 'get',
    meta: {
      ...options,
    },
    types: {
      start: types.LOAD_START,
      success: types.LOAD_SUCCESS,
      noConnection: types.LOAD_NO_CONNECTION,
      error: types.LOAD_ERROR,
    },
  };
};

export const saveQuote = (quote) =>
  !quote.id || quote._isNew ? createQuote(quote) : updateQuote(quote);

export const updateQuote = (quote) => {
  return {
    url: `quotes/${quote.id}`,
    method: 'put',
    body: quote,
    types: {
      start: types.UPDATE_START,
      success: types.UPDATE_SUCCESS,
      noConnection: types.UPDATE_NO_CONNECTION,
      error: types.UPDATE_ERROR,
    },
  };
};

export const createQuote = (quote) => {
  const id = quote.id || Date.now().toString();
  console.log('data', {
    ...quote,
    _isNew: true,
    id,
  });
  return {
    url: 'quotes',
    method: 'post',
    body: {
      ...quote,
      _isNew: true,
      id,
    },
    meta: {
      id,
    },
    types: {
      start: types.CREATE_START,
      success: types.CREATE_SUCCESS,
      noConnection: types.CREATE_NO_CONNECTION,
      error: types.CREATE_ERROR,
    },
  };
};

export const deleteQuote = (id) => (dispatch, getState) => {
  const quote = getState().QuotesReducer.quotes.find((item) => item.id === id);

  return dispatch(
    quote._isNew ? deleteNewQuote(quote.id) : deleteExistingQuote(quote),
  );
};

const deleteNewQuote = (id) => {
  return {
    type: types.DELETE_NEW,
    payload: {id},
  };
};

const deleteExistingQuote = (quote) => {
  console.log('id', quote);

  return {
    url: `quotes/${quote.id}`,
    method: 'put',
    body: {
      ...quote,
      isDeleted: true,
    },
    types: {
      start: types.DELETE_START,
      success: types.DELETE_SUCCESS,
      noConnection: types.DELETE_NO_CONNECTION,
      error: types.DELETE_ERROR,
    },
  };
};
