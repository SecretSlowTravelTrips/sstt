<script lang="ts">
  import { fetchWikidata, filter, typesAllowedByDefault } from '$lib/util/wikidata';
  import { exportToGeoJSONFile, removeFilenameExtention } from '$lib/util';
  import { LoadButton, FormGroup, Details, TokenizerInput, Label } from '$lib/components/UI';
  import CheckButton from './UI/CheckButton.svelte';

  export let radius: number;
  export let files: FileList;
  let prefLangs: string[] = ['fr', 'nl', 'en'];
  let allowedTypes = typesAllowedByDefault();
  let wikidata;

  const queryWikidata = async () => {
    wikidata = await fetchWikidata(files[0], radius, prefLangs);
  };

  const downloadWikidata = async () => {
    exportToGeoJSONFile(
      filter(await fetchWikidata(files[0], radius, prefLangs), allowedTypes),
      `${removeFilenameExtention(files[0].name)}---${radius * 1000}m---wikidata`
    );
  };
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
    <LoadButton isDown={false} on:click={downloadWikidata} name="wikidata">Load</LoadButton>
    <LoadButton on:click={downloadWikidata} name="wikidata">Download</LoadButton>
  </div>

  <Details summary="Allowed" isTitle={false}>
    <div class="flex flex-wrap gap-1">
      {#each Array.from(allowedTypes) as type (type)}
        <CheckButton checked label={type} />
      {/each}
    </div>
  </Details>
  <Details summary="Unknown" isTitle={false} />
  <Details summary="Denied" isTitle={false} />
</Details>
