export const query = document.querySelector.bind(document);

export const getText = elem => elem.textContent;

export const createElemFromStr = (str) => {
  const div = document.createElement('div');
  div.innerHTML = str;
  return div.firstElementChild;
};
