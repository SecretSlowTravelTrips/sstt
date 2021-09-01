<script lang="ts">
  import type maplibregl from 'maplibre-gl';

  import { onDestroy, onMount, getContext } from 'svelte';
  import { key } from './contextKey';

  export let trail;

  const { getMap } = getContext(key);
  const map: maplibregl.Map = getMap();

  onMount(() => {
    map.addSource('trail', {
      type: 'geojson',
      data: trail
    });
    map.addLayer({
      id: 'trail',
      source: 'trail',
      type: 'line',
      paint: {
        'line-width': 10,
        'line-color': 'indigo'
      }
    });
  });

  onDestroy(() => {
    map.getLayer('trail') && map.removeLayer('trail');
    map.getSource('trail') && map.removeSource('trail');
  });
</script>
