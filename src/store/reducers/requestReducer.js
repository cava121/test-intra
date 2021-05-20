import axios from 'axios';

let initialState = {
  guid: '08c5c70a-e680-41e2-a091-1ff41ce3ef04',
  requests: [],
  performers: [],
  statuses: [],
};

export const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_REQUESTS':
      return {
        ...state,
        requests: action.payload.reverse(),
      };
    case 'SET_PERFORMERS':
      return {
        ...state,
        performers: action.payload,
      };
    case 'SET_STATUSES':
      return {
        ...state,
        statuses: action.payload,
      };
    default:
      return state;
  }
};

export const fetchRequests = (guid) => {
  return axios.get(
    'http://intravision-task.test01.intravision.ru/odata/tasks',
    {
      params: {
        tenantguid: guid,
      },
    }
  );
};
