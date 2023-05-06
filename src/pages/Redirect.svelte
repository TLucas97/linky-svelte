<script lang="ts">
  import { useParams } from "svelte-navigator";
  import { onMount } from "svelte";
  import { useFocus } from "svelte-navigator";
  import { useNavigate } from "svelte-navigator";

  const registerFocus = useFocus();

  const navigate = useNavigate();

  const params = useParams();

  const forceRedirect = () => {
    window.location.href = `https://linkshortener-production-99e0.up.railway.app/api/${$params.id}`;
  };

  onMount(() => {
    forceRedirect();
  });
</script>

<div
  class="w-full h-screen flex items-center justify-center bg-[url('https://i.pinimg.com/originals/1d/26/c5/1d26c5b022c071fb8f1e3ae2f0f65ba9.gif')] bg-cover bg-no-repeat bg-fixed text-gray-100"
>
  <button id="whytho" use:registerFocus on:click={forceRedirect}
    >redirecting...</button
  >
</div>
