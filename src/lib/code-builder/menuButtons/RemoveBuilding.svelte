<script lang="ts">
    import buildings from '../../../buildings.ts';

    export let selected;

    function removeBuilding() {
        $buildings.delete(selected);
        $buildings = $buildings;
    }
</script>

<button class="btn btn-danger btn-md mx-3" type="button" on:click={() => removeBuilding()}>
    Remove Building
</button>