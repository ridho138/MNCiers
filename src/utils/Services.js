import {Constants} from './Constants';
import {setData, getData, setEnvelope} from './Utils';
import axios from 'axios';
import {parseString} from 'react-native-xml2js';

const ServiceLogin = async (dataUser, isLogin) => {
  const {wsUrl, wsLogin, applicationType, KEY_DATA_USER} = Constants;

  const {uid, password, registrationId} = dataUser;

  let result;

  const data = [
    {
      name: 'uid',
      value: uid,
    },
    {
      name: 'password',
      value: password,
    },
    {
      name: 'registrationId',
      value: registrationId,
    },
    {
      name: 'isLogin',
      value: isLogin,
    },
    {
      name: 'applicationtype',
      value: applicationType,
    },
  ];

  const envelope = await setEnvelope(wsLogin, data);

  try {
    let responseAxios = await axios.post(wsUrl, envelope, {
      headers: {'Content-Type': 'application/soap+xml'},
    });
    let data = await responseAxios.data;
    let dataSplit = data.split('<?xml');
    let resp = JSON.parse(dataSplit[0]);

    if (resp[0] !== '' && resp[0] !== undefined) {
      result = {
        ...dataUser,
        isLogin: isLogin,
        status: 'SUCCESS',
        profile: resp[0],
      };
      await setData(KEY_DATA_USER, JSON.stringify(result));
    } else {
      result = {
        status: 'Invalid NIK and/or Password',
      };
    }
  } catch (error) {
    result = {
      status: JSON.stringify(error),
    };
  }
  return result;
};

const serviceGetAttendaceList = async (datefrom, dateto) => {
  const {
    wsUrl,
    wsGetAttendanceList,
    applicationType,
    KEY_DATA_USER,
  } = Constants;
  const {uid, password} = await getData(KEY_DATA_USER);

  let result;

  const data = [
    {
      name: 'uid',
      value: uid,
    },
    {
      name: 'password',
      value: password,
    },
    {
      name: 'datefrom',
      value: datefrom,
    },
    {
      name: 'dateto',
      value: dateto,
    },
    {
      name: 'keyword',
      value: '',
    },
    {
      name: 'applicationtype',
      value: applicationType,
    },
  ];

  const envelope = await setEnvelope(wsGetAttendanceList, data);

  try {
    let responseAxios = await axios.post(wsUrl, envelope, {
      headers: {'Content-Type': 'application/soap+xml'},
    });
    let data = await responseAxios.data;
    let dataSplit = data.split('<?xml');
    let resp = JSON.parse(dataSplit[0]);

    if (resp[0] !== '' && resp[0] !== undefined) {
      result = resp;
    } else {
      result = 'error';
    }
  } catch (error) {
    result = 'error';
  }
  return result;
};

const serviceGetNotificationsList = async () => {
  const {
    wsUrl,
    wsGetNotificationsList,
    applicationType,
    KEY_DATA_USER,
  } = Constants;
  const {uid, password} = await getData(KEY_DATA_USER);

  let result;

  const data = [
    {
      name: 'uid',
      value: uid,
    },
    {
      name: 'password',
      value: password,
    },
    {
      name: 'applicationtype',
      value: applicationType,
    },
  ];

  const envelope = await setEnvelope(wsGetNotificationsList, data);
  try {
    let responseAxios = await axios.post(wsUrl, envelope, {
      headers: {'Content-Type': 'application/soap+xml'},
    });
    let data = await responseAxios.data;
    let dataSplit = data.split('<?xml');
    let resp = JSON.parse(dataSplit[0]);

    if (resp[0] !== '' && resp[0] !== undefined) {
      result = resp;
    } else {
      result = 'error';
    }
  } catch (error) {
    result = 'error';
  }
  return result;
};

