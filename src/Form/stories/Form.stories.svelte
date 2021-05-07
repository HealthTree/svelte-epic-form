<script>
    import Form from "../Form.svelte";
    import Input from "../../Input/Input.svelte";
    import "../../built-in-types/TextType/TextType";
    import {writable} from 'svelte/store';
    import { Meta, Story } from '@storybook/addon-svelte-csf';

    const form = writable({
        inputs: [
            {
                type: 'text',
                name: 'object1.state',
                label: 'How are you?',
                placeholder: 'type your answer please',
                required: true,
                validations: [
                    {
                        type: "regexp",
                        rule: '^.{6,10}$',
                        message: "It should be between 6 and 10 chars."
                    },
                ]
            },
            {
                type: 'text',
                name: 'y',
                label: 'Why do you feel that way?',
                placeholder: 'type your answer please',
                displayCondition: `object1.state`,
                validations: [
                    {
                        type: "js",
                        rule: values => values.object1.state !==values.y,
                        message: "object1.state & Y should be different!"
                    },
                    {
                        type: "expression",
                        rule: 'object1.state.length > y.length',
                        message: "object1.state.length should be > than y.length"
                    },
                ]
            },
        ]
    })
</script>
<Meta title="Form" />
<Story name="Default">
    <div>
        <Form {form} let:hasErrors>
            <Input name="object1.state"/>
            <Input name="y"/>
            <button disabled={hasErrors}>Save</button>
        </Form>
    </div>
</Story>

