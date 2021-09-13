<script lang="ts">
  import type { AggregatedWikidata } from '$lib/util/wikidata';
  import type { GeoJSONSource } from 'maplibre-gl';
  import maplibregl from 'maplibre-gl';
  import { getContext, onDestroy } from 'svelte';
  import { key } from './contextKey';

  let previous: Set<string>;

  const { getMap } = getContext(key);
  const map: maplibregl.Map = getMap();

  const popup = (e: maplibregl.EventData) => {
    const { placeLabel, instanceLabel, prefArticle, image } = e.features[0].properties;
    const coordinates = e.features[0].geometry.coordinates.slice();

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    new maplibregl.Popup()
      .setLngLat(coordinates)
      .setHTML(
        `<h2 class="font-bold text-xl mb-1">${placeLabel}</h2>
       <p class="italic" class="mb-2">${instanceLabel}</p>
       ${image ? `<img class="block max-w-full mb-2" src="${image}"" />` : ''}
       <a href="${prefArticle}"" target="_blank" rel="noopener noreferrer" class="text-purple-600 hover:underline break-all">${prefArticle}</a>`
      )
      .addTo(map);
  };

  const cursorPointer = () => {
    map.getCanvas().style.cursor = 'pointer';
  };

  const cursorNormal = () => {
    map.getCanvas().style.cursor = 'pointer';
  };

  const mountOne = (type: string) => {
    map.addSource(type, {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: []
      }
    });

    map.addLayer({
      id: type,
      source: type,
      type: 'circle',
      paint: {
        'circle-radius': 7
      }
    });

    map.on('click', type, popup);
    map.on('mouseenter', type, cursorPointer);
    map.on('mouseleave', type, cursorNormal);
  };

  const mountAll = (types: Set<string> | string[]) => {
    types.forEach((type: string) => mountOne(type));
  };

  const setData = (wikidata: AggregatedWikidata) => {
    Object.keys(wikidata).forEach((type) => {
      (map.getSource(type) as GeoJSONSource).setData({ ...wikidata[type].fc });
    });
  };

  const destroyOne = (type: string) => {
    map.off('click', type, popup);
    map.off('mouseenter', type, cursorPointer);
    map.off('mouseleave', type, cursorNormal);
    map.removeLayer(type);
    map.removeSource(type);
  };

  const destroyAll = (types: Set<string> | string[]) => {
    types.forEach((type: string) => destroyOne(type));
  };

  export function update(wikidata: AggregatedWikidata) {
    const types = new Set(Object.keys(wikidata));
    if (!previous) mountAll(types);
    else {
      destroyAll(Array.from(previous).filter((type) => !types.has(type)));
      mountAll(Array.from(types).filter((type) => !previous.has(type)));
    }
    setData(wikidata);
    previous = types;
  }

  export function highlight(code: string) {}

  onDestroy(() => {
    previous && destroyAll(previous);
  });
</script>
