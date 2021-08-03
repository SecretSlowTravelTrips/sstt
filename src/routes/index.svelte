<script>
  import { Map } from '$lib/components/index';
  let center = [-122.4, 37.7];
</script>

<div class="map-section">
  <Map lat={center[1]} lon={center[0]} recenterOnUpdate zoom="10" />
</div>

<style>
  .map-section {
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    width: 100%;
  }
</style>
