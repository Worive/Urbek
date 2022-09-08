<script lang="ts">
    import resources from '../../../../../assets/data/resources.json'

    export let item
    export let updateBuilding: Function

    function checkValidity() {
        if (item.value) {
            let isValid = false
            if (item.value.nBuildings && item.value.nBuildings !== '') {
                isValid = true
            }
            if (item.value.q === '') {
                item.value.q = 0
            }
            item.valid = isValid
        } else {
            item.value = {
                nBuildings: '',
                q: undefined
            }
        }
    }

    if (item.value === undefined) {
        item.value = {
            nBuildings: '',
            q: undefined
        }
    }

</script>

<input bind:value={item.value.nBuildings} on:change={item.value} on:change={checkValidity} type="text" class="form-control" placeholder="Building Code Name">
<input bind:value={item.value.q} on:change={checkValidity} type="number" class="form-control" placeholder="Quantity">