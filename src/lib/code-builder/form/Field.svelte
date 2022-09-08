<script lang="ts">
    import FieldSelect from "./field/FieldSelect.svelte";
    import FieldBoolean from "./field/FieldBoolean.svelte";
    import FieldBasic from "./field/FieldBasic.svelte";
    import FieldList from "./field/FieldList.svelte";
    import FieldModels from "./field/FieldModels.svelte";
    import {onMount} from "svelte";
    import FieldColor from "./field/FieldColor.svelte";

    export type FieldType = {
        fancyName: string,
        name: string,
        type: string,
        item: {
            type: string,
            placeHolder: string
        },
        wikiPage: string,
        display: {
            col: number
        },
        required: boolean,
        selectOptions: [
            {
                value: string,
                name: string
            }
        ]
    };

    export let building
    export let field: FieldType;

    const DEFAULT_COL_SIZE = 6;

    let size = (field.display ? field.display.col : DEFAULT_COL_SIZE)

    let fieldTypes = {
        string: FieldBasic,
        number: FieldBasic,
        select: FieldSelect,
        boolean: FieldBoolean,
        list: FieldList,
        models: FieldModels,
        color: FieldColor
    }
</script>

{#if field !== undefined && fieldTypes[field.type] !== undefined}
    <div class="col-sm-{size}">
        {#if field.type === 'string' || field.type === 'number' || field.type === 'select'}
            <label class="form-label" for="{field.name}">
                {field.fancyName}
                {#if field.required}
                    <span class="text-muted">(Required)</span>
                {/if}
            </label>
        {/if}
        <svelte:component this={fieldTypes[field.type]} {field} {building} fieldValue={building.fields[field.name]}
                          on:updateFieldValue on:reloadBuildings/>
    </div>
{:else}
    Missing field: {field.type}
    FieldType:
{/if}


