<script lang="ts">
  import { setContext, onMount } from 'svelte';
  import maplibregl from 'maplibre-gl';
  import 'maplibre-gl/dist/maplibre-gl.css';
  import { key } from './contextKey';

  export let initialLat: number;
  export let initialLon: number;
  export let initialZoom: number;

  let container: HTMLElement;
  let map: maplibregl.Map;
  let loaded = false;

  const addZoom = (params: maplibregl.CameraOptions | maplibregl.FlyToOptions, zoom: number) => {
    if (zoom) params.zoom = zoom;
    return params;
  };

  export const jumpTo = (lon: number, lat: number, zoom: number) => {
    if (!lon || !lat) return;
    map.jumpTo(addZoom({ center: [lon, lat] }, zoom));
  };

  export const flyTo = (lon: number, lat: number, zoom: number) => {
    if (!lon || !lat) return;
    map.flyTo(
      addZoom({ center: [lon, lat], bearing: 0, speed: 1, curve: 1, essential: true }, zoom)
    );
  };

  setContext(key, {
    getMap: () => map
  });

  maplibregl.accessToken = <string>import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

  onMount(() => {
    map = new maplibregl.Map({
      container,
      style: 'mapbox://styles/mapbox/streets-v8',
      center: [initialLon, initialLat],
      zoom: initialZoom,
      attributionControl: false
    });
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-left');
    map.addControl(new maplibregl.AttributionControl({ compact: false }));
    map.on('load', () => {
      loaded = true;
    });
  });
</script>

<div bind:this={container} class="w-full h-full">
  {#if map && loaded}
    <slot />
  {/if}
</div>
