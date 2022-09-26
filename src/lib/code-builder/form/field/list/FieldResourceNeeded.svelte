<script lang="ts">
    import resources from '../../../../../assets/data/resources.json'

    export let item
    export let updateBuilding: Function

    function checkValidity() {
        if (item.value) {
            let isValid = false
            if (item.value.resource && item.value.resource !== '') {
                isValid = true
            }
            if (item.value.radio === '') {
                item.value.radio = 0
            }

            if (item.value.q === '') {
                item.value.q = 0
            }

            item.valid = isValid
        } else {
            console.error('value undefined')
        }
    }

    if (item.value === undefined) {
        item.value = {
            resource: '',
            radio: 0,
            q: 0,
            biggerThan: false,
        }
    }

</script>


<select class="form-select" bind:value={item.value.resource} on:change={checkValidity} on:change={updateBuilding}>
    <option selected value="">Choose Resource...</option>

    {#each resources['resources'] as resource}
        <option value="{resource.id}">{resource.name}</option>
    {/each}
</select>

<input bind:value={item.value.radio} on:change={checkValidity} on:change={updateBuilding} type="number" class="form-control item-number" placeholder="Radius">
<input bind:value={item.value.q} on:change={checkValidity} on:change={updateBuilding} type="number" class="form-control item-number" placeholder="Quantity">
<span class="input-group-text">BiggerThan</span>
<div class="input-group-text">
    <input bind:checked={item.value.biggerThan} on:change={checkValidity} on:change={updateBuilding} class="form-check-input mt-0" type="checkbox"/>
</div>