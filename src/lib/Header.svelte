<script lang="ts">
  import MdMenu from "svelte-icons/md/MdMenu.svelte";
  import GoMarkGithub from "svelte-icons/go/GoMarkGithub.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
</script>

<div class="w-full flex justify-between px-3 pt-2">
  <button class="w-[40px]" on:click={() => dispatch("openModal")}>
    <MdMenu />
  </button>
  <a href="https://github.com/TLucas97" target="_blank" class="w-[35px] cursor-pointer">
    <GoMarkGithub />
  </a>
</div>
