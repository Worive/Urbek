<script lang="ts">
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();

    export let field
    export let building
    export let fieldValue

    let value

    $: fieldValue, updateField()

    function updateField() {
        if (building.fields[field.name]) {
            value = building.fields[field.name]
        } else {
            value = ''
        }
    }

    function updateBuilding() {
        dispatch('updateFieldValue', {
            value: (value === '' ? undefined : value)
        });
    }

</script>

{#if field.type === 'string'}
    <input bind:value={value} on:input={updateBuilding} class="form-control" id={field.name} placeholder="" type="text">
{:else if field.type === 'number'}
    <input bind:value={value} class="form-control" id={field.name} placeholder="" type="number">
{:else}
    Unknown Field Type: {field.type}
{/if}

