<script>
    import Input from "../../Input/Input.svelte";
    import Form from "../../Form/Form.svelte";
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();

    export let form;
    export let values;
    export let errors;
    export let dirty;

    export let containerClass = '';
    export let headerClass = '';
    export let listClass = '';
    export let inputContainerClass;
    export let descriptionClass = '';

    //Buttons
    export let buttonsContainerClass = '';

    //Primary button
    export let primaryButtonText = 'Submit';
    export let primaryButtonClass = '';

    //Secondary Button
    export let showSecondaryButton = true;
    export let secondaryButtonText = 'Cancel';
    export let secondaryButtonClass = '';

    function onSubmit(event) {
        event.preventDefault();
        dispatch('submit', {
            values,
            errors,
            dirty,
            form
        });
    }

    function onCancel(event) {
        event.preventDefault();
        dispatch('cancel', {
            form
        });
    }
</script>

<section class={containerClass}>
    {$form.header}
    <Form {form} let:hasErrors bind:values bind:errors bind:dirty>
        <h1 class={headerClass}>
            {$form.header}
        </h1>
        {#if $form.description}
            <p class={descriptionClass}>
                {$form.description}
            </p>
        {/if}
        <div class={listClass}>
            {#each $form.inputs as input (input.name)}
                <Input name={input.name} containerClass={inputContainerClass}/>
            {/each}
        </div>
        <div class={buttonsContainerClass}>
            <button class:disabled={hasErrors} class={primaryButtonClass} disabled={hasErrors} type="submit"
                    on:click={onSubmit}>
                {primaryButtonText}
            </button>
            {#if showSecondaryButton}
                <button class={secondaryButtonClass} on:click={onCancel}>
                    {secondaryButtonText}
                </button>
            {/if}
        </div>
    </Form>
</section>
