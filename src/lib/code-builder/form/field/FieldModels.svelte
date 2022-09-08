<script lang="ts">
    import {createEventDispatcher} from "svelte";

    export let building;
    export let field;
    export let fieldValue;

    const dispatch = createEventDispatcher();

    type Model = {
        name: string,
        sizeX: number,
        sizeY: number,
        default: boolean,
        SI: boolean,
        E: boolean,
        DE: boolean,
        A: boolean,
        DA: boolean
    }

    let models: Model[]
    updateField()

    function updateBuilding() {
        dispatch('updateFieldValue', {
            value: (models.length > 0 ? models : undefined)
        })
    }

    function updateField() {
        if (fieldValue) {
            models = fieldValue
        } else {
            models = []
        }
    }

    function addModel() {
        models = [...models,
            {
                name: "", sizeX: 1, sizeY: 1,
                A: false,
                DA: false,
                DE: false,
                E: false,
                SI: false,
                default: false,
            }
        ]

        updateBuilding()
    }

    function deleteModel(index) {
        models.splice(index, 1)
        models = models
    }

</script>

<div>
    <h5>Building Models</h5>
    <button class="btn btn-primary col-sm-4 mb-3" type="button" on:click={() => addModel()}>Add Model</button>
    <div class="accordion" id="modelList">
        {#each models as model, i}
            <div class="accordion-item">
                <h2 class="accordion-header" id="modelHeader-{i}">
                    <button
                            class="accordion-button"
                            class:collapsed={i !== models.length-1}
                            type="button" data-bs-toggle="collapse"
                            data-bs-target="#modelBody-{i}" aria-expanded="true"
                            aria-controls="#modelBody-{i}">
                        Model: {model.name ? model.name : i + '#'}
                        <button type="button" class="btn btn-outline-danger ms-auto" on:click={() => deleteModel(i)}>
                            Delete
                        </button>
                    </button>

                </h2>
                <div id="modelBody-{i}" class="accordion-collapse"
                     class:collapsed={i !== models.length-1}
                     class:collapse={i !== models.length-1}
                     class:show={i === models.length-1}
                     aria-labelledby="{'modelHeader-' + i}" style aria-expanded="{i === models.length-1}"
                     data-bs-parent="#modelList">
                    <div class="accordion-body">
                        <div class="row">
                            <div class="col-sm-4">
                                <label class="form-label" for="modelName-{i}">Model Name</label>
                                <input class="form-control" id="modelName-{i}"
                                       placeholder="" type="text"
                                       bind:value={model.name}
                                       on:input={updateBuilding}
                                >
                            </div>
                            <div class="col-sm-4">
                                <label class="form-label" for="sizeX-{i}">Size in
                                    Tiles Vertically</label>
                                <input class="form-control" id="sizeX-{i}"
                                       placeholder="" type="number" bind:value={model.sizeX} on:input={updateBuilding}>
                            </div>
                            <div class="col-sm-4">
                                <label class="form-label" for="sizeY-{i}">Size in
                                    Tiles Horizontally</label>
                                <input class="form-control" id="sizeY-{i}"
                                       placeholder="" type="number" bind:value={model.sizeY} on:input={updateBuilding}>
                            </div>
                            <div class="col-sm-12 my-3">
                                <div class="list-group mx-0 w-auto">
                                    <label class="list-group-item d-flex gap-2">
                                        <input bind:checked={model.default} class="form-check-input flex-shrink-0"
                                               type="checkbox"
                                               value="default" on:change={updateBuilding}>
                                        <span>Default
                                            <small class="d-block text-muted">Will be placed anywhere</small>
                                        </span>
                                    </label>
                                    <label class="list-group-item d-flex gap-2">
                                        <input bind:checked={model.SI} class="form-check-input flex-shrink-0"
                                               type="checkbox"
                                               value="insideOnly" on:change={updateBuilding}>
                                        <span>Inside Only
                                            <small class="d-block text-muted">Will only appear in internal area of models</small>
                                        </span>
                                    </label>
                                    <label class="list-group-item d-flex gap-2">
                                        <input bind:checked={model.E} class="form-check-input flex-shrink-0"
                                               type="checkbox" value="edge" on:change={updateBuilding}>
                                        <span>Edge
                                            <small class="d-block text-muted">Will only appear on edges.</small>
                                        </span>
                                    </label>
                                    <label class="list-group-item d-flex gap-2">
                                        <input bind:checked={model.DE} class="form-check-input flex-shrink-0"
                                               type="checkbox"
                                               value="doubleEdge" on:change={updateBuilding}>
                                        <span>Double Edge
                                            <small class="d-block text-muted">Will appear when a same tile is facing roads from 2 opposite sides only.</small>
                                        </span>
                                    </label>
                                    <label class="list-group-item d-flex gap-2">
                                        <input bind:checked={model.A} class="form-check-input flex-shrink-0"
                                               type="checkbox" value="antiEdge" on:change={updateBuilding}>
                                        <span>Anti Edge
                                            <small class="d-block text-muted">Will only appear on opposites of edges for coastal structures.</small>
                                        </span>
                                    </label>
                                    <label class="list-group-item d-flex gap-2">
                                        <input bind:checked={model.DA} class="form-check-input flex-shrink-0"
                                               type="checkbox"
                                               value="doubleAntiEdge" on:change={updateBuilding}>
                                        <span>Double Anti Edge
                                            <small class="d-block text-muted">Will be placed anywhere</small>
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>


<style>
    .accordion-button::after {
        margin-left: 2em;
    }

    .accordion-button {
        padding: 0.5rem 1rem;
    }

</style>