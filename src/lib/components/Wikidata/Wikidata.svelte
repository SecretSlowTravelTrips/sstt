<script lang="ts">
  import { LoadButton, FormGroup, Details, TokenizerInput, Label } from '$lib/components/UI';
  import TypeDetails from './TypeDetails.svelte';

  export let wikiService;
  export let loading = false;
  export let wikidataLayer;

  let prefLangs = ['fr', 'nl', 'en'];
  $: allowlist = $wikiService.context.allowlist;
  $: if ($wikiService && wikidataLayer && $wikiService.context.data) {
    wikidataLayer.update($wikiService.context.data);
  }
</script>

<Details summary="Wikidata">
  <FormGroup>
    <Label labelFor="pref-langs" label="Choose languages">
      <TokenizerInput id="pref-langs" bind:items={prefLangs} />
      <div>
        <small>Enter each language code and separate them by a comma (,).</small>
      </div>
    </Label>
  </FormGroup>
  <div class="my-2">
    <LoadButton
      disabled={loading}
      isDown={false}
      on:click={() => wikiService.send('LOAD_DATA', { langs: prefLangs })}
      name="load-wikidata">Load</LoadButton
    >
    <LoadButton
      disabled={loading || !$wikiService.matches('updateLists')}
      on:click={() => wikiService.send('DOWNLOAD_DATA')}
      name="download-wikidata">Download</LoadButton
    >
  </div>

  {#if $wikiService.matches('updateLists')}
    <Details summary="Allowed" isTitle={false}>
      <div class="flex flex-wrap gap-1">
        {#each Object.keys(allowlist) as type (type)}
          <TypeDetails
            {type}
            details={{ ...$wikiService.context.data[type], fc: undefined }}
            checked={allowlist[type].allow}
            label={$wikiService.context.data[type].name}
            on:change={() => wikiService.send('UPDATE_TYPE', { code: type })}
            disabled={loading}
          />
        {/each}
      </div>
    </Details>
    <Details summary="Unknown" isTitle={false} />
    <Details summary="Denied" isTitle={false} />
  {/if}
</Details>
