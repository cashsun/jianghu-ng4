import { IUser, IArticles } from './types/models';
import { environment } from '../environments/environment';

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
const middleWares = [];
if (!environment.production) {
  middleWares.push(createLogger());
}

export const store: Store<IAppState> = createStore(
  rootReducer,
  applyMiddleware(...middleWares)
);
