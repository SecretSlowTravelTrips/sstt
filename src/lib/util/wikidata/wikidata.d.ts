export default interface Wikidata {
  place: string;
  location: string;
  placeLabel: string;
  instance?: string;
  instanceLabel: string;
  image?: string;
  [key: string]: string;
}
