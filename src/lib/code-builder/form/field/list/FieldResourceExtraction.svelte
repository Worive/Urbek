<script lang="ts">
    import resources from '../../../../../assets/data/resources.json'

    export let item
    export let updateBuilding: Function

    function checkValidity() {
        if (item.value) {
            let isValid = false
            if (item.value.resource) {
                isValid = true
            }
            if (item.value.q === '') {
                item.value.q = 0
            }

            if (item.value.distance === '') {
                item.value.distance = 0
            }
            item.valid = isValid
        }
    }

    if (item.value === undefined) {
        item.value = {
            resource: '',
            q: 0,
            distance: 0,
        }
    }

</script>

<select class="form-select" bind:value={item.value.resource} on:change={checkValidity} on:change={updateBuilding}>
    <option selected value="">Choose Resource...</option>

    {#each resources['resources'] as resource}
        <option value="{resource.id}">{resource.name}</option>
    {/each}
</select>

<input bind:value={item.value.q} on:change={checkValidity} on:change={updateBuilding} type="number" class="form-control" placeholder="Quantity">
<input bind:value={item.value.distance} on:change={checkValidity} on:change={updateBuilding} type="number" class="form-control" placeholder="Distance Radius">