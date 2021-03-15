<script>
    import {setContext} from 'svelte';
    import {writable} from 'svelte/store';
    import {getNumberOfErrors, getFormValidationErrors} from "../EpicFormService";

    export let form;
    setContext('form', form)

    export let values = writable({});
    setContext('values', values)

    export let errors = writable({});
    setContext('errors', errors)

    export let dirty = writable({});
    setContext('dirty', dirty);

    let hasErrors;

    $: {
        $errors = getFormValidationErrors(form, $values);
        hasErrors = getNumberOfErrors($errors) > 0;
    }
</script>

<style>

</style>

<form>
    <slot {values} {errors} {dirty} {hasErrors}/>
</form>