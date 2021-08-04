<script>
  import { Map, FileInput, DownloadButton } from '$lib/components/index';
  import queryAndDownload from '$lib/util/queryAndDownload';
  let center = {
    lat: 51,
    lon: 4.5
  };
  let files;
  let downloadButtons = ['Cafe', 'Bankjes', 'Interessepunten', 'Shop', 'Bakker', 'Route'];
</script>

<div class="container">
  <FileInput bind:files />
  {#if files && files[0]}
    {#each downloadButtons as name, i}
      <DownloadButton on:click={() => queryAndDownload(files[0], 'qeuery', 'testFile')} {name}
        >{name}</DownloadButton
      >
    {/each}
  {/if}
</div>

<!-- <div class="map-section">
  <Map lat={center.lat} lon={center.lon} recenterOnUpdate zoom="8" />
</div> -->
<style>
  .container {
    display: flex;
    flex-direction: column;
  }
  .map-section {
    position: absolute;
    left: 0;
    bottom: 0;
    top: 20vh;
    width: 100%;
  }
</style>
