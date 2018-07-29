import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './static/index.css';
import run from './application';

const state = {
  loadingStatus: 'pending',
  inputValue: '',
  inputStatus: 'empty',
  modalData: { title: '', desc: '', link: '' },
  newArticles: [],
  channels: [],
};

run(state);
