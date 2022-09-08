<script lang="ts">
    import resources from '../../../../../assets/data/resources.json'
    export let item
    export let updateBuilding : Function
</script>

<select class="form-select" bind:value={item.value} on:change={updateBuilding}>
    <option selected value="">Choose Local Variable...</option>

    {#each resources['localVariables'] as localVariable}
        <option value="{localVariable.id}">{localVariable.name}</option>
    {/each}
</select>