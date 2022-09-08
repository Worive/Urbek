<script lang="ts">
    import BuildingCard from "./selector/BuildingCard.svelte";

    export let buildingList: []
    export let selected: number

    export let selectBuilding: Function
</script>


<div class="mt-5 mb-5 p-4 card">
    <h2>List of buildings:</h2>
    <div class="col-md-12 d-flex justify-content-center flex-wrap buildingObjectListingClass">
        {#each buildingList as building (building.id)}
            <div class="col-md-3 col-sm-4 list-group m-1 pointer"
                 on:click|preventDefault={() => selectBuilding(building.id)}
            >
                <BuildingCard {building} {selected}/>
            </div>
        {/each}
    </div>
</div>

<style>
    .pointer {
        cursor: pointer;
    }
</style>