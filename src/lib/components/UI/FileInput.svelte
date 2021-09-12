<script lang="ts">
  import Label from './Label.svelte';

  export let files: FileList;
</script>

<Label label="Upload your trail">
  <input
    type="file"
    accept=".geojson,.gpx"
    bind:files
    on:change
    class="border border-gray-500 w-full focus:ring-blue-600 bg-white 
      rounded focus:outline-none focus:ring-2 focus:border-transparent"
  />
</Label>
