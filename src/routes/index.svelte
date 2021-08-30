<script lang="ts">
  import { Map, Trail } from '$lib/components/Map';
  import { queryAndDownload, config } from '$lib/util/overpass';
  import { fetchWikidata, filter, typesAllowedByDefault } from '$lib/util/wikidata';
  import { exportToGeoJSONFile, fileToGeoJSON } from '$lib/util';
  import {
    Input,
    FileInput,
    DownloadButton,
    FormGroup,
    Details,
    TokenizerInput
  } from '$lib/components/UI';

  let center = {
    lat: 51,
    lon: 4.5
  };
  let files: FileList;
  let radiusInM = 1000;
  let radiusInKm: number;
  let prefLangs: string[] = ['fr', 'nl', 'en'];
  let uploadedTrail;

  let allowedTypes = typesAllowedByDefault();
  let wikidata;

  const maxRadius = 50000;

  $: {
    if (radiusInM < 1) radiusInM = 1;
    else if (radiusInM > maxRadius) radiusInM = maxRadius;

    radiusInKm = radiusInM / 1000;
  }

  const removeFilenameExtention = (filename: string) => {
    const chunks = filename.split('.');
    chunks.pop();
    return chunks.join('.');
  };

  const queryWikidata = async () => {
    wikidata = await fetchWikidata(files[0], radiusInKm, prefLangs);
  };

  const downloadWikidata = async () => {
    exportToGeoJSONFile(
      filter(await fetchWikidata(files[0], radiusInKm, prefLangs), allowedTypes),
      `${removeFilenameExtention(files[0].name)}---${radiusInM}m---wikidata`
    );
  };
</script>

<main class="w-full h-full flex">
  <div class="w-60 md:w-96 flex flex-col p-2 max-h-full overflow-y-auto flex-shrink-0">
    <FormGroup>
      <FileInput
        bind:files
        on:change={async () => (uploadedTrail = await fileToGeoJSON(files[0]))}
      />
    </FormGroup>
    <FormGroup>
      <label for="radius">
        Radius (meters)
        <Input type="number" id="radius" bind:value={radiusInM} max={maxRadius} />
      </label>
      <small slot="help">Only values between 1 and 50000 are allowed</small>
    </FormGroup>
    {#if files && files[0]}
      <Details summary="Overpass">
        <div class="flex flex-wrap gap-1">
          {#each config.overpassQueryButtons as configuration, i}
            <DownloadButton
              on:click={() =>
                queryAndDownload(
                  files[0],
                  configuration.query,
                  `${removeFilenameExtention(files[0].name)}---${radiusInM}m---${
                    configuration.name
                  }`,
                  radiusInKm
                )}
              name={configuration.name}
            >
              {configuration.name}
            </DownloadButton>
          {/each}
        </div>
      </Details>
      <Details summary="Wikidata">
        <label for="pref-langs">
          <TokenizerInput bind:items={prefLangs} />
          <div>
            <small>Enter each language code and separate them by a comma (,).</small>
          </div>
        </label>
        <DownloadButton on:click={downloadWikidata} name="wikidata">Wikidata</DownloadButton>
      </Details>
    {/if}
  </div>
  <Map initialLat={center.lat} initialLon={center.lon} initialZoom={7}>
    {#if uploadedTrail}
      <Trail trail={uploadedTrail} />
    {/if}
  </Map>
</main>
