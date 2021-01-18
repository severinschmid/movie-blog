const { SitemapStream, streamToPromise } = require('sitemap');
const hostname = "https://whywatchmovies.com"


const createSitemap = async urls => {
  const sitemapStream = new SitemapStream({ hostname });
  urls.forEach(url => sitemapStream.write(url));
  sitemapStream.end();

  return streamToPromise(sitemapStream);
};

module.exports = createSitemap;