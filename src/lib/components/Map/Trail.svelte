<script lang="ts">
  import center from '@turf/center';

  import type maplibregl from 'maplibre-gl';

  import { onDestroy, onMount, getContext } from 'svelte';
  import { key } from './contextKey';

  export let trail;

  const { getMap } = getContext(key);
  const map: maplibregl.Map = getMap();

  onMount(() => {
    const centre = center(trail).geometry.coordinates;
    map.jumpTo({
      center: [centre[0], centre[1]],
      zoom: 10.5
    });
    map.addSource('trail', {
      type: 'geojson',
      data: trail
    });
    map.addLayer({
      id: 'trail',
      source: 'trail',
      type: 'line',
      paint: {
        'line-width': 7,
        'line-color': 'indigo',
        'line-opacity': 0.7
      }
    });
  });

  onDestroy(() => {
    map.getLayer('trail') && map.removeLayer('trail');
    map.getSource('trail') && map.removeSource('trail');
  });
</script>
