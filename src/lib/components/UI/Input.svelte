<script lang="ts">
  export let type = 'text';
  export let name: string = null;
  export let id: string = name;
  export let max: number = undefined;
  export let value;
</script>

<input {type} {name} {value} {max} {id} class="px-3 py-2 rounded w-full" />
