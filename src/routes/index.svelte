<script lang="ts">
  import { Map, Trail } from '$lib/components/Map';
  import { Input, FileInput, FormGroup } from '$lib/components/UI';
  import { Wikidata } from '$lib/components/Wikidata';
  import { useMachine, useSelector } from '@xstate/svelte';
  import { appMachine } from '$lib/machines';
  import Overpass from '$lib/components/Overpass.svelte';
  import Label from '$lib/components/UI/Label.svelte';
  import Buffer from '$lib/components/Map/Buffer.svelte';
  import WikidataLayer from '$lib/components/Map/WikidataLayer.svelte';
  import { draw } from 'svelte/transition';
  import { tick } from 'svelte';

  const { state, send, service } = useMachine(appMachine);
  const wikiService = useSelector(service, (state) => state.children.wikiMachine);
  const overpassService = useSelector(service, (state) => state.children.overpassMachine);

  let center = {
    lat: 51,
    lon: 4.5
  };
  let files: FileList;
  let radiusInM = 1000;
  let radiusInKm: number;
  let timeoutID;
  let wikidataLayer;
  let map;
  let open = true;

  const maxRadius = 50000;

  $: {
    radiusInKm = radiusInM / 1000;
    if (radiusInM <= 0) radiusInKm = 0.001;
    else if (radiusInM > maxRadius) radiusInKm = 50;
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => send('UPDATE_RADIUS', { radius: radiusInKm }), 500);
  }

  $: if (files) send('FILE_UPLOAD', { file: files[0] });
  $: loading = $state.hasTag('loading');

  const toggleMenu = () => {
    open = !open;
    tick().then(() => map.invalidateSize());
  };
</script>

<main class="w-full h-full flex flex-col">
  <header class="w-full h-20 border-b shadow px-2 flex">
    <button
      type="button"
      class="self-center inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-white hover:bg-gray-700 
      focus:outline-none focus:ring-2 focus:ring-inset border-2"
      aria-controls="mobile-menu"
      aria-expanded={open}
      on:click={toggleMenu}
    >
      {#if !open}
        <svg
          class="block h-10 w-10"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            in:draw
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      {:else}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-10 w-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            in:draw
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      {/if}
    </button>
    <div class="ml-5">
      <h1 class="text-4xl font-bold">sstt</h1>
      <!-- svelte-ignore a11y-unknown-role -->
      <div role="doc-subtitle" class="italic text-gray-700 text-sm">query service</div>
    </div>
  </header>
  <div class="flex w-full h-full">
    <div
      class="w-60 md:w-96 flex flex-col p-2 max-h-full overflow-y-auto flex-shrink-0"
      class:hide={!open}
    >
      <FormGroup>
        <FileInput bind:files disabled={loading} />
      </FormGroup>
      {#if $state.matches('query')}
        <FormGroup>
          <Label labelFor="radius" label="Radius (meters)">
            <Input
              type="number"
              id="radius"
              bind:value={radiusInM}
              max={maxRadius}
              disabled={loading}
            />
          </Label>
          <small slot="help">Only values between 1 and 50000 are allowed</small>
        </FormGroup>
        <Overpass overpassService={$overpassService} {loading} />
        <Wikidata wikiService={$wikiService} {loading} {wikidataLayer} />
      {/if}
    </div>
    <Map initialLat={center.lat} initialLon={center.lon} initialZoom={7} bind:this={map}>
      {#if $state.context.geojson}
        <Trail trail={$state.context.geojson} />
      {/if}
      {#if $state.context.buffer}
        <Buffer buffer={$state.context.buffer} />
      {/if}
      <WikidataLayer bind:this={wikidataLayer} />
    </Map>
  </div>
</main>

<style lang="postcss">
  .hide {
    @apply sr-only;
  }
</style>
