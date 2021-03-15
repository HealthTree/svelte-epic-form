<script>
    import Input from "../../Input/Input.svelte";
    import Form from "../../Form/Form.svelte";

    export let form;
    export let values;
    export let errors;
    export let dirty;

    export let containerClass = '';
    export let listClass = '';
    export let descriptionClass = '';
    export let headerClass = '';
</script>

<section class={containerClass}>
    <Form {form} let:hasErrors bind:values bind:errors bind:dirty>
        <h1 class={headerClass}>
            {form.header}
        </h1>
        {#if form.description}
            <p class={descriptionClass}>
                {form.description}
            </p>
        {/if}
        <div class={listClass}>
            {#each form.inputs as input (input.name)}
                <Input name={input.name} mode="read"/>
            {/each}
        </div>
    </Form>
</section>
