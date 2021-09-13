<script lang="ts">
  export let type = 'text';
  export let name: string = null;
  export let id: string = name;
  export let max: number = undefined;
  export let value;
  export let disabled = false;

  const handleInput = (e) => {
    // https://stackoverflow.com/a/57393751
    value = type.match(/^(number|range)$/) ? +e.target.value : e.target.value;
  };
</script>

<input
  {type}
  {name}
  {value}
  {max}
  {id}
  class="px-3 py-2 rounded w-full"
  on:input={handleInput}
  {disabled}
/>
