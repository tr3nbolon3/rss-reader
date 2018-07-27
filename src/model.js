import isURL from 'validator/lib/isURL';
import axios from 'axios';

const state = {
  isLoading: false,
  isValide: true,
  hasLoadingError: false,
  channels: [],
};

export const isValidURL = (url) => {
  if (!isURL(url)) {
    return false;
  }

  const sameChannel = state.channels
    .find(({ rssURL }) => rssURL === url);

  return !sameChannel;
};

export const updateValidState = (isValide) => {
  state.isValide = isValide;
};

export const updateLoadingState = () => {
  state.isLoading = !state.isLoading;
};

const parseArticles = articles => articles.map((article) => {
  const title = article.querySelector('title').textContent;
  const link = article.querySelector('link').textContent;
  return { title, link };
});

const parseRSS = (rssData) => {
  const parser = new DOMParser();
  const xml = parser.parseFromString(rssData, 'application/xml');

  const title = xml.querySelector('title').textContent;
  const desc = xml.querySelector('description').textContent;
  const link = xml.querySelector('link').textContent;
  const articles = parseArticles([...xml.querySelectorAll('item')]);

  return {
    link,
    title,
    desc,
    articles,
  };
};

const corsURL = 'https://cors-anywhere.herokuapp.com/';

export const addChannel = channelURL => axios
  .get(`${corsURL}${channelURL}`)
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
    updateLoadingState();
  })
  .catch(err => console.log(err));

export default state;
