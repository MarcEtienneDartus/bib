const fetch = require('node-fetch');

/**
 * Get all France located Bib Gourmand restaurants
 * @return {Array} restaurants
 */
module.exports.get = async () => {
  let AllRestautants = [];
  let numberHits = 100000;
  let page = 4;
  while(AllRestautants.length < numberHits){
    let nbHits = numberHits - AllRestautants.length
    if(nbHits > 1000){
      nbHits = 1000
    }
    const bibResponse = await fetch("https://8nvhrd7onv-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(3.35.1)%3B%20Browser%20(lite)%3B%20instantsearch.js%20(4.1.1)%3B%20JS%20Helper%20(3.0.0)&x-algolia-application-id=8NVHRD7ONV&x-algolia-api-key=71b3cff102a474b924dfcb9897cc6fa8", {"credentials":"omit","headers":{"accept":"application/json","accept-language":"fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7","content-type":"application/x-www-form-urlencoded","sec-fetch-dest":"empty","sec-fetch-mode":"cors","sec-fetch-site":"cross-site"},"referrer":"https://guide.michelin.com/fr/fr/restaurants/page/"+page,"referrerPolicy":"no-referrer-when-downgrade","body":"{\"requests\":[{\"indexName\":\"prod-restaurants-fr\",\"params\":\"aroundLatLngViaIP=true&aroundRadius=all&filters=sites%3Afr%20AND%20status%3APublished&hitsPerPage="+nbHits+"&attributesToRetrieve=%5B%22_geoloc%22%2C%22city_name%22%2C%22country_name%22%2C%22cuisine_type%22%2C%22guide_year%22%2C%22image%22%2C%22michelin_award%22%2C%22name%22%2C%22offers%22%2C%22offers_size%22%2C%22online_booking%22%2C%22other_urls%22%2C%22site_name%22%2C%22url%22%5D&maxValuesPerFacet=100&page=0&facets=%5B%22country_code%22%2C%22region_slug%22%2C%22city_slug%22%2C%22area_slug%22%2C%22michelin_award%22%2C%22offers%22%2C%22cuisine_slug%22%2C%22online_booking%22%2C%22rating%22%2C%22service_restriction%22%2C%22categories.lvl0%22%5D&tagFilters=\"}]}","method":"POST","mode":"cors"})
    .then(res => res.json())
    .then(json => { return json});

    numberHits = bibResponse.results[0].nbHits
    AllRestautants = [...AllRestautants, ...bibResponse.results[0].hits];
    page++;
  }

  return AllRestautants;
};
