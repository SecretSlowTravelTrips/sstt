<script lang="ts">
  import type { GeoJSONSource } from 'maplibre-gl';

  import type maplibregl from 'maplibre-gl';

  import { onDestroy, onMount, getContext } from 'svelte';
  import { key } from './contextKey';

  export let buffer;

  const { getMap } = getContext(key);
  const map: maplibregl.Map = getMap();

  $: if (map.getSource('buffer')) {
    (map.getSource('buffer') as GeoJSONSource).setData(buffer);
  }

  onMount(() => {
    map.addSource('buffer', {
      type: 'geojson',
      data: buffer
    });
    map.addLayer({
      id: 'buffer',
      source: 'buffer',
      type: 'fill',
      paint: {
        'fill-opacity': 0.2
      }
    });
  });

  onDestroy(() => {
    map.getLayer('buffer') && map.removeLayer('buffer');
    map.getSource('buffer') && map.removeSource('buffer');
  });
</script>
