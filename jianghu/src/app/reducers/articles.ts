import { omit } from 'lodash';
import deepExtend from 'deep-extend';
import {
  SET_ARTICLES,
  REMOVE_ARTICLE,
  UPSERT_ARTICLE,
  SET_GROUP,
  SET_FAV,
  SET_MATCH,
  SET_SEARCH
} from '../actions/articles';

const initial = { items: {}, match: { group: 'unread', fav: false }, search: null };

export const articles = (state = initial, action) => {
  switch (action.type) {
    case SET_ARTICLES:
      return Object.assign({}, state, { items: action.articles });

    case REMOVE_ARTICLE:
      return Object.assign({}, state,
        { items: omit(state.items, action.uaid) });

    case UPSERT_ARTICLE:
      const uArticle = action.article;
      const items = deepExtend({}, state.items,
        { [uArticle._id]: uArticle });
      return Object.assign({}, state, { items });

    case SET_GROUP: {
      const match = Object.assign({}, state.match, { group: action.group });
      return Object.assign({}, state, { match });
    }
    case SET_FAV: {
      const match = Object.assign({}, state.match, { fav: action.fav });
      return Object.assign({}, state, { match });
    }

    case SET_MATCH:
      const match = Object.assign({}, state.match, action.match);
      return Object.assign({}, state, { match });

    case SET_SEARCH:
      return Object.assign({}, state, { search: action.search });

    default:
      return state;
  }
};
