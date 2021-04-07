<script>
    import {getContext, onMount, setContext} from 'svelte';
    import {shouldDisplayInput, typesMap} from "../EpicFormService";

    export let name;
    export let mode = 'write';
    export let containerClass;
    setContext('name', name);

    let form = getContext('form');
    let values = getContext('values');
    let errors = getContext('errors');
    let dirty = getContext('dirty');

    let input;
    let inputClass;
    let initialValue, ready = false;

    onMount(() => {
        initialValue= $values[name];
        ready = true;
    })
    $: {
        input = $form.inputs.find(input => input.name === name);
        inputClass = (input.layout && input.layout[mode] && input.layout[mode].containerClass) || ''
    }
    $:shouldDisplay = shouldDisplayInput($form.inputs, input, $values, mode);
    $: {
        if (ready && (initialValue !== $values[name])) {
            $dirty[name] = true;
        }
    }
    $:showError = $dirty[name] && $errors[name];
</script>

{#if shouldDisplay}
    <section class="e-input-container e-input-type-{input.type} {containerClass || inputClass}">
        <svelte:component this={typesMap[input.type][mode]}
                          {input}
                          error={$errors[name]}
                          isDirty={$dirty[name]}
                          {showError}
                          bind:value={$values[name]}
        />
    </section>
{/if}
