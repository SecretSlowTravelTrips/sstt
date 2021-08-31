<script lang="ts">
  export let label: string;
  export let disabled = false;
  export let checked = false;
</script>

<label
  class="cursor-pointer py-1 px-4 {checked
    ? 'bg-green-300'
    : 'bg-gray-100'} hover:bg-green-200 focus-within:outline-black"
>
  <input type="checkbox" class="sr-only" {disabled} bind:checked />
  {label}
</label>
