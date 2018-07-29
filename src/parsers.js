import { getText } from './utils';

export const parseArticles = (xml) => {
  const articles = xml.querySelectorAll('item');
  return [...articles].map((article) => {
    const titleEl = article.querySelector('title');
    const linkEl = article.querySelector('link');
    const descEl = article.querySelector('description');

    return {
      title: getText(titleEl),
      link: getText(linkEl),
      desc: getText(descEl),
    };
  });
};

export const parseRSS = (rssData) => {
  const parser = new DOMParser();
  const xml = parser.parseFromString(rssData, 'application/xml');

  const searchInXML = document.querySelector.bind(xml);

  const titleEl = searchInXML('title');
  const descEl = searchInXML('description');
  const [linkEl] = xml.getElementsByTagName('link');

  const articles = parseArticles(xml);

  return {
    link: getText(linkEl),
    title: getText(titleEl),
    desc: getText(descEl),
    articles,
  };
};
