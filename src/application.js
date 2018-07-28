import { watch } from 'melanke-watchjs';
import $ from 'jquery';

import startState, {
  isValidURL,
  addChannel,
  getLastChannel,
} from './rss';

import {
  getInput,
  getAddBtn,
  renderValidErr,
  renderLoadErr,
  renderLoading,
  renderChannel,
  clearInput,
  renderArticles,
  renderModal,
  getModal,
} from './view';

const init = (_state) => {
  const state = _state;
  const input = getInput();
  const addBtn = getAddBtn();
  const modal = getModal();

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
    if (!(state.inputStatus === 'valid')) {
      console.log('адресс введен некоректно');
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

  watch(state, 'inputStatus', () => {
    renderValidErr(state.inputStatus);
  });

  watch(state, 'loadingStatus', () => {
    if (state.loadingStatus === 'load') {
      renderLoading(true);
    } else if (state.loadingStatus === 'pending') {
      const addedChannel = getLastChannel(state.channels);
      clearInput();
      renderLoading(false);
      renderChannel(addedChannel);
      renderArticles(addedChannel.articles);
    } else if (state.loadingStatus === 'error') {
      renderLoading(false);
      renderLoadErr();
    }
  });

  watch(state, 'modalData', () => {
    const { modalData } = state;
    renderModal(modalData);
  });
};

export default () => init(startState);
