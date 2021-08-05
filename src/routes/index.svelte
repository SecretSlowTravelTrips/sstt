<script>
  import { FileInput, DownloadButton } from '$lib/components/index';
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
  {/if}
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
  }
</style>
