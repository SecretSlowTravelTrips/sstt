<script lang="ts">
  import { Map, Trail } from '$lib/components/Map';
  import { Input, FileInput, FormGroup } from '$lib/components/UI';
  import { Wikidata } from '$lib/components/Wikidata';
  import { useMachine, useSelector } from '@xstate/svelte';
  import { appMachine } from '$lib/machines';
  import Overpass from '$lib/components/Overpass.svelte';
  import Label from '$lib/components/UI/Label.svelte';

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
</script>

<main class="w-full h-full flex">
  <div class="w-60 md:w-96 flex flex-col p-2 max-h-full overflow-y-auto flex-shrink-0">
    <FormGroup>
      <FileInput bind:files />
    </FormGroup>
    {#if $state.matches('query')}
      <FormGroup>
        <Label labelFor="radius" label="Radius (meters)">
          <Input type="number" id="radius" bind:value={radiusInM} max={maxRadius} />
        </Label>
        <small slot="help">Only values between 1 and 50000 are allowed</small>
      </FormGroup>
      <Overpass overpassService={$overpassService} {loading} />
      <Wikidata wikiService={$wikiService} {loading} />
    {/if}
  </div>
  <Map initialLat={center.lat} initialLon={center.lon} initialZoom={7}>
    {#if $state.context.geojson}
      <Trail trail={$state.context.geojson} />
    {/if}
  </Map>
</main>
