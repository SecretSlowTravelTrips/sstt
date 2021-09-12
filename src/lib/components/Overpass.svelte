<script>
  import { config } from '$lib/util/overpass';
  import { LoadButton as DownloadButton, Details } from '$lib/components/UI';

  export let overpassService;
</script>

<Details summary="Overpass">
  <div class="flex flex-wrap gap-1">
    {#each config.overpassQueryButtons as { query, name } (name)}
      <DownloadButton
        on:click={() => overpassService.send('DOWNLOAD_DATA', { query, name })}
        {name}
      >
        {name}
      </DownloadButton>
    {/each}
  </div>
</Details>