const serviceGetStaffContactList = async keyword => {
  const {
    wsUrl,
    wsGetStaffContactList,
    applicationType,
    KEY_DATA_USER,
  } = Constants;
  const {uid, password} = await getData(KEY_DATA_USER);

  let result;

  const data = [
    {
      name: 'uid',
      value: uid,
    },
    {
      name: 'password',
      value: password,
    },
    {
      name: 'keyword',
      value: keyword,
    },
    {
      name: 'applicationtype',
      value: applicationType,
    },
  ];

  const envelope = await setEnvelope(wsGetStaffContactList, data);
  try {
    let responseAxios = await axios.post(wsUrl, envelope, {
      headers: {'Content-Type': 'application/soap+xml'},
    });
    let data = await responseAxios.data;
    let dataSplit = data.split('<?xml');
    let resp = JSON.parse(dataSplit[0]);

    if (resp[0] !== '' && resp[0] !== undefined) {
      result = resp;
    } else {
      result = 'error';
    }
  } catch (error) {
    result = 'error';
  }
  return result;
};

const serviceUpdateNotification = async id => {
  const {
    wsUrl,
    wsUpdateNotification,
    applicationType,
    KEY_DATA_USER,
  } = Constants;
  const {uid, password} = await getData(KEY_DATA_USER);

  let result;

  const data = [
    {
      name: 'uid',
      value: uid,
    },
    {
      name: 'password',
      value: password,
    },
    {
      name: 'id_notification',
      value: id,
    },
    {
      name: 'applicationtype',
      value: applicationType,
    },
  ];

  const envelope = await setEnvelope(wsUpdateNotification, data);
  try {
    let responseAxios = await axios.post(wsUrl, envelope, {
      headers: {'Content-Type': 'application/soap+xml'},
    });
    let data = await responseAxios.data;
    let dataSplit = data.split('<?xml');
    result = dataSplit[0];
  } catch (error) {
    result = 'error';
  }
  return result;
};

const serviceGetApprovalList = async keyword => {
  const {wsUrl, wsGetApprovalList, applicationType, KEY_DATA_USER} = Constants;
  const {uid, password} = await getData(KEY_DATA_USER);

  let result;

  const data = [
    {
      name: 'uid',
      value: uid,
    },
    {
      name: 'password',
      value: password,
    },
    {
      name: 'keyword',
      value: keyword,
    },
    {
      name: 'applicationtype',
      value: applicationType,
    },
  ];

  const envelope = await setEnvelope(wsGetApprovalList, data);
  try {
    let responseAxios = await axios.post(wsUrl, envelope, {
      headers: {'Content-Type': 'application/soap+xml'},
    });
    let data = await responseAxios.data;
    let dataSplit = data.split('<?xml');
    let resp = JSON.parse(dataSplit[0]);

    if (resp[0] !== '' && resp[0] !== undefined) {
      result = resp;
    } else {
      result = 'error';
    }
  } catch (error) {
    result = 'error';
  }
  return result;
};

const serviceUpdateApproval = async (
  id,
  approval_type,
  status,
  remarks,
  form_type,
) => {
  const {wsUrl, wsUpdateApproval, applicationType, KEY_DATA_USER} = Constants;
  const {uid, password} = await getData(KEY_DATA_USER);

  let result;

  const data = [
    {
      name: 'uid',
      value: uid,
    },
    {
      name: 'password',
      value: password,
    },
    {
      name: 'approval_id',
      value: id,
    },
    {
      name: 'approval_type',
      value: approval_type,
    },
    {
      name: 'status',
      value: status,
    },
    {
      name: 'remarks',
      value: remarks,
    },
    {
      name: 'formType',
      value: form_type,
    },
    {
      name: 'applicationtype',
      value: applicationType,
    },
  ];

  const envelope = await setEnvelope(wsUpdateApproval, data);
  try {
    let responseAxios = await axios.post(wsUrl, envelope, {
      headers: {'Content-Type': 'application/soap+xml'},
    });
    let data = await responseAxios.data;
    let dataSplit = data.split('<?xml');
    result = dataSplit[0];
  } catch (error) {
    result = 'error';
  }
  return result;
};

export {
  ServiceLogin,
  serviceGetAttendaceList,
  serviceGetNotificationsList,
  serviceGetStaffContactList,
  serviceUpdateNotification,
  serviceGetApprovalList,
  serviceUpdateApproval,
};
