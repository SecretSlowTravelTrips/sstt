export default (
  westCorner: Array<number>,
  eastCorner: Array<number>,
  langs = ['fr', 'nl', 'en']
): string => {
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
  SELECT ?place ?location ?placeLabel ?instance ?instanceLabel ?image ${Object.keys(
    wikiArticles
  ).join(' ')} ?prefArticle ?linkcount WHERE {
    SERVICE wikibase:box {
      ?place wdt:P625 ?location .
      bd:serviceParam wikibase:cornerWest "Point(${westCorner[0]} ${
    westCorner[1]
  })"^^geo:wktLiteral .
        bd:serviceParam wikibase:cornerEast "Point(${eastCorner[0]} ${
    eastCorner[1]
  })"^^geo:wktLiteral .
      }
    ?place wikibase:sitelinks ?linkcount;
    OPTIONAL {
      ?place wdt:P31 ?instance.
    }
    OPTIONAL { ?place wdt:P18 ?image. }
    ${Object.values(wikiArticles).join('\n')}
    BIND(COALESCE(${Object.keys(wikiArticles).join(', ')}, "") AS ?prefArticle)
    ${ignoreNoWikipedia ? 'FILTER (?prefArticle != "")' : ''}
    SERVICE wikibase:label { bd:serviceParam wikibase:language "${langs.join(',')}". }
  }`;
};
