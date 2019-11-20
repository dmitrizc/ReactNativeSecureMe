import { API_SERVER_URL } from '../constants';

const makeURL = res => {
  if (!res) {
    return null;
  }

  let input = String(res);

  if (input.startsWith('/')) {
    input = `${API_SERVER_URL}${input}`;
  } else if (!input.startsWith('http')) {
    input = `${API_SERVER_URL}/${input}`;
  }

  return { uri: input };
};

export { makeURL };
