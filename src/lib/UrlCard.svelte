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

<div class="w-full flex flex-col space-y-1 bg-gray-700 p-2">
  <div class="w-full h-[50px] bg-gray-200 flex items-center px-2">
    <div
      class="w-[19%] max-medium:w-[50%] flex items-center justify-center truncate"
    >
      <span class="font-bold line-clamp-1"> {name} </span>
    </div>
    <hr class="w-[1px] h-full bg-white mx-3" />
    <div class="w-[80%] max-medium:w-[50%] flex justify-between">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="w-[90%] truncate">
        <span
          on:click={() => openNewTab(tinyUrl)}
          class="text-blue-600 underline hover:opacity-70 cursor-pointer"
          title="Abrir link">{`${BASE_APP_URL}/redirect/${tinyUrl}`}</span
        >
      </div>
      <button
        title="Copiar link"
        class="w-[20px] text-gray-400"
        on:click={() => copyToClipboard(tinyUrl)}
      >
        <IoMdClipboard />
      </button>
    </div>
  </div>
  <div class="w-full h-[50px] bg-gray-200 flex items-center px-2">
    <div class="max-medium:w-[42.5%] flex items-center justify-center">
      <span class="font-bold"> CRIAÇÃO </span>
    </div>
    <hr class="w-[1px] h-full bg-white mx-3" />
    <div class="max-medium:w-[50%]">
      <span>{creationDate}</span>
    </div>
  </div>
</div>
