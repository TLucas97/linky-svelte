<!-- App.svelte -->
<script>
  import { Router, Route } from "svelte-navigator";
  import Main from "./pages/Main.svelte";
  import Redirect from "./pages/Redirect.svelte";
</script>

<Router>
  <Route path="/">
    <Main />
  </Route>
  <Route path="/redirect/:id" primary={false}>
    <Redirect />
  </Route>
</Router>
