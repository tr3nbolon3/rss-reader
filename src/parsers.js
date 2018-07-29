import { getText } from './utils';

const parseArticles = articles => articles
  .map((article) => {
    const titleEl = article.querySelector('title');
    const linkEl = article.querySelector('link');
    const descEl = article.querySelector('description');

    return {
      title: getText(titleEl),
      link: getText(linkEl),
      desc: getText(descEl),
    };
  });

const parseRSS = (rssData) => {
  const parser = new DOMParser();
  const xml = parser.parseFromString(rssData, 'application/xml');

  const searchInXML = document.querySelector.bind(xml);

  const titleEl = searchInXML('title');
  const descEl = searchInXML('description');
  const [linkEl] = xml.getElementsByTagName('link');
  const articleElms = xml.querySelectorAll('item');

  const articles = parseArticles([...articleElms]);

  return {
    link: getText(linkEl),
    title: getText(titleEl),
    desc: getText(descEl),
    articles,
  };
};

export default parseRSS;
