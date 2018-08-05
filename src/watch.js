import { watch } from 'melanke-watchjs';
import { getLastChannel } from './rss';
import {
  renderValidErr,
  renderInfoMessage,
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
    switch (state.loadingStatus) {
      case 'load':
        renderLoading(true);
        break;
      case 'error':
        renderLoading(false);
        renderInfoMessage('danger', 'Во время загрузки произошла ошибка. Попоробуйте снова!');
        break;
      case 'pendign':
      default: {
        const addedChannel = getLastChannel(state.channels);
        const { title, articles } = addedChannel;
        clearInput();
        renderLoading(false);
        renderChannel(addedChannel);
        renderArticles(articles);
        renderInfoMessage('success', `Вы подписались на ${title}!`);
        break;
      }
    }
  });

  watch(state, 'updatingStatus', () => {
    if (state.updatingStatus !== 'pending') {
      return;
    }

    renderArticles(state.newArticles);
    renderInfoMessage('primary', 'Список статей обновлен');
  });

  watch(state, 'modalData', () => {
    const { modalData } = state;
    renderModal(modalData);
  });
};
