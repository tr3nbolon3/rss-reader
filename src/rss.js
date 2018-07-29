import isURL from 'validator/lib/isURL';
import axios from 'axios';
import { parseRSS } from './parsers';

const buildURL = channelURL =>
  `https://cors-anywhere.herokuapp.com/${channelURL}`;

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

export const updateChannels = (_state) => {
  const state = _state;
  const update = () => {
    if (!state.channels.length) {
      return;
    }
    state.channels.forEach(({ rssURL, articles }) => {
      axios.get(buildURL(rssURL))
        .then((res) => {
          const updatedArticles = parseRSS(res.data).articles;
          const newArticles = updatedArticles.filter(({ link }) =>
            (!articles.find(item => item.link === link)));

          if (newArticles.length) {
            articles.push(...newArticles);
            console.log(newArticles);
            state.newArticles = newArticles;
          }
        })
        .catch(err => console.log(err));
    });
  };
  setInterval(update, 1000 * 5);
};

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
