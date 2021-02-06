import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import * as a from './phonebook-actions';

const initialItems = [];

const items = createReducer(initialItems, {
  [a.fetchContactSuccess]: (_, { payload }) => payload,
  [a.addContactSuccess]: (state, { payload }) => [...state, payload],
  [a.deleteContactSuccess]: (state, { payload }) =>
    state.filter(contact => contact.id !== payload),
});

const filter = createReducer('', {
  [a.setFilter]: (_, { payload }) => payload,
});

export default combineReducers({
  items,
  filter,
});
