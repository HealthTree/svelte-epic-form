<script>
    import Form from "../Form.svelte";
    import Input from "../../Input/Input.svelte";
    import "../../built-in-types/TextType/TextType";

    const form = {
        inputs: [
            {
                type: 'text',
                name: 'x',
                label: 'How are you?',
                placeholder: 'type your answer please',
                required: true
            },
            {
                type: 'text',
                name: 'y',
                label: 'Why do you feel that way?',
                placeholder: 'type your answer please',
                displayCondition: 'x'
            },
        ]
    }

    let values = {};
</script>

<div>
    <Form {form}>
        <Input name="x"/>
        <Input name="y"/>
    </Form>
</div>