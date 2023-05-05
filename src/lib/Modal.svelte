<script lang="ts">
  import { scale } from "svelte/transition";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let show: boolean = false;
  export let noBg: boolean = false;
</script>

{#if show}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50"
  >
    <div
      class={`${!noBg ? "bg-calm border-2" : ""} rounded-[16px] z-50`}
      transition:scale={{ duration: 350 }}
    >
      <slot />
    </div>
  </div>
{/if}
