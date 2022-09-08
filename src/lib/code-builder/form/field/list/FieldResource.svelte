<script lang="ts">
    import resources from '../../../../../assets/data/resources.json'
    export let item
    export let updateBuilding : Function
</script>

<select class="form-select" bind:value={item.value} on:change={updateBuilding}>
    <option selected value="">Choose Resource...</option>

    {#each resources['resources'] as resource}
        <option value="{resource.id}">{resource.name}</option>
    {/each}
</select>