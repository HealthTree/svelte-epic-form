import ReadForm from "../ReadForm.svelte"
import {writable} from "svelte/store";

export default {title: 'ReadForm'}

const form = {
    header: 'Test form header',
    description: 'test description',
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

export const Default = () => ({
    Component: ReadForm,
    props: {
        form,
        values: writable({x:'test value', y: 'ydghsauydgsua'})
    },
})