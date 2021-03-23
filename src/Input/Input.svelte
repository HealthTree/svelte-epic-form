<script>
    import {getContext, onMount, setContext} from 'svelte';
    import {shouldDisplayInput, typesMap} from "../EpicFormService";

    export let name;
    export let mode = 'write';

    setContext('name', name);

    let form = getContext('form');
    let values = getContext('values');
    let errors = getContext('errors');
    let dirty = getContext('dirty');

    let input = form.inputs.find(input => input.name === name);
    export let containerClass = (input.layout && input.layout[mode] && input.layout[mode].containerClass) || '';

    if(!input) {
        throw new Error('No input with name: ' + name)
    }

    let initialValue, ready = false;

    onMount(() => {
        initialValue= $values[name];
        ready = true;
    })

    $:shouldDisplay = shouldDisplayInput(form.inputs, input, $values, mode);
    $: {
        if (ready && (initialValue !== $values[name])) {
            $dirty[name] = true;
        }
    }
    $:showError = $dirty[name] && $errors[name];
</script>

{#if shouldDisplay}
    <section class="e-input-container e-input-type-{input.type} {containerClass}">
        <svelte:component this={typesMap[input.type][mode]}
                          {input}
                          error={$errors[name]}
                          isDirty={$dirty[name]}
                          {showError}
                          bind:value={$values[name]}
        />
    </section>
{/if}
