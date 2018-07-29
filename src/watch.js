import { watch } from 'melanke-watchjs';
import { getLastChannel } from './rss';
import {
  renderValidErr,
  renderLoadErr,
  renderLoading,
  renderChannel,
  clearInput,
  renderArticles,
  renderModal,
} from './view';

export default (state) => {
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

  watch(state, 'newArticles', () => {
    renderArticles([...state.newArticles]);
  });
};
