<script lang="ts">
  import IoMdClipboard from "svelte-icons/io/IoMdClipboard.svelte";
  import { copyToClipboard } from "../utils";
  import { useNavigate } from "svelte-navigator";

  const navigate = useNavigate();
  const openNewTab = (url: string) => {
    navigate(`/redirect/${url}`);
  };

  export let name: string;
  export let creationDate: string;
  export let tinyUrl: string;

  const BASE_APP_URL = import.meta.env.VITE_BASE_APP_URL;
</script>

<div class="my-2 w-full">
  <div
    class="flex items-center justify-between border border-gray-300 px-2 py-2 text-sm text-gray-600 max-small:flex-col"
  >
    <span>{name}</span>
    <div class="flex items-center gap-x-2">
      <button
        on:click={() => openNewTab(tinyUrl)}
        class="... max-w-[200px] truncate text-blue-600 underline max-extraSmall:max-w-[100px]"
        >{`${BASE_APP_URL}/${tinyUrl}`}</button
      >
      <button
        title="Copiar link"
        class="w-[20px] text-gray-400 hover:text-green-600"
        on:click={() => copyToClipboard(tinyUrl)}
      >
        <IoMdClipboard />
      </button>
    </div>
  </div>
  <div
    class="flex items-center justify-between border border-gray-300 px-2 py-2 text-sm text-gray-600 max-small:flex-col"
  >
    <span>Data de criação</span>
    <span>{creationDate}</span>
  </div>
</div>
