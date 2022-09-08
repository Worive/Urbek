<script lang="ts">
    import FieldListItem from "./list/FieldListItem.svelte";
    import {createEventDispatcher} from "svelte";
    import buildings from "../../../../buildings";

    export let building
    export let field
    export let fieldValue

    const dispatch = createEventDispatcher();

    export type ListItem = {
        type: string,
        value: any,
        valid: true,
    }
    let types = Object.keys(field.item)
    let items: ListItem[] = []

    function addItem(type) {
        items = [...items, {type: type, value: undefined, valid: true}]
    }

    function removeItem(index) {
        items.splice(index, 1)
        items = items
    }

    if (fieldValue) {
        items = fieldValue;
    } else {
        items = []
    }


    let updateBuilding = () => {
        let validItems = items.filter(item => item.valid);
        dispatch('updateFieldValue', {
            value: (validItems.length === 0 ? undefined : validItems)
        });
    }

</script>

<div class="card">
    <div class="card-body" id="{field.name}">
        <h5 class="card-title">{field.fancyName}</h5>
        <h6 class="card-subtitle mt-3 mb-2">
            {#each types as type}
                <button type="button" class="btn btn-primary me-1" on:click={() => addItem(type)}>Add {type}</button>
            {/each}
        </h6>
        <div class="list-items">
            {#each items as item, i}
                <div class="input-group mt-3 mb-1">
                    <FieldListItem {building} field={field.item[item.type]} {item} {updateBuilding}/>
                    <button class="btn btn-outline-danger" type="button" on:click={() => removeItem(i)}>Remove
                    </button>
                </div>
            {/each}
        </div>
    </div>
</div>