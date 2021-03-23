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
                required: true,
                validations: [
                    {
                        type: "regexp",
                        rule: '^.{6,50}$',
                        message: "It should be between 6 and 50 chars."
                    },
                ]
            },
            {
                type: 'text',
                name: 'y',
                label: 'Why do you feel that way?',
                placeholder: 'type your answer please',
                displayCondition: 'x',
                validations: [
                    {
                        type: "js",
                        rule: values => values.x!==values.y,
                        message: "X & Y should be different!"
                    },
                    {
                        type: "expression",
                        rule: 'x.length > y.length',
                        message: "x.length should be > than y.length"
                    },
                ]
            },
        ]
    }
</script>

<div>
    <Form {form}>
        <Input name="x"/>
        <Input name="y"/>
    </Form>
</div>