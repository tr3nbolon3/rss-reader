export const getInputElem = () => document.querySelector('[data-rss="input"]');
export const getAddBtnElem = () => document.querySelector('[data-rss="btn"]');
export const getChannelListElem = () => document.querySelector('[data-rss="channels"]');
export const getArticleListElem = () => document.querySelector('[data-rss="articles"]');
export const getModalElem = () => document.querySelector('[data-rss="desc-modal"]');

const createElemFromStr = (str) => {
  const div = document.createElement('div');
  div.innerHTML = str;
  return div.firstElementChild;
};

export const renderValidErr = (inputStatus) => {
  const input = getInputElem();

  let method;
  switch (inputStatus) {
    case 'invalid':
      method = 'add';
      break;
    case 'valid':
    case 'empty':
    default:
      method = 'remove';
      break;
  }

  input.classList[method]('is-invalid');
};

export const renderInfoMessage = (type, message) => {
  const messageTemplate = `
    <div
      class="alert alert-${type} mb-0 w-100 position-absolute"
      role="alert"
    >
      ${message}
    </div>
  `;
  const infoEl = createElemFromStr(messageTemplate);
  const docBody = document.body;
  docBody.prepend(infoEl);
  setTimeout(() => docBody.removeChild(infoEl), 5000);
};

export const clearInput = () => {
  const input = getInputElem();
  input.value = '';
};

export const renderLoading = (isLoading) => {
  const input = getInputElem();
  const addBtn = getAddBtnElem();

  if (isLoading) {
    input.setAttribute('disabled', true);
    addBtn.setAttribute('disabled', true);
    addBtn.innerHTML = '<div class="spinner"></div>';
  } else {
    input.removeAttribute('disabled');
    addBtn.removeAttribute('disabled');
    addBtn.innerHTML = 'Добавить';
  }
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
