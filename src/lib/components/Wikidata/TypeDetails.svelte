<script lang="ts">
  import { fade } from 'svelte/transition';
  import type { AggregatedSingleWikiData } from '$lib/util/wikidata/aggregate';
  import CheckButton from '../UI/CheckButton.svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let label: string;
  export let disabled = false;
  export let checked = false;
  export let details: AggregatedSingleWikiData;
  export let type: string;

  let show = false;
  const handleClick = () => {
    show = !show;
    dispatch('click', { show });
  };
</script>

<div class:show class="flex flex-col">
  <div class="{checked ? 'bg-green-300' : 'bg-gray-100'} flex items-center">
    <CheckButton bind:checked {label} on:change {disabled} />
    <button on:click={handleClick} class="flex-shrink">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 ml-1 mr-2 hover:text-gray-500 text-gray-700"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </button>
  </div>
  {#if show}
    <div in:fade class="text-xs">
      <table class="w-full overflow-x-auto">
        <thead>
          <tr>
            <th class="bg-blue-100 border text-left px-2 py-2">Item count</th>
            <th class="bg-blue-100 border text-left px-2 py-2">Link count</th>
            <th class="bg-blue-100 border text-left px-2 py-2">Categories</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border px-2 py-2">{details.itemcount}</td>
            <td class="border px-2 py-2">{details.linkcount}</td>
            <td class="border px-2 py-2">{details.categories.join(', ')}</td>
          </tr>
        </tbody>
      </table>
      <a
        target="_blank"
        rel="noreferrer noopener"
        href="https://www.wikidata.org/wiki/{type}"
        class="block px-2 py-2 text-blue-600 hover:underline"
      >
        {type}
      </a>
    </div>
  {/if}
</div>

<style lang="postcss">
  .show {
    @apply flex-grow w-full rounded shadow-md;
  }
</style>
