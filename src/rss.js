import isURL from 'validator/lib/isURL';
import axios from 'axios';
import { flatten } from 'lodash';
import { parseRSS } from './parsers';

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

const fetchChannel = url => axios
  .get(`https://cors-anywhere.herokuapp.com/${url}`)
  .then(res => parseRSS(res.data));

const updateArticles = (channels) => {
  const newArticles = channels.map(({ rssURL, articles }) =>
    fetchChannel(rssURL).then(({ articles: updatedArticles }) => {
      const newChannelArticles = updatedArticles
        .filter(({ link }) => !articles.find(item => item.link === link));

      if (newChannelArticles.length) {
        articles.push(...newChannelArticles);
      }

      return newChannelArticles;
    }));

  return Promise.all(newArticles).then(data => flatten(data));
};

export const refreshArticles = (_state) => {
  const state = _state;
  const refresh = () => setTimeout(refreshArticles, 1000 * 5, state);

  if (!state.channels.length) {
    refresh();
    return;
  }
  state.updatingStatus = 'load';
  updateArticles(state.channels)
    .then((articles) => {
      if (!articles.length) {
        return;
      }
      state.newArticles = articles;
      state.updatingStatus = 'pending';
    })
    .catch(() => {
      state.updatingStatus = 'error';
    })
    .finally(() => {
      refresh();
    });
};

export const addChannel = (_state) => {
  const state = _state;
  const channelURL = state.inputValue;
  state.loadingStatus = 'load';

  return fetchChannel(channelURL)
    .then(({ link, ...rest }) => {
      const channel = {
        ...rest,
        siteURL: link,
        rssURL: channelURL,
      };

      state.channels.push(channel);
      state.loadingStatus = 'pending';
      state.inputStatus = 'empty';
    })
    .catch(() => {
      state.loadingStatus = 'error';
    });
};
