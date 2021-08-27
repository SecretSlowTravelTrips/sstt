<script lang="ts">
  import { FileInput, DownloadButton } from '$lib/components';
  import { Map, Trail } from '$lib/components/Map';
  import { queryAndDownload, config } from '$lib/util/overpass';
  import { fetchWikidata, filter, typesAllowedByDefault } from '$lib/util/wikidata';
  import { exportToGeoJSONFile, fileToGeoJSON } from '$lib/util';
  import { Input } from '$lib/components/UI';

  let center = {
    lat: 51,
    lon: 4.5
  };
  let files: FileList;
  let radiusInM = 1000;
  let radiusInKm: number;
  let prefLangs: string = 'fr, nl, en';
  let prefLangsArray: string[];
  let uploadedTrail;

  let allowedTypes = typesAllowedByDefault();
  let wikidata;

  const maxRadius = 50000;

  $: {
    if (radiusInM < 1) radiusInM = 1;
    else if (radiusInM > maxRadius) radiusInM = maxRadius;

    radiusInKm = radiusInM / 1000;
  }

  $: {
    if (prefLangs) prefLangsArray = prefLangs.split(/[ ,]+/);
  }

  const removeFilenameExtention = (filename: string) => {
    const chunks = filename.split('.');
    chunks.pop();
    return chunks.join('.');
  };

  const queryWikidata = async () => {
    wikidata = await fetchWikidata(files[0], radiusInKm, prefLangsArray);
  };

  const downloadWikidata = async () => {
    exportToGeoJSONFile(
      filter(await fetchWikidata(files[0], radiusInKm, prefLangsArray), allowedTypes),
      `${removeFilenameExtention(files[0].name)}---${radiusInM}m---wikidata`
    );
  };
</script>

<main class="w-full h-full flex">
  <div class="w-60 md:w-96 flex flex-col p-2 max-h-full overflow-y-auto flex-shrink-0">
    <div>
      <FileInput
        bind:files
        on:change={async () => (uploadedTrail = await fileToGeoJSON(files[0]))}
      />
    </div>
    <div class="raduis">
      <label for="radius">
        Within <Input type="number" id="radius" bind:value={radiusInM} max={maxRadius} /> meters
      </label>
      <div>
        <small>Only values between 1 and 50000 are allowed</small>
      </div>
    </div>
    {#if files && files[0]}
      <h2>Overpass</h2>
      {#each config.overpassQueryButtons as configuration, i}
        <DownloadButton
          on:click={() =>
            queryAndDownload(
              files[0],
              configuration.query,
              `${removeFilenameExtention(files[0].name)}---${radiusInM}m---${configuration.name}`,
              radiusInKm
            )}
          name={configuration.name}
        >
          {configuration.name}
        </DownloadButton>
      {/each}
      <h2>Wikidata</h2>
      <label for="pref-langs">
        <Input type="text" id="pref-langs" bind:value={prefLangs} />
        <div>
          <small>Enter each language code and separate them by a comma (,).</small>
        </div>
      </label>
      <DownloadButton on:click={downloadWikidata} name="wikidata">Wikidata</DownloadButton>
    {/if}
  </div>
  <Map initialLat={center.lat} initialLon={center.lon} initialZoom={7}>
    {#if uploadedTrail}
      <Trail trail={uploadedTrail} />
    {/if}
  </Map>
</main>
