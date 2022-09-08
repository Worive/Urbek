<script lang="ts">
    import buildings from '../buildings.ts';
    import categories from '../assets/data/codeBUilderData.json'
    import BuildingForm from "../lib/code-builder/BuildingForm.svelte";
    import BuildingSelector from "../lib/code-builder/BuildingSelector.svelte";
    import ButtonMenu from "../lib/code-builder/ButtonMenu.svelte";
    import ModalOutput from "../lib/code-builder/ModalOutput.svelte";
    import {onMount} from "svelte";


    let selected = 1
    let selectedTab = 2
    let canGenerate : number

    let didLoad = false
    loadSession()

    let buildingList

    $: $buildings && onBuildingChange();

    $: selectedBuilding = $buildings.get(selected)

    function onBuildingChange() {
        if ($buildings.size === 0) {
            $buildings.set(1, {id: 1, fields: {}})

            $buildings = $buildings
        }

        buildingList = Array.from($buildings.values())

        if ($buildings.get(selected) === undefined) {
            selected = Array.from($buildings.keys()).pop();
        }

        updateCanGenerate()
    }

    function saveSession() {
        if (didLoad) {
            console.log('Saving...')
        } else {
            console.error('Tried to save before load!')
            return;
        }

        let obj = {}

        for (const building of Array.from($buildings.values())) {
            obj[building.id] = building
        }

        localStorage.setItem('buildings', JSON.stringify(obj))
        console.log('Saved!')
    }

    function loadSession() {
        console.log('LOADING')
        if (didLoad) {
            console.error('Tried to load again')
        } else {
            didLoad = true
        }
        let jsonString;
        let jsonStringCookie = getCookie('buildingsSave');

        if (jsonStringCookie !== undefined && jsonStringCookie !== '') {
            console.log('Importing old cookie save...')
            jsonString = jsonStringCookie;
            setCookie('buildingsSave', null, 0);
        } else {
            jsonString = localStorage.getItem('buildings')
        }

        if (jsonString !== undefined && jsonString !== '') {
            console.log('[LOADING] Found save, loading it.')
            let objJson = JSON.parse(jsonString);

            let map = new Map<number, Object>;
            for (const buildingId in objJson) {
                map.set(parseInt(buildingId), objJson[buildingId])
            }

            buildings.set(map);
            $buildings = $buildings;
        } else {
            console.log('[LOADING] No save found, generate default.')
            $buildings.set(1, {id: 1, fields: {}})
        }
    }

    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = 'expires='+ d.toUTCString();
        document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
    }

    function getCookie(cname) {
        var name = cname + '=';
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    }


    let requiredFields = []

    for (const category of categories['categories']) {
        for (const subCategory of category['subCategories']) {
            for (const field of subCategory['fields']) {
                if (field['required']) {
                    requiredFields.push(field.name)
                }
            }
        }
    }

    const updateCanGenerate = () => {
        let countMissingFields = 0
        for (const building of buildingList) {
            for (const requiredField of requiredFields) {
                if (building.fields[requiredField] === undefined) {
                    countMissingFields += 1
                }
            }
        }

        canGenerate = countMissingFields
        saveSession()

    }

    const selectBuilding = (buildingId: number) => {
        selected = buildingId
        buildingList = buildingList
    }
    const selectTab = (tab: number) => {
        selectedTab = tab;
    }

    let buildingSelector = true
    const reloadBuildingSelector = () => {
        buildingSelector = !buildingSelector
    }

    let modal
    const generate = () => modal.generate()


    onMount(() => {
        updateCanGenerate()
    })
</script>


<div class="container">
    {#key buildingSelector}
        <BuildingSelector {buildingList} {selectBuilding} {selected}/>
    {/key}
    <ButtonMenu {selected} {generate} {canGenerate}/>

    {#key selected}
        <BuildingForm building={selectedBuilding} {reloadBuildingSelector} {selectTab} {selectedTab}
                      {updateCanGenerate}/>
    {/key}

</div>

<ModalOutput bind:this={modal} {buildingList}/>