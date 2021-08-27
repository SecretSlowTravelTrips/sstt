<script lang="ts">
  export let files;
</script>

<label>
  Upload your trail
  <input
    type="file"
    accept=".geojson,.gpx"
    bind:files
    class="border border-gray-500 w-full focus:ring-blue-600 bg-white 
      rounded focus:outline-none focus:ring-2 focus:border-transparent"
  />
</label>
