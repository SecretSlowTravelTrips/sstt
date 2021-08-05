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

  const removeFilenameExtention = (filename) => {
    const chunks = filename.split('.');
    chunks.pop();
    return chunks.join('.');
  };
</script>

<div class="container">
  <FileInput bind:files />
  {#if files && files[0]}
    {#each config.overpassQueryButtons as configuration, i}
      <DownloadButton
        on:click={() =>
          queryAndDownload(
            files[0],
            configuration.query,
            files[0].name + ' --- ' + configuration.name
          )}
        name={configuration.name}
      >
        {configuration.name}
      </DownloadButton>
    {/each}
    <DownloadButton
      on:click={async () =>
        exportToGeoJSONFile(
          await fetchWikidata(files[0]),
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
