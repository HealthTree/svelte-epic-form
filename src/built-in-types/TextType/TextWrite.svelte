<script>
    import ErrorMessage from "../../ErrorMessage/ErrorMessage.svelte";
    export let input;
    export let value;
    export let error;
    export let isDirty;

    $:showError = isDirty && error;
</script>

<style>

</style>

<label>
    {input.label}
</label>
<input type="text" name={input.name} placeholder={input.placeholder} bind:value/>
<ErrorMessage/>
