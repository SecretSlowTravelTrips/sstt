<script lang="ts">
  import { draw } from 'svelte/transition';

  export let label: string;
  export let disabled = false;
  export let checked = false;
</script>

<label
  class="inline-flex items-center cursor-pointer py-1 px-2 {checked
    ? 'bg-green-300'
    : 'bg-gray-100'} hover:bg-green-200 focus-within:outline-black transition-colors"
>
  {#if checked}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-4 w-4 mr-2 text-yellow-800 flex-shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M5 13l4 4L19 7"
        transition:draw
      />
    </svg>
  {/if}
  <input type="checkbox" class="sr-only" {disabled} bind:checked on:change />
  {label}
</label>
