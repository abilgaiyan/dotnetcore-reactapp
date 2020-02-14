import { IActivity } from './../models/activity';
import axios, { AxiosResponse } from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody)
};

const Activities = {
  list: () => requests.get('/activities'),
  details: (id: number) => requests.get(`/activities/${id}`),
  create: (activity: IActivity) => requests.post('/activites', activity),
  update: (activity: IActivity) =>
    requests.put(`/activities/${activity.id}`, activity),
  delete: (id: number) => requests.del(`/activities/${id}`)
};

export default {
  Activities
};
