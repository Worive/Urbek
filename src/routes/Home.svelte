<script>
    import { link } from "svelte-routing";
</script>

<div class="container ">
    <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
        <div class="col d-flex align-items-start">
            <div class="card">
                <div class="card-body">
                    <h2>Modding Documentation</h2>
                    <p>Documentation of every part of Urbek: City Builder modding.</p>
                    <a class="btn btn-primary" href="https://worive.gitbook.io/urbek-modding/">
                        Documentation
                    </a>
                </div>
            </div>
        </div>
        <div class="col d-flex align-items-start">
            <div class="card">
                <div class="card-body">
                    <h2>Building Code Generator</h2>
                    <p>Provide an interface to build the json file.</p>
                    <a class="btn btn-primary" href="/urbek/code-builder" use:link>
                        Building Code Generator
                    </a>
                </div>
            </div>
        </div>
        <div class="col d-flex align-items-start">
            <div class="card">
                <div class="card-body">
                    <h2>JSON Validator</h2>
                    <p>Will verify your json file is correctly made.</p>
                    <a class="btn btn-primary" href="/urbek/json-validator" use:link>
                        JSON Validator
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>