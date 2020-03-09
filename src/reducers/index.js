import {combineReducers} from 'redux';
import {PENDING, FULFILLED, REJECTED} from 'redux-promise-middleware';
import {
  FETCH_DATA,
  FETCH_DATA_LOGIN,
  FETCH_PROFILE,
  FETCH_NOTIFICATION,
  FETCH_NOTIFICATION_HEADER,
  FETCH_APPROVAL,
  FETCH_APPROVAL_LIST,
} from '../actions/index';

export const data = (
  state = {
    items: '',
  },
  action,
) => {
  switch (action.type) {
    case `${FETCH_DATA}`:
      return {
        ...state,
        items: 'This is data from redux',
      };

    default:
      return state;
  }
};

export const dataLogin = (state = {dataLogin: {}}, action) => {
  switch (action.type) {
    case `${FETCH_DATA_LOGIN}`:
      return {
        ...state,
        dataLogin: action.payload,
      };

    default:
      return state;
  }
};

export const dataProfile = (state = {dataProfile: {}}, action) => {
  switch (action.type) {
    case `${FETCH_PROFILE}`:
      return {
        ...state,
        dataProfile: action.payload,
      };

    default:
      return state;
  }
};

export const dataNotificationHeader = (state = {data: {}}, action) => {
  switch (action.type) {
    case FETCH_NOTIFICATION_HEADER:
      return {
        ...state,
        data: action.payload,
      };
    //   case `${FETCH_NOTIFICATION_HEADER}_${PENDING}`:
    //   return {
    //     ...state
    //   }

    // case `${FETCH_NOTIFICATION_HEADER}_${FULFILLED}`:
    //   return {
    //     ...state,
    //     data: action.payload
    //   }

    // case `${FETCH_NOTIFICATION_HEADER}_${REJECTED}`:
    //   return {
    //     ...state,
    //   }

    default:
      return state;
  }
};

export const dataNotification = (state = {data: {}}, action) => {
  switch (action.type) {
    case `${FETCH_NOTIFICATION}`:
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
};

export const dataApproval = (state = {data: {}}, action) => {
  switch (action.type) {
    case `${FETCH_APPROVAL}`:
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  dataLogin: dataLogin,
  dataProfile: dataProfile,
  dataNotificationHeader: dataNotificationHeader,
  dataNotification: dataNotification,
  dataApproval: dataApproval,
});

export default rootReducer;
