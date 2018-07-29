import $ from 'jquery';
import watch from './watch';

import {
  isValidURL,
  addChannel,
  updateChannels,
} from './rss';

import {
  getInputElem,
  getAddBtnElem,
  getModalElem,
} from './view';

export default (_state) => {
  const state = _state;
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

  watch(state);
  updateChannels(state);
};
