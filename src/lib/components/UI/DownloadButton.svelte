<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let name: string;
  export let disabled = false;

  const dispatch = createEventDispatcher();

  let clicked = false;
  const click = () => {
    clicked = true;
    setTimeout(() => (clicked = false), 100);
    if (!disabled) return dispatch('click', name);
  };
</script>

<button
  class="bg-transparent hover:bg-indigo-200 font-semibold py-2 px-4 rounded inline-flex items-center border border-indigo-200 hover:border-transparent
    disabled:bg-gray-200 disabled:cursor-not-allowed"
  {disabled}
  on:click={click}
>
  {#if !disabled}<svg
      class="fill-current w-4 h-4 mr-2 flex-shrink-0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
    >
      <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
    </svg>
  {:else}
    <svg
      class="stroke-current w-4 h-4 mr-2 flex-shrink-0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
      />
    </svg>
  {/if}
  <slot />
</button>
