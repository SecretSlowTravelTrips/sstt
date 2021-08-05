export default (westCorner: Array<number>, eastCorner: Array<number>): string => {
  return `SELECT ?place ?location ?placeLabel WHERE {
      SERVICE wikibase:box {
          ?place wdt:P625 ?location .
          bd:serviceParam wikibase:cornerWest "Point(${westCorner[0]} ${westCorner[1]})"^^geo:wktLiteral .
          bd:serviceParam wikibase:cornerEast "Point(${eastCorner[0]} ${eastCorner[1]})"^^geo:wktLiteral .
        }
        SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
      }`;
};
