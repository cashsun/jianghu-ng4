import { IUser, IArticles } from './types/models';

export interface IAppState {
  user?: IUser,
  articles?: IArticles
}

import {
  applyMiddleware,
  Store,
  createStore
} from 'redux';
import { createLogger } from 'redux-logger';
import { rootReducer } from './reducers';


export const store: Store<IAppState> = createStore(
  rootReducer,
  applyMiddleware(createLogger())
);
