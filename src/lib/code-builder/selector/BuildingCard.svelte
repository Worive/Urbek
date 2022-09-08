<script lang="ts">
    import {onMount} from "svelte";

    export let building;
    export let selected

    let title;
    let codeName;


    if (building.fields['name']) {
        title = building.fields['name'];
    } else {
        title = 'undefined'
    }

    if (building.fields['codeName']) {
        codeName = building.fields['codeName'];
    } else {
        codeName = 'undefined'
    }


    let image = 'unknown'

    onMount(() => {
        if (building !== undefined) {
            if (building.fields !== undefined) {
                let value = building.fields['category']
                if (value !== undefined) {
                    image = value
                } else {
                    image = 'unknown'
                }
            }
        }

    })



</script>

<div class="list-group-item list-group-item-action d-flex gap-3 py-3 border-1" aria-current="true"
     class:selected-building={building.id === selected}>
    <img class="my-auto" src="/urbek/icons/{image}.png" height="40" alt="category icon">
    <div class="d-flex gap-2 w-100 justify-content-between">
        <div>
            <h6 class="mb-0">{title}</h6>
            <p class="mb-0 opacity-75">{codeName}</p>
        </div>
        <small class="opacity-50 text-nowrap">{building.id}</small>
    </div>
</div>

<style>
    .selected-building, .selected-building:hover, .selected-building:active, .selected-building:focus {
        background-color: var(--bs-list-group-active-bg);
    }

    .selected-building * {
        color: white;
        cursor: default;
    }
</style>