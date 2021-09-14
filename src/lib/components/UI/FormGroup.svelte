<script lang="ts">
</script>

<div class="mb-3">
  <slot />
  {#if $$slots.help}
    <div class="text-gray-700 text-sm">
      <slot name="help" />
    </div>
  {/if}
</div>
