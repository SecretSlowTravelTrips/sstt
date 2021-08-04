<script>
  import { Map, FileInput, DownloadButton } from '$lib/components/index';
  import queryAndDownload from '$lib/util/queryAndDownload';
  let center = {
    lat: 51,
    lon: 4.5
  };
  let files;
  let config = {
    overpassQueryButtons : [{

  
      name: "Supermarket & convenience store"
    }
    ]
  }
</script>

<div class="container">
  <FileInput bind:files />
  {#if files && files[0]}
    {#each config.overpassQueryButtons as name, i}
      <DownloadButton
        on:click={() => queryAndDownload(files[0], config, files[0].name + '---' + name)}
        {name}>{name}</DownloadButton
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
