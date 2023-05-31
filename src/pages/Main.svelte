<script lang="ts">
  import Header from "../lib/Header.svelte";
  import Modal from "../lib/Modal.svelte";
  import Loader from "../lib/Loader.svelte";
  import UrlCard from "../lib/UrlCard.svelte";
  import IoMdClipboard from "svelte-icons/io/IoMdClipboard.svelte";
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import { fetchUrlList, createShortUrl } from "../api";
  import { activateToast, copyToClipboard, convertDate } from "../utils";
  import { onMount } from "svelte";
  import { useNavigate } from "svelte-navigator";

  const navigate = useNavigate();

  let newUrlLoading: boolean = false;
  let urlListModal: boolean = false;
  let successModal: boolean = false;
  let urlList: any[] = [];
  let newUrl: string = "";
  let tinyUrl: string = "";
  let loadingMessage: string = "";
  const BASE_APP_URL = import.meta.env.VITE_BASE_APP_URL;

  const handleUrlFetching = async () => {
    newUrlLoading = true;
    loadingMessage = "Carregando links...";
    const urls: any = await fetchUrlList();
    urlList = urls.data;
    newUrlLoading = false;
    loadingMessage = "";
  };

  const handleNewShortUrl = async () => {
    if (!newUrl) return activateToast("warning", "Digite um link");

    newUrlLoading = true;
    loadingMessage = "Criando novo link...";

    const result: any = await createShortUrl(newUrl);

    if (!result) {
      activateToast("error", "Erro ao criar novo link!");
      newUrlLoading = false;
      return;
    }

    if (result.data.status !== 200) {
      activateToast("error", result.data.message);
      newUrlLoading = false;
      return;
    }

    await handleUrlFetching();

    newUrl = "";
    newUrlLoading = false;
    loadingMessage = "";
    tinyUrl = result.data.tinyUrl;
    successModal = true;
    activateToast("success", "Link criada com sucesso!");
  };

  const openNewTab = (url: string) => {
    navigate(`/redirect/${url}`);
  };

  onMount(async () => {
    await handleUrlFetching();
  });
</script>

<SvelteToast />

<div
  class="h-screen w-full bg-[url('https://i.pinimg.com/originals/1d/26/c5/1d26c5b022c071fb8f1e3ae2f0f65ba9.gif')] bg-cover bg-fixed bg-no-repeat text-gray-100"
>
  <Header on:openModal={() => (urlListModal = true)} />
  <div class="flex h-[800px] w-full items-center justify-center">
    <div class="flex flex-col items-center justify-center space-y-8">
      <span class="text-5xl font-bold max-small:text-center max-small:text-lg"
        >Encurtador de links</span
      >
      <input
        type="text"
        placeholder="Digite sua URL"
        bind:value={newUrl}
        class="h-[40px] w-[400px] p-2 text-black focus:outline-none max-small:w-[90%]"
      />
      <button class="bg-blue-500 px-5 py-3" on:click={handleNewShortUrl}
        >CRIAR</button
      >
    </div>
  </div>
</div>

<Modal show={newUrlLoading} noBg>
  <div class="flex flex-col items-center text-white">
    <span class="text-3xl font-bold"> {loadingMessage} </span>
    <Loader />
  </div>
</Modal>

<Modal show={successModal} noBg on:closeModal={() => (successModal = false)}>
  <div class="flex flex-col items-center text-white">
    <span class="text-3xl font-bold">
      Sua novo link encurtada está pronta!</span
    >
    <span class="text-3xl font-bold"> Clique abaixo para acessar.</span>
    <div class="mt-10 flex items-center space-x-3 bg-white px-4 py-2">
      <button
        on:click={() => openNewTab(tinyUrl)}
        class="cursor-pointer text-blue-500 underline"
        >{`${BASE_APP_URL}/${tinyUrl}`}</button
      >
      <button
        title="Copiar link"
        class="w-[20px] text-gray-400"
        on:click={() => copyToClipboard(tinyUrl)}
      >
        <IoMdClipboard />
      </button>
    </div>
    <button
      class="mt-5 bg-blue-500 px-5 py-2 text-white"
      on:click={() => {
        successModal = false;
        tinyUrl = "";
      }}
    >
      FECHAR
    </button>
  </div>
</Modal>

<Modal show={urlListModal} on:closeModal={() => (urlListModal = false)}>
  <div
    class="flex h-[400px] w-[600px] flex-col items-center rounded-lg bg-white p-4 max-medium:w-full"
  >
    <span class="text-3xl font-bold">Links encurtados</span>
    <div
      class="mt-5 flex w-full flex-col space-y-4 overflow-x-hidden border-2 border-gray-400 px-3 py-2"
      class:overflow-scroll={urlList.length > 3}
    >
      {#each urlList as url}
        <UrlCard
          name={url.name.toUpperCase()}
          tinyUrl={url.tinyUrl}
          creationDate={convertDate(url.timestamp)}
        />
      {/each}
    </div>
    <div />
    <button
      class="mt-5 bg-blue-500 px-5 py-2 text-white"
      on:click={() => (urlListModal = false)}
    >
      FECHAR
    </button>
  </div>
</Modal>
