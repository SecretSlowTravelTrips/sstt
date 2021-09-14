<script lang="ts">
  export let label: string;
  export let labelFor: string = null;
</script>

<label for={labelFor}>
  <span class="block pb-2">{label}</span>
  <slot />
</label>
