<script>
    import ErrorMessage from "../../ErrorMessage/ErrorMessage.svelte";
    export let input;
    export let value;
    export let showError;
</script>

<style>

</style>

<label>
    {input.label}
    <input type="text" name={input.name} placeholder={input.placeholder} bind:value/>
</label>
<ErrorMessage/>
