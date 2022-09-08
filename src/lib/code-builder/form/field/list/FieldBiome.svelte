<script lang="ts">
    import resources from '../../../../../assets/data/resources.json'
    export let item
    export let updateBuilding : Function
</script>

<select class="form-select" bind:value={item.value} on:change={updateBuilding}>
    <option selected value="">Choose Biome...</option>

    {#each resources['biomes'] as biome}
        <option value="{biome.id}">{biome.name}</option>
    {/each}
</select>