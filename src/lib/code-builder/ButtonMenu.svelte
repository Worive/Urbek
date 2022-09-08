<script lang="ts">
    import RemoveBuilding from "./menuButtons/RemoveBuilding.svelte";
    import AddBuilding from "./menuButtons/AddBuilding.svelte";

    export let selected
    export let generate: Function
    export let canGenerate : number
</script>

<div class="d-flex flex-row-reverse">
    <button class="col-md-3 btn btn-lg" data-bs-target="#exampleModal" data-bs-toggle="modal"
            type="button"
            class:btn-primary={canGenerate === 0}
            class:btn-danger={canGenerate > 0}
            on:click={generate} class:disabled={canGenerate > 0}>

        {#if canGenerate === 0}
            Generate
        {:else}
            Missing {canGenerate} Required Field{(canGenerate > 1 ? 's' : '')}!
        {/if}
    </button>
    <RemoveBuilding {selected}/>
    <AddBuilding/>
</div>