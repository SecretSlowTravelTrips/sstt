export default (westCorner: Array<number>, eastCorner: Array<number>): string => {
  const langs = ['fr', 'nl', 'en'];
  const wikiArticles = langs.reduce((acc, lang) => {
    const key = `?${lang}Article`;
    acc[key] = `OPTIONAL {
      ${key} schema:about ?place.
      ${key} schema:isPartOf <https://${lang}.wikipedia.org/>.
    }`;
    return acc;
  }, {});

  const ignoreNoWikipedia = true;

  return `
  SELECT ?place ?location ?placeLabel ?instanceLabel ?image ${Object.keys(wikiArticles).join(
    ' '
  )} ?prefArticle WHERE {
    SERVICE wikibase:box {
      ?place wdt:P625 ?location .
      bd:serviceParam wikibase:cornerWest "Point(${westCorner[0]} ${
    westCorner[1]
  })"^^geo:wktLiteral .
        bd:serviceParam wikibase:cornerEast "Point(${eastCorner[0]} ${
    eastCorner[1]
  })"^^geo:wktLiteral .
      }
    OPTIONAL { ?place wdt:P31 ?instance }
    FILTER NOT EXISTS {?instance wdt:P279 wd:Q34442.}
    OPTIONAL { ?place wdt:P18 ?image. }
    ${Object.values(wikiArticles).join('\n')}
    BIND(COALESCE(${Object.keys(wikiArticles).join(', ')}, "") AS ?prefArticle)
    ${ignoreNoWikipedia ? 'FILTER (?prefArticle != "")' : ''}
    SERVICE wikibase:label { bd:serviceParam wikibase:language "${langs.join(',')}". }
  }`;
};
