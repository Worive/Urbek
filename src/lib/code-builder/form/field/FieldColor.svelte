<script lang="ts">
    import {createEventDispatcher} from "svelte";

    export let building
    export let field
    export let fieldValue

    const dispatch = createEventDispatcher();

    let value
    let useColor

    $: value, updateField()

    function updateField() {
        if (fieldValue) {
            value = fieldValue
        } else {
            value = '#5E7ABC'
        }
    }

    let timeStartedWaiting: Date;

    async function onInput() {
        timeStartedWaiting = new Date();

        if (useColor) {
            await updateAfter250(timeStartedWaiting);
        }
    }

    function updateAfter250(timeStart) {
        return new Promise(() => {
            setTimeout(() => {
                if (timeStartedWaiting === timeStart) {
                    updateBuilding()
                }
            }, 250);
        });
    }

    function updateBuilding() {
        if (useColor) {
            dispatch('updateFieldValue', {
                field: field.name,
                value: (value === '' ? undefined : value)
            });
        } else {
            dispatch('updateFieldValue', {
                field: field.name,
                value: undefined
            });
        }
    }
</script>


<div class="input-group mt-3 mb-1">
    <span class="input-group-text">Use color</span>
    <div class="input-group-text">
        <input bind:checked={useColor} on:change={updateBuilding} class="form-check-input mt-0" type="checkbox">
    </div>

    <input bind:value on:input={onInput} type="color" class="form-control form-control-color"
           title="Chose the color">
</div>