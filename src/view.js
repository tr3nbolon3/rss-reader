import { query, createElemFromStr } from './utils';

export const getInputElem = () => query('[data-rss="input"]');
export const getAddBtnElem = () => query('[data-rss="btn"]');
export const getChannelListElem = () => query('[data-rss="channels"]');
export const getArticleListElem = () => query('[data-rss="articles"]');
export const getModalElem = () => query('[data-rss="desc-modal"]');

export const renderValidErr = (inputStatus) => {
  const input = getInputElem();

  let method;
  if (inputStatus === 'valid' || inputStatus === 'empty') {
    method = 'remove';
  } else if (inputStatus === 'invalid') {
    method = 'add';
  }

  input.classList[method]('is-invalid');
};

export const renderLoadErr = () => {
  const errorTemplate = `
    <div class="alert alert-danger mb-0 w-100 position-absolute" role="alert">
      Что-то пошло не так, попробуйте снова.
    </div>
  `;
  const errorEl = createElemFromStr(errorTemplate);
  const docBody = document.body;
  docBody.prepend(errorEl);
  setTimeout(() => docBody.removeChild(errorEl), 1000 * 5);
};

export const clearInput = () => {
  const input = getInputElem();
  input.value = '';
};

export const renderLoading = (isLoading) => {
  const addBtn = getAddBtnElem();
  addBtn.textContent = isLoading ? 'Загрузка...' : 'Добавить';
};

export const renderChannel = ({ title, desc, siteURL }) => {
  const channelList = getChannelListElem();
  const channelTemplate = `
    <div class="card mb-2">
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${desc}</p>
        <a href="${siteURL}" target="_blank" class="card-link">
          Перейти на сайт
        </a>
      </div>
    </div>
  `;
  const channelEl = createElemFromStr(channelTemplate);
  channelList.append(channelEl);
};

const createDescBtn = (link, title, desc) => {
  const btnTemplate = `
    <button
      type="button"
      class="btn btn-primary ml-auto"
      data-toggle="modal"
      data-target="#modal"
      data-rss="desc-btn"
    >
      Посмотреть описание
    </button>
  `;
  const btn = createElemFromStr(btnTemplate);
  btn.setAttribute('data-link', link);
  btn.setAttribute('data-desc', desc);
  btn.setAttribute('data-title', title);
  return btn;
};

export const renderArticles = (articles) => {
  const articleList = getArticleListElem();
  const reversed = articles.reverse();
  reversed.forEach(({ link, title, desc }) => {
    const articleTemplate = `
      <div class="card mb-2">
        <div class="card-body d-flex align-items-center">
          <a href="${link}" target="_blank" class="card-link mr-10">
            ${title}
          </a>
        </div>
      </div>
    `;

    const articleEl = createElemFromStr(articleTemplate);
    const articleBtn = createDescBtn(link, title, desc);
    const articleBody = articleEl.querySelector('.card-body');
    articleBody.append(articleBtn);
    articleList.prepend(articleEl);
  });
};

export const renderModal = ({ link, title, desc }) => {
  const modal = getModalElem();

  const titleEl = modal.querySelector('.modal-title');
  const bodyEl = modal.querySelector('.modal-body');
  const linkEl = modal.querySelector('.read-more');

  titleEl.textContent = title;
  bodyEl.innerHTML = desc;

  linkEl.setAttribute('href', link);
};
