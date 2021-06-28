<script>
    import {getContext, onMount, setContext} from 'svelte';
    import {shouldDisplayInput, typesMap} from "../EpicFormService";
    import {get, set, isEqual, cloneDeep} from 'lodash-es';
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
    let value;
    onMount(() => {
        value = get($values, name);
        initialValue= cloneDeep(value);
        ready = true;
    })

    function updateValues(valueArg) {
        values.update(old => set(old, name, valueArg))
    }

    function checkExternalValueChanges(values){
        const currentVal = get(values, name)
        if( currentVal !== value) {
            value = currentVal;
        }
    }

    function areValuesEqual(value1, value2){
        if(typeof typesMap[input.type].isEqual === 'function') {
            return typesMap[input.type].isEqual(value1, value1);
        }
        isEqual(value1, value2);
    }
    $: {
        checkExternalValueChanges($values);
    }
    $:{
        if(typeof value !== 'undefined') {
            updateValues(value);
        }
    }
    $: {
        input = $form.inputs.find(input => input.name === name);
        inputClass = (input.layout && input.layout[mode] && input.layout[mode].containerClass) || ''
    }
    $:shouldDisplay = shouldDisplayInput($form.inputs, input, $values, mode);
    $: {
        if (ready && !areValuesEqual(initialValue, get($values, name))) {
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
                          bind:value
        />
    </section>
{/if}
