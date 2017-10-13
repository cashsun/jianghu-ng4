import {
  combineReducers
} from 'redux';
import { user } from './user';
import { articles } from './articles';

export const rootReducer = combineReducers({
  user,
  articles
});
