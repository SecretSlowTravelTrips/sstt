import { featureCollection, Feature, FeatureCollection, Point, Properties } from '@turf/turf';

export type AggregatedSingleWikiData = {
  fc: FeatureCollection<Feature<Point, Properties>>;
  linkcount: number;
  itemcount: number;
  name?: string;
  categories?: string[];
};

export type AggregatedWikidata = {
  [key: string]: AggregatedSingleWikiData;
};

export default function (data: FeatureCollection<Point, Properties>): AggregatedWikidata {
  const obj = {};
  data.features.forEach((feature) => {
    const type = feature.properties.instance
      ? feature.properties.instance.split('/').pop()
      : 'unknown';
    if (!obj[type]) {
      obj[type] = {
        fc: featureCollection([]),
        linkcount: 0,
        itemcount: 0,
        name: feature.properties.instanceLabel
      };
    }
    obj[type].fc.features.push(feature);
    obj[type].linkcount += parseInt(feature.properties.linkcount, 10);
    obj[type].itemcount += 1;
  });

  return obj;
}
