import $ from 'jquery';
import watch from './watch';

import {
  isValidURL,
  addChannel,
  refreshArticles,
} from './rss';

import {
  getInputElem,
  getAddBtnElem,
  getModalElem,
} from './view';

export default () => {
  const state = {
    loadingStatus: 'pending',
    updatingStatus: 'pending',
    inputValue: '',
    inputStatus: 'empty',
    modalData: { title: '', desc: '', link: '' },
    newArticles: [],
    channels: [],
  };

  const input = getInputElem();
  const addBtn = getAddBtnElem();
  const modal = getModalElem();

  const handleInput = ({ target }) => {
    const url = target.value;
    state.inputValue = url;

    if (isValidURL(state.channels, url)) {
      state.inputStatus = 'valid';
    } else if (url === '') {
      state.inputStatus = 'empty';
    } else {
      state.inputStatus = 'invalid';
    }
  };

  const handleAddBtn = () => {
    if (state.inputStatus !== 'valid') {
      return;
    }
    addChannel(state);
  };

  const handleDescBtn = ({ relatedTarget }) => {
    const {
      link,
      title,
      desc,
    } = relatedTarget.dataset;

    state.modalData = { link, title, desc };
  };

  input.addEventListener('input', handleInput);
  addBtn.addEventListener('click', handleAddBtn);
  $(modal).on('show.bs.modal', handleDescBtn);

  watch(state);
  refreshArticles(state);
};
