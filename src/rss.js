import isURL from 'validator/lib/isURL';
import axios from 'axios';
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

export const updateChannels = (_state) => {
  const state = _state;

  const update = () => {
    if (!state.channels.length) {
      return;
    }
    state.channels.forEach(({ rssURL, articles }) =>
      fetchChannel(rssURL)
        .then((dataRSS) => {
          const updatedArticles = dataRSS.articles;
          const newArticles = updatedArticles.filter(({ link }) =>
            (!articles.find(item => item.link === link)));

          if (!newArticles.length) {
            return;
          }

          articles.push(...newArticles);
          state.newArticles = newArticles;
        })
        .catch(err => console.log(err)));
  };

  setInterval(update, 1000 * 5);
};

export const addChannel = (_state) => {
  const state = _state;
  const channelURL = state.inputValue;
  state.loadingStatus = 'load';

  return fetchChannel(channelURL)
    .then((dataRSS) => {
      const channel = {
        title: dataRSS.title,
        desc: dataRSS.desc,
        articles: dataRSS.articles,
        siteURL: dataRSS.link,
        rssURL: channelURL,
      };

      state.channels.push(channel);
      state.loadingStatus = 'pending';
    })
    .catch(() => {
      state.loadingStatus = 'error';
    });
};
