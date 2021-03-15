<script>
    import {getContext} from "svelte";
    export let messageClass = '';

    let name = getContext('name');
    let errors = getContext('errors');
    let dirty = getContext('dirty');

    $:error = $errors[name];
    $:isDirty = $dirty[name];
    $:showError = isDirty && error;
</script>

{#if showError}<span class="error-message {messageClass}">{error}</span>{/if}