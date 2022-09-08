<script lang="ts">
    import resources from '../../../../../assets/data/resources.json'

    export let item
    export let updateBuilding: Function

    function checkValidity() {
        if (item.value) {
            let isValid = false
            if (item.value.gloVar) {
                isValid = true
            }
            if (item.value.q === '') {
                item.value.q = 0
            }

            item.valid = isValid
        }
    }

    if (item.value === undefined) {
        item.value = {
            gloVar: '',
            q: 0,
        }
    }
</script>

<select class="form-select" bind:value={item.value.gloVar} on:change={checkValidity} on:change={updateBuilding}>
    <option selected value="">Choose Global Variable...</option>

    {#each resources['globalVariables'] as globalVariable}
        <option value="{globalVariable.id}">{globalVariable.name}</option>
    {/each}
</select>

<input bind:value={item.value.q} on:change={checkValidity} on:change={updateBuilding} type="number" class="form-control" placeholder="Quantity">