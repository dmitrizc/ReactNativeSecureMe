import axios from 'axios';
import { API_SERVER_URL } from '../constants';
import { MOCK_API } from '../constants';
import _pick from 'lodash/pick';

import { dataURItoBlob } from '../utils/dataURI toBlob';

axios.defaults.baseURL = API_SERVER_URL;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const axiosWrapper = apiCall => apiCall.then(res => res.data).catch(err => Promise.reject(err));

let API = {
  // Authentication
  auth: {
    login: credentials => axiosWrapper(axios.post('/api/users/login/', credentials)),
    getProfile: userid => axiosWrapper(axios.get(`/api/users/${userid}`)),
    patchProfile: (userid, profile) => {
      const formData = new FormData();
      const fields = [
        'first_name',
        'last_name',
        'date_joined',
        'address1',
        'address2',
        'email_home',
        'email_work',
        'phone_cell',
        'phone_work',
      ];

      for (const field of fields) {
        if (profile[field] != null) {
          formData.append(field, profile[field] || '');
        }
      }

      if (profile.email_work) {
        formData.append('email', profile.email_work);
      }

      // if (profile.avatar_new && profile.avatar_new_blob) {
      //   const avatarBlob = dataURItoBlob(profile.avatar_new_blob);
      //   if (avatarBlob) {
      //     formData.append('avatar', avatarBlob);
      //   }
      // }

      if (profile.avatar_new) {
        formData.append('avatar', {
          uri: profile.avatar_new,
          type: 'image/jpeg',
          name: 'avatar.jpg',
        });
      }

      return axiosWrapper(axios.patch(`/api/users/${userid}/`, formData));
    },
  },
  home: {
    getHomeEventLive: () => axiosWrapper(axios.get('/api/users/eventlive/')),
  },
  events: {
    getEventsComingUp: () => axiosWrapper(axios.get('/api/users/eventcomingup/')),
    getEventsPast: () => axiosWrapper(axios.get('/api/users/eventpast/')),
    getEventDetails: eventid => {
      const formData = new FormData();
      formData.append('eventid', eventid);
      // return axiosWrapper(axios.post('/api/users/eventdetails/', formData));
      return axiosWrapper(
        axios({
          method: 'post',
          url: '/api/users/eventdetails/',
          data: formData,
          config: { headers: { 'Content-Type': 'multipart/form-data' } },
        }),
      );
    },
    getEventSchedules: eventid =>
      axiosWrapper(axios.get(`http://67.205.159.190:8000/api/event/schedule/?event=${eventid}`)),
  },
};

// FIXME mock api calling here
// API = MOCK_API;

export { API };
