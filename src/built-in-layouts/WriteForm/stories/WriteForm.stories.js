import WriteForm from "../WriteForm.svelte"
import {writable} from "svelte/store";

export default {title: 'WriteForm'}

const form = writable({
    header: 'Test form header',
    description: 'test description',
    inputs: [
        {
            type: 'text',
            name: 'x',
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
})

setTimeout(() => {
    // reactivity of form
    form.update((older) => ({...older, header: 'hello'}));
}, 2000)

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
