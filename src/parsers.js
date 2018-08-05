export const parseArticles = (xml) => {
  const articles = xml.querySelectorAll('item');
  return [...articles].map((article) => {
    const titleEl = article.querySelector('title');
    const linkEl = article.querySelector('link');
    const descEl = article.querySelector('description');

    return {
      title: titleEl.textContent,
      link: linkEl.textContent,
      desc: descEl.textContent,
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
    link: linkEl.textContent,
    title: titleEl.textContent,
    desc: descEl.textContent,
    articles,
  };
};
