<script lang="ts">
  import { FileInput, DownloadButton } from '$lib/components/index';
  import queryAndDownload from '$lib/util/queryAndDownload';
  import { config } from '$lib/util/overpass';
  import { fetchWikidata } from '$lib/util/wikidata';
  import exportToGeoJSONFile from '$lib/util/exportToGeoJsonFile';
  let center = {
    lat: 51,
    lon: 4.5
  };
  let files;
  let radiusInM = 1000;
  let radiusInKm: number;

  const maxRadius = 50000;

  $: {
    if (radiusInM < 0) radiusInM = 0;
    else if (radiusInM > maxRadius) radiusInM = maxRadius;

    radiusInKm = radiusInM / 1000;
  }

  const removeFilenameExtention = (filename) => {
    const chunks = filename.split('.');
    chunks.pop();
    return chunks.join('.');
  };
</script>

<div class="container">
  <div>
    <FileInput bind:files />
  </div>
  <div class="raduis">
    <label>
      Within <input type="number" bind:value={radiusInM} max={maxRadius} /> meters
    </label>
  </div>
  {#if files && files[0]}
    {#each config.overpassQueryButtons as configuration, i}
      <DownloadButton
        on:click={() =>
          queryAndDownload(
            files[0],
            configuration.query,
            files[0].name + ' --- ' + configuration.name,
            radiusInKm
          )}
        name={configuration.name}
      >
        {configuration.name}
      </DownloadButton>
    {/each}
    <DownloadButton
      on:click={async () =>
        exportToGeoJSONFile(
          await fetchWikidata(files[0], radiusInKm),
          `${removeFilenameExtention(files[0].name)}---wikidata`
        )}
      name="wikidata"
    >
      Wikidata
    </DownloadButton>
  {/if}
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
  }
</style>
