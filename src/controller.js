import state, {
  isValidURL,
  updateValidState,
  addChannel,
  updateLoadingState,
} from './model';
import initView from './view';

const input = document.querySelector('[data-rss="input"]');
const addBtn = document.querySelector('[data-rss="btn"]');

const handleValid = () => {
  const url = input.value;
  if (url === '') {
    updateValidState(true);
  } else {
    const isValide = isValidURL(url);
    updateValidState(isValide);
  }
};

const handleAddBtn = () => {
  const url = input.value;
  if (!state.isValide || url === '') {
    return;
  }
  addChannel(url);
  updateLoadingState();
};

export default () => {
  input.addEventListener('input', handleValid);
  addBtn.addEventListener('click', handleAddBtn);
  initView(state);
};
