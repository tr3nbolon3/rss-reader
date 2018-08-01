export default class State {
  constructor() {
    this.loadingStatus = 'pending';
    this.updatingStatus = 'pending';
    this.inputValue = '';
    this.inputStatus = 'empty';
    this.modalData = { title: '', desc: '', link: '' };
    this.newArticles = [];
    this.channels = [];
  }

  getLastChannel() {
    const lastChannelIndex = this.channels.length - 1;
    return this.channels[lastChannelIndex];
  }

  addChannel(channel) {
    this.channels.push(channel);
  }

  setLoadingStatus(status) {
    this.loadingStatus = status;
  }

  setUpdatingStatus(status) {
    this.updatingStatus = status;
  }

  setInputValue(value) {
    this.inputValue = value;
  }

  setModalData(title, desc, link) {
    this.modalData = { title, desc, link };
  }
}
