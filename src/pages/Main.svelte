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
      alert(result.data.message);
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
  class="w-full h-screen bg-[url('https://i.pinimg.com/originals/1d/26/c5/1d26c5b022c071fb8f1e3ae2f0f65ba9.gif')] bg-cover bg-no-repeat bg-fixed text-gray-100"
>
  <Header on:openModal={() => (urlListModal = true)} />
  <div class="w-full h-[800px] flex items-center justify-center">
    <div class="flex flex-col items-center justify-center space-y-8">
      <span class="text-5xl font-bold max-small:text-center max-small:text-lg"
        >Encurtador de links</span
      >
      <input
        type="text"
        placeholder="Digite sua URL"
        bind:value={newUrl}
        class="p-2 max-small:w-[90%] w-[400px] h-[40px] text-black focus:outline-none"
      />
      <button class="px-5 bg-blue-500 py-3" on:click={handleNewShortUrl}
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
    <div class="flex items-center space-x-3 bg-white mt-10 py-2 px-4">
      <button
        on:click={() => openNewTab(tinyUrl)}
        class="text-blue-500 underline cursor-pointer"
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
      class="bg-blue-500 text-white px-5 py-2 mt-5"
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
    class="flex flex-col items-center bg-white max-medium:w-full w-[500px] h-[400px] p-4 rounded-lg"
  >
    <span class="font-bold text-3xl">Links encurtados</span>
    <div
      class="w-full flex flex-col space-y-4 overflow-x-hidden border-2 border-gray-400 mt-5 px-3 py-2"
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
      class="bg-blue-500 text-white px-5 py-2 mt-5"
      on:click={() => (urlListModal = false)}
    >
      FECHAR
    </button>
  </div>
</Modal>
