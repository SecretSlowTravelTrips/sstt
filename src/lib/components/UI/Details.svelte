<script lang="ts">
  import { fade } from 'svelte/transition';

  export let summary: string;
  let open = false;
  const toggle = ({ target }) => {
    open = target.open;
  };
</script>

<details on:toggle={toggle} class="border">
  <summary class="flex items-center relative p-2 {open ? 'border-b' : ''} cursor-pointer">
    <h2 class="text-xl font-semibold mr-2">{summary}</h2>
    <div class="absolute right-0">
      <svg
        class="fill-current opacity-75 w-5 h-5 mr-2 {open ? '-rotate-90' : 'rotate-90'}"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path
          d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"
        />
      </svg>
    </div>
  </summary>
  {#if open}
    <div class="p-2" transition:fade={{ duration: 300 }}>
      <slot />
    </div>
  {/if}
</details>
