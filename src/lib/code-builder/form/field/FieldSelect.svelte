<script>
    import {createEventDispatcher} from "svelte";

    export let building
    export let field
    export let fieldValue

    const dispatch = createEventDispatcher();

    let value

    $: value, updateField()

    function updateField() {
        if (building.fields[field.name]) {
            value = building.fields[field.name]
        } else {
            value = ''
        }
    }

    function updateBuilding() {
        dispatch('updateFieldValue', {
            field: field.name,
            value: (value === '' ? undefined : value)
        });
    }
</script>

<select class="form-select" id={field.name} bind:value on:change={() => updateBuilding()}>
    <option value="">Choose...</option>
    {#each field.selectOptions as option}
        <option value={option.value}>{option.name}</option>
    {/each}
</select>