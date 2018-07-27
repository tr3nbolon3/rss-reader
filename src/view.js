import { watch } from 'melanke-watchjs';

const input = document.querySelector('[data-rss="input"]');
const addBtn = document.querySelector('[data-rss="btn"]');
const channelList = document.querySelector('[data-rss="channels"]');
const articleList = document.querySelector('[data-rss="articles"]');

const renderValidError = (isValide) => {
  input.classList[isValide ? 'remove' : 'add']('is-invalid');
};

const clearInput = () => {
  input.value = '';
};

const renderLoading = (isLoading) => {
  addBtn.textContent = isLoading ? 'Идет загрузка...' : 'Добавить';
};

const createElementFromStr = (str) => {
  const div = document.createElement('div');
  div.innerHTML = str;
  return div.firstChild;
};

const renderChannel = ({ title, desc, siteURL }) => {
  const channelTemplate = `<div class="card mb-2">
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${desc}</p>
        <a href="${siteURL}" class="card-link">Перейти на сайт</a>
      </div>
    </div>`;
  const channelEl = createElementFromStr(channelTemplate);
  channelList.append(channelEl);
};

const renderArticles = ({ articles }) => {
  articles.forEach(({ link, title }) => {
    const articleTemplate = `<div class="card mb-2">
        <div class="card-body">
          <a href="${link}" class="card-link">${title}</a>
        </div>
      </div>`;
    const articleEl = createElementFromStr(articleTemplate);
    articleList.append(articleEl);
  });
};

export default (state) => {
  watch(state, 'isValide', () => {
    renderValidError(state.isValide);
  });
  watch(state, 'isLoading', () => {
    renderLoading(state.isLoading);
  });
  watch(state, 'channels', () => {
    clearInput();
    const newChannel = state.channels[state.channels.length - 1];
    renderChannel(newChannel);
    renderArticles(newChannel);
  });
};
