import {registerType} from "../../EpicFormService";
import TextWrite from "./TextWrite.svelte";
import TextRead from "./TextRead.svelte";

export const TextType = {
    type: 'text',
    write: TextWrite,
    read: TextRead,
}

registerType(TextType);