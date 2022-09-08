<script lang="ts">
    import type {ListItem} from "../FieldList.svelte";
    import FieldResource from "./FieldResource.svelte";
    import FieldBuildingNeeded from "./FieldBuildingNeeded.svelte";
    import FieldBiome from "./FieldBiome.svelte";
    import FieldLocalVariable from "./FieldLocalVariable.svelte";
    import FieldResourceExtraction from "./FieldResourceExtraction.svelte";
    import FieldGlobalVariable from "./FieldGlobalVariable.svelte";
    import FieldNumberBuilding from "./FieldNumberBuilding.svelte";

    export let building
    export let field
    export let item: ListItem
    export let updateBuilding : Function

    const components = {
        buildingNeeded: FieldBuildingNeeded,
        biome: FieldBiome,
        resource: FieldResource,
        localVariable: FieldLocalVariable,
        resourceExtraction: FieldResourceExtraction,
        globalVariable: FieldGlobalVariable,
        numberBuilding: FieldNumberBuilding
    }

    if (components[item.type] === undefined) {
        console.error("Unknown list type: " + item.type)
    }

</script>
{#if item.type === 'string'}
    <input bind:value={item.value} on:change={updateBuilding} type="text" class="form-control item-value"
           placeholder={field.placeHolder} aria-label="string">

{:else}
    <svelte:component this={components[item.type]} {item} {updateBuilding}/>
{/if}
