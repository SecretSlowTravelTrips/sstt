export default class SPARQLQueryDispatcher {
  constructor(private endpoint: string = 'https://query.wikidata.org/sparql') {}

  query(sparqlQuery: string, simplify = true): Promise<any> {
    const fullUrl = this.endpoint + '?query=' + encodeURIComponent(sparqlQuery);
    const headers = { Accept: 'application/sparql-results+json' };

    return fetch(fullUrl, { headers })
      .then((body) => body.json())
      .then((data) => (simplify ? this.simplify(data) : data));
  }

  // https://stackoverflow.com/questions/66850047/get-geojson-data-from-wikidata
  simplify(data) {
    const bindings = data.results.bindings;
    return bindings.map((binding) => {
      Object.keys(binding).forEach(function (key, index) {
        binding[key] = binding[key].value;
      });
      return binding;
    });
  }
}
