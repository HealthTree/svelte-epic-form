<script>
    import '../../../built-in-types/TextType/TextType';
    import {writable} from 'svelte/store';
    import WriteForm from '../WriteForm.svelte';
    import { Meta, Story } from '@storybook/addon-svelte-csf';
    import {onMount} from 'svelte';

    const form = writable({
        header: 'Test form header',
        description: 'test description',
        inputs: [
            {
                type: 'text',
                name: 'object1.name',
                label: 'How are you?',
                placeholder: 'type your answer please',
                required: true,
                layout: {
                    write: {
                        containerClass: 'col-4'
                    }
                }
            },
            {
                type: 'text',
                name: 'y',
                label: 'Why do you feel that way?',
                placeholder: 'type your answer please',
                displayCondition: 'x',
                layout: {
                    write: {
                        containerClass: 'col-4'
                    }
                }
            },
        ]
    });
    let values = writable({});

    const object1 = {
        name: null
    };

    setTimeout(() => {
        // reactivity of form
        form.update((older) => ({...older, header: 'hello'}));
    }, 2000)

    onMount(() => {
        $values.object1 = object1;
    })
    $: {
        console.log($values)
    }
</script>
<Meta title="WriteForm" />
<Story name="Default">
    <WriteForm
            {form}
    />
</Story>

<Story name="With Values">
    <WriteForm
            bind:values
            {form}
    />
</Story>
