<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let name;
  export let disabled = false;

  const dispatch = createEventDispatcher();

  let clicked;
  const click = (e) => {
    clicked = true;
    setTimeout(() => (clicked = false), 100);
    if (!disabled) return dispatch('click', name);
  };
</script>

<button class="button" class:clicked class:disabled on:click={click}>
  <slot />
</button>
