<script lang="ts">
    import buildings from '../../../buildings.ts';

    function addBuilding() {
        let id = 1

        while ($buildings.get(id) !== undefined) {
            id += 1
        }

        $buildings.set(id, {id:id, fields:{}});

        $buildings = $buildings
    }
</script>

<button class="btn btn-success btn-md" type="button" on:click={() => addBuilding()}>
    Add Building
</button>