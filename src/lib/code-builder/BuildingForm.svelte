<script lang="ts">
    import data from '../../assets/data/codeBuilderData.json'
    import BuildingField from "./form/Field.svelte";
    import buildings from "../../buildings.ts";

    export let building
    export let reloadBuildingSelector: Function
    export let updateCanGenerate: Function
    export let selectTab : Function
    export let selectedTab : number
    $: selectedCategory = data['categories'][selectedTab]

    function handleReloadBuildings(event) {
        $buildings = $buildings
    }

    function handleUpdateFieldValue(event, field) {
        console.log(`[FIELD UPDATE] ${field.name}:`)
        console.log(event.detail.value)
        console.log('[END OF FIELD UPDATE]')
        building.fields[field.name] = event.detail.value
        reloadBuildingSelector()
        updateCanGenerate()
    }

</script>
<div class="row">
    <div class="rendered-form">
        <span class="d-none" id="selected">{selectedTab}</span>
        <div>
            {#key selectedTab}
                <h4 class="mb-3">Building Form {building.id}#</h4>
                <form class="needs-validation" novalidate>
                    <ul class="nav nav-tabs">
                        {#each data['categories'] as category, i}
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" type="button"
                                        class:active={selectedTab === i}
                                        on:click|preventDefault={() => selectTab(i)}
                                >
                                    {category.name}
                                </button>
                            </li>
                        {/each}
                    </ul>
                    <div class="row g-3 mt-2">
                        {#each selectedCategory['subCategories'] as subCategory, i}
                            {#if (i > 0)}
                                <hr>
                            {/if}

                            <h4>{subCategory.name}</h4>
                            {#each subCategory.fields as field}
                                    <BuildingField {building} {field}
                                                   on:reloadBuildings={handleReloadBuildings}
                                                   on:updateFieldValue={(event) => handleUpdateFieldValue(event, field)}
                                    />
                            {/each}
                        {/each}
                    </div>
                </form>
            {/key}
        </div>
    </div>
</div>