<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let name: string;
  export let disabled = false;
  export let isDown = true;
  export let loading = false;

  const dispatch = createEventDispatcher();
  let internLoading = false;

  let clicked = false;
  const click = () => {
    clicked = true;
    setTimeout(() => (clicked = false), 100);
    if (!disabled) return dispatch('click', name);
  };

  $: if (clicked && disabled) internLoading = true;
  $: if (!disabled) internLoading = false;
</script>

<button
  class="bg-transparent hover:bg-indigo-200 font-semibold py-2 px-4 rounded inline-flex items-center border border-indigo-200 hover:border-transparent
    disabled:bg-gray-200 disabled:cursor-not-allowed"
  disabled={disabled || loading}
  on:click={click}
>
  {#if !loading && !internLoading}
    {#if isDown}
      {#if !disabled}
        <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </svg>
      {:else}
        <svg
          class="stroke-current"
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
    {:else}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
      </svg>
    {/if}
  {:else}
    <svg
      class="animate-spin -ml-1 text-gray-600"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  {/if}
  <slot />
</button>

<style lang="postcss">
  svg {
    @apply h-4 w-4 flex-shrink-0 mr-2;
  }
</style>
