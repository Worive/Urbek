<script lang="ts">
    import TreeChart from "../lib/buildings/TreeChart.svelte";
    import reglasBioma from '../assets/data/reglasBioma_0.json'


    let construs = reglasBioma['construs']

    type exportDataType = {
        englishName: string,
        updates: string[]
    }

    let exportData = new Map<string, exportDataType>;

    for (let i = 0; i < construs.length; i++) {
        const building = construs[i]
        if (building['updates']) {
            exportData.set(building['codeName'], getExportObject(building['name'], building['updates']))
        } else {
            exportData.set(building['codeName'], getExportObject(building['name'], []))
        }
    }
    const repeat = new Map<string, number>;
    const relations = {
        name: 'Buildings',
        children: []
    }

    loop1:
        for (const key of exportData.keys()) {
            const data = exportData.get(key);

            for (const keyB in exportData.keys()) {
                const dataB = exportData.get(keyB);

                if (dataB.updates.includes(key)) {
                    continue loop1;
                }
            }

            relations.children.push(getTreeObject(key, data, 0));
        }


    function getTreeObject(buildingName: string, exportDataType: exportDataType, level: number) {
        let ignoreRepeat = false

        if (repeat.has(buildingName)) {
            ignoreRepeat = true
        } else {
            repeat.set(buildingName, 1)
        }


        console.log(buildingName + ' - ' + level)
        let children = []

        if (level < 10 && !ignoreRepeat) {


            for (const exportDatum of exportDataType.updates) {
                children.push(getTreeObject(exportDatum, exportData.get(exportDatum), level + 1))
            }
        }


        return {
            name: buildingName,
            englishName: exportDataType.englishName,
            children: children
        }
    }

    function getExportObject(englishName: string, updates: string[]) {
        return {
            englishName: englishName,
            updates: updates
        }
    }


    console.log(exportData)
</script>
<TreeChart data={relations}/>