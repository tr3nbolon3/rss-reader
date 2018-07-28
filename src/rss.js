import isURL from 'validator/lib/isURL';
import axios from 'axios';
import parseRSS from './parsers';

const startState = {
  loadingStatus: 'pending',
  inputValue: '',
  inputStatus: 'empty',
  modalData: { title: '', desc: '', link: '' },
  channels: [],
};

export const getLastChannel = (channels) => {
  const lastChannelIndex = channels.length - 1;
  return channels[lastChannelIndex];
};

export const isValidURL = (channels, url) => {
  if (!isURL(url)) {
    return false;
  }
  const sameChannel = channels
    .find(({ rssURL }) => rssURL === url);
  return !sameChannel;
};

const buildURL = channelURL =>
  `https://cors-anywhere.herokuapp.com/${channelURL}`;

export const addChannel = (_state) => {
  const state = _state;
  const channelURL = state.inputValue;
  state.loadingStatus = 'load';

  return axios
    .get(buildURL(channelURL))
    .then((res) => {
      const parsed = parseRSS(res.data);
      const channel = {
        title: parsed.title,
        desc: parsed.desc,
        articles: parsed.articles,
        siteURL: parsed.link,
        rssURL: channelURL,
      };

      state.channels.push(channel);
      state.loadingStatus = 'pending';
    })
    .catch(() => {
      state.loadingStatus = 'error';
    });
};

export default startState;
