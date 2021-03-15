<script>
    import {getContext, setContext} from "svelte";
    import {shouldDisplayInput, typesMap} from "../EpicFormService";

    export let name;
    export let mode = 'write';
    export let containerClass = '';

    setContext('name', name);

    let form = getContext('form');
    let values = getContext('values');
    let errors = getContext('errors');
    let dirty = getContext('dirty');

    let input = form.inputs.find(input => input.name === name);
    if(!input) {
        throw new Error('No input with name: ' + name)
    }

    let initialValue = $values[name];

    $:shouldDisplay = shouldDisplayInput(form.inputs, input, $values, mode);
    $: {
        if (initialValue !== $values[name]) {
            $dirty[name] = true;
        }
    }
</script>

{#if shouldDisplay}
    <section class="e-input-container e-input-type-{input.type} {containerClass || input.containerClass}">
        <svelte:component this={typesMap[input.type][mode]}
                          {input}
                          error={$errors[name]}
                          isDirty={$dirty[name]}
                          bind:value={$values[name]}
        />
    </section>
{/if}