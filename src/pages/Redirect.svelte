<script lang="ts">
  import { useParams } from "svelte-navigator";
  import { onMount } from "svelte";
  import { useNavigate } from "svelte-navigator";

  const navigate = useNavigate();
  const params = useParams();
  const BASE_URL = import.meta.env.VITE_BASE_API_URL;

  const forceRedirect = () => {
    window.onload = () => {
      navigate("/");
    };

    window.location.href = `${BASE_URL}/${$params.id}`;
  };

  onMount(() => {
    forceRedirect();
  });
</script>

<div
  class="w-full h-screen flex items-center justify-center bg-[url('https://i.pinimg.com/originals/1d/26/c5/1d26c5b022c071fb8f1e3ae2f0f65ba9.gif')] bg-cover bg-no-repeat bg-fixed text-gray-100"
>
  <span class="font-bold text-2xl">Redirecting...</span>
</div>
