import WriteForm from "../WriteForm.svelte"
import {writable} from "svelte/store";

export default {title: 'WriteForm'}

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
    Component: WriteForm,
    props: {
        form
    },
})

export const WithInitialValues = () => ({
    Component: WriteForm,
    props: {
        form,
        values: writable({x:'I feel good!', y:'It\'s friday'})
    },
})