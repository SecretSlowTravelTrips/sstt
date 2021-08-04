<script>
  import { Map, FileInput, DownloadButton } from '$lib/components/index';
  import queryAndDownload from '$lib/util/queryAndDownload';
  let center = {
    lat: 51,
    lon: 4.5
  };
  let files;
  let config = {
    overpassQueryButtons: [
      {
        name: 'Supermarket and convenience store',
        query: [
          {
            shop: 'convenience'
          },
          {
            shop: 'supermarket'
          }
        ]
      },
      {
        name: 'Bicycle shop',
        query: [
          {
            shop: 'bicycle'
          }
        ]
      },
      {
        name: 'Playground',
        query: [
          {
            leisure: 'playground'
          }
        ]
      },
      {
        name: 'Bakery',
        query: [
          {
            shop: 'bakery'
          }
        ]
      },
      {
        name: 'Café and restaurant',
        query: [
          {
            amenity: 'cafe'
          },
          {
            amenity: 'restaurant'
          }
        ]
      },
      {
        name: 'Benches',
        query: [
          {
            amenity: 'bench'
          }
        ]
      }
    ]
  };
</script>

<div class="container">
  <FileInput bind:files />
  {#if files && files[0]}
    {#each config.overpassQueryButtons as configuration, i}
      <DownloadButton
        on:click={() =>
          queryAndDownload(files[0], configuration.query, files[0].name + ' --- ' + configuration.name)}
        name={configuration.name}
      >
        {configuration.name}
      </DownloadButton>
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
