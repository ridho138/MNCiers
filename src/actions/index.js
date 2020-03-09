import {serviceGetNotificationsList} from '../utils/Services';

export const FETCH_DATA = 'FETCH_DATA';
export const fetchData = () => {
  return {
    type: FETCH_DATA,
  };
};

export const FETCH_DATA_LOGIN = 'FETCH_DATA_LOGIN';
export const fetchDataLogin = value => {
  return {
    type: FETCH_DATA_LOGIN,
    payload: value,
  };
};

export const FETCH_PROFILE = 'FETCH_PROFILE';
export const fetchProfile = value => {
  return {
    type: FETCH_PROFILE,
    payload: value,
  };
};

export const FETCH_NOTIFICATION_HEADER = 'FETCH_NOTIFICATION_HEADER';
export const fetchNotificationHeader = () => {
  return {
    type: FETCH_NOTIFICATION_HEADER,
    payload: serviceGetNotificationsList(),
  };
};

export const FETCH_NOTIFICATION = 'FETCH_NOTIFICATION';
export const fetchNotification = value => {
  return {
    type: FETCH_NOTIFICATION,
    payload: value,
  };
};

export const FETCH_APPROVAL = 'FETCH_APPROVAL';
export const fetchApproval = value => {
  return {
    type: FETCH_APPROVAL,
    payload: value,
  };
};
