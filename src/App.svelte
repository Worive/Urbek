<script lang="ts">
    import {Router, Route, Link} from "svelte-routing";
    import CodeBuilder from "./routes/CodeBuilder.svelte";
    import JsonValidator from "./routes/JsonValidator.svelte";
    import Footer from "./lib/Footer.svelte";
    import Home from "./routes/Home.svelte";
</script>

<Router>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container container-fluid">
            <span class="navbar-brand">Urbek Modding Tools</span>
            <button aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation"
                    class="navbar-toggler" data-bs-target="#navbarNavAltMarkup" data-bs-toggle="collapse" type="button">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <Link to="/urbek/" class="nav-link">Home</Link>
                    <Link to="/urbek/code-builder" class="nav-link">Code Builder</Link>
                    <Link to="/urbek/json-validator" class="nav-link">JSON Validator</Link>
                </div>
            </div>
        </div>
    </nav>

    <div class="pb-10">
        <Route path="/urbek/">
            <Home/>
        </Route>
        <Route path="/urbek/code-builder">
            <CodeBuilder/>
        </Route>
        <Route path="/urbek/json-validator">
            <JsonValidator/>
        </Route>
    </div>
</Router>

<Footer/>

<style>
    :global(a.nav-link[aria-current="page"]) { color: var(--bs-navbar-active-color) !important; }

    .pb-10 {
        padding-bottom: 10rem !important;
    }
</style>