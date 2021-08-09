import config from './config.json';

const subclass = 'wdt:P279';
const instance = 'wdt:P31';
const buildPredicate = (instanceOf: boolean, subclassOf: boolean) => {
  const predicate = [instanceOf ? instance : '', subclassOf ? subclass : ''];

  return instanceOf && subclassOf ? `${predicate.join('/')}?` : predicate.join('');
};

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

  const excludeItemsStatements = config.map(
    (c) => `FILTER NOT EXISTS {?place ${buildPredicate(c.instanceOf, c.subclassOf)} wd:${c.id}.}`
  );

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
    OPTIONAL {
      ?place wdt:P31 ?instance.
    }
    ${excludeItemsStatements.join('\n')}
    OPTIONAL { ?place wdt:P18 ?image. }
    ${Object.values(wikiArticles).join('\n')}
    BIND(COALESCE(${Object.keys(wikiArticles).join(', ')}, "") AS ?prefArticle)
    ${ignoreNoWikipedia ? 'FILTER (?prefArticle != "")' : ''}
    SERVICE wikibase:label { bd:serviceParam wikibase:language "${langs.join(',')}". }
  }`;
};
