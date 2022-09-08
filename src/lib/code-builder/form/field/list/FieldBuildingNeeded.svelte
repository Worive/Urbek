<script lang="ts">
    export let item
    export let updateBuilding: Function

    function checkValidity() {
        if (item.value) {
            let isValid = false
            if (item.value.building) {
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
            building: '',
            radio: 0,
            q: 0,
            biggerThan: false,
        }
    }

</script>

<input bind:value={item.value.building} on:change={checkValidity} on:change={updateBuilding} type="text" class="form-control item-text" placeholder="Building Code Name">
<input bind:value={item.value.radio} on:change={checkValidity} on:change={updateBuilding} type="number" class="form-control item-number" placeholder="Radius">
<input bind:value={item.value.q} on:change={checkValidity} on:change={updateBuilding} type="number" class="form-control item-number" placeholder="Quantity">
<span class="input-group-text">BiggerThan</span>
<div class="input-group-text">
    <input bind:checked={item.value.biggerThan} class="form-check-input mt-0" type="checkbox"/>
</div>