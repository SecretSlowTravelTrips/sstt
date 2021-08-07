export default (westCorner: Array<number>, eastCorner: Array<number>): string => {
  return `SELECT ?place ?location ?placeLabel ?instanceLabel ?image WHERE {
      SERVICE wikibase:box {
          ?place wdt:P625 ?location .
          bd:serviceParam wikibase:cornerWest "Point(${westCorner[0]} ${westCorner[1]})"^^geo:wktLiteral .
          bd:serviceParam wikibase:cornerEast "Point(${eastCorner[0]} ${eastCorner[1]})"^^geo:wktLiteral .
        }
        OPTIONAL { ?place wdt:P31 ?instance }
        FILTER NOT EXISTS {?instance wdt:P279 wd:Q34442.}
        OPTIONAL { ?place wdt:P18 ?image. }
        SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
      }`;
};
