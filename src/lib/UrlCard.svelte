<script lang="ts">
  export let name: string;
  export let creationDate: string;
  export let tinyUrl: string;
  import IoMdClipboard from "svelte-icons/io/IoMdClipboard.svelte";
  import { activateToast } from "../utils";
  import { useNavigate } from "svelte-navigator";

  const navigate = useNavigate();

  const openNewTab = (url: string) => {
    navigate(`/redirect/${url}`);
  };

  const copyToClipboard = (tinyUrl: string) => {
    activateToast("success", "URL copiada com sucesso!");
    const el = document.createElement("textarea");
    el.value = `linky-svelte.vercel.app/redirect/${tinyUrl}`;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };
</script>

<div class="mt-5 w-full flex flex-col space-y-1 bg-gray-700 p-2">
  <div class="w-full h-[50px] bg-gray-200 flex items-center px-2">
    <div class="w-[100px] flex items-center justify-center">
      <span class="font-bold line-clamp-1"> {name} </span>
    </div>
    <hr class="w-[1px] h-full bg-white mx-3" />
    <div class="w-[80%] max-w-[80%] line-clamp-1">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <span
        on:click={() => openNewTab(tinyUrl)}
        class="text-blue-600 underline hover:opacity-70 cursor-pointer"
        title="Abrir link">{`linky-svelte.vercel.app/redirect/${tinyUrl}`}</span
      >
    </div>
    <div>
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
    <div class="w-[100px] flex items-center justify-center">
      <span class="font-bold"> CRIAÇÃO </span>
    </div>
    <hr class="w-[1px] h-full bg-white mx-3" />
    <div class="w-[80%] max-w-[80%] line-clamp-1">
      <span>{creationDate}</span>
    </div>
  </div>
</div>
