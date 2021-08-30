<script lang="ts">
  import { afterUpdate } from 'svelte';

  import Tag from './Tag.svelte';

  export let separator = ',';
  export let items = [];
  let value = '';
  let container: HTMLElement;

  let adding = false;

  afterUpdate(() => {
    if (isScrollable(container) && adding) {
      const to =
        container.querySelector('input').offsetLeft -
        container.querySelector('input').offsetWidth -
        (container.offsetLeft + 60);
      if (to > container.scrollLeft) container.scrollTo(to, 0);
    }
    adding = false;
  });

  const onInput = () => {
    if (value[value.length - 1] === separator) {
      const val = value.split(separator)[0].trim();
      if (!items.includes(val)) {
        items = [...items, val];
        adding = true;
      }
      value = '';
    }
  };

  const removeItem = (item: string) => {
    items.splice(items.indexOf(item), 1);
    items = [...items];
  };

  const isScrollable = (elt: HTMLElement) => {
    return elt.scrollWidth > elt.offsetWidth;
  };
</script>

<div
  class="flex overflow-x-auto border border-gray-500 w-full focus-within:ring-blue-600 bg-white 
    rounded focus-within:ring-2 focus-within:border-transparent"
  bind:this={container}
>
  {#each items as item (item)}
    <Tag on:close={() => removeItem(item)}>{item}</Tag>
  {/each}
  <input
    type="text"
    bind:value
    on:input={onInput}
    class="border-0 focus:ring-0 focus:ring-transparent"
  />
</div>
