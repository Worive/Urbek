<script lang="ts">
    import buildings from "../../../../buildings";
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();

    export let building
    export let field;
    export let fieldValue;

    const enum State {
        Indeterminate,
        True,
        False
    }

    let indeterminate:boolean = true
    let state:State = State.Indeterminate
    let checked = false

    $: building, updateField()
    $: state, onStateUpdate()

    function updateField() {
        if (building.fields[field.name] !== undefined) {
            if (building.fields[field.name]) {
                state = State.True
            } else {
                state = State.False
            }
        } else {
            state = State.Indeterminate
        }
    }

    function onStateUpdate() {
        switch (state) {
            case State.Indeterminate:
                indeterminate = true;
                checked = false;
                break
            case State.True:
                indeterminate = false;
                checked = true
                break
            case State.False:
                indeterminate = false;
                checked = false;
        }
    }

    function onChange() {
        switch (state) {
            case State.Indeterminate:
                state = State.True
                break
            case State.True:
                state = State.False
                break
            case State.False:
                state = State.Indeterminate
                break
        }

        updateBuilding()
    }

    function updateBuilding() {
        let value
        switch (state) {
            case State.True:
                value = true;
                break
            case State.False:
                value = false;
                break
            case State.Indeterminate:
                value = undefined;
        }

        dispatch('updateFieldValue', {
            value: value
        });
    }
</script>

<div class="list-group mx-0 w-auto">
    <label class="list-group-item d-flex gap-2">
        <input bind:checked on:change={() => onChange()} class="form-check-input flex-shrink-0"
               id={field.name}
               type="checkbox" value={field.name}
               {indeterminate}
        >
        <span> {field.fancyName}
            <small class="d-block text-muted">
                Documentation page:
                <a class="text-reset fw-bold" href={field.wikiPage} target="_blank">link</a>
            </small>
        </span>
    </label>
</div>