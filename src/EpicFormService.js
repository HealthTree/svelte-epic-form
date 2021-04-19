export let typesMap = {};
export function registerType(typeDefinition) {
    typesMap[typeDefinition.type] = typeDefinition;
}

export function getNumberOfErrors(errors) {
    return Object.values(errors).filter(value => !!value).length;
}

const isInputValueInvalid = function (input, values) {
    const value = values[input.name];
    if(typeof typesMap[input.type].isValid === 'function') {
        return !typesMap[input.type].isValid(value);
    } else {
        return !value;
    }
}

export function shouldDisplayInput(inputs, input, values, mode) {
    let specificConditionKey;
    const parent = input["inheritConditionFrom"]
        ? inputs.find(q => q.name === input["inheritConditionFrom"])
        : null;

    if (mode === "read") {
        specificConditionKey = "displayConditionRead";
    } else if (mode === "write") {
        specificConditionKey = "displayConditionWrite";
    }
    const condition = input[specificConditionKey] || input["displayCondition"];

    try {
        let meetsOwnCondition;
        if(typeof condition === 'undefined') {
            meetsOwnCondition = true;
        }
        if(typeof condition === 'string') { //JS expression
            meetsOwnCondition = evaluateExpressionAgainstValues(values, condition);
        }
        if(typeof condition === 'function') { //JS function
            meetsOwnCondition = condition(values);
        }
        const meetsParentCondition = parent ? shouldDisplayInput(inputs, parent, values, mode) : true;
        return meetsOwnCondition && meetsParentCondition;
    } catch (e) {
        // console.error(e);
    }
}

export function getInputValidationError(inputs, input, values) {
    if (!shouldDisplayInput(inputs, input, values)) {
        return undefined;
    }
    if (input.required && isInputValueInvalid(input, values)) {
        return "Required.";
    }
    const value = values[input.name];
    if (input.validations) {
        for (let validation of input.validations) {
            try {
                if (validation.type === 'regexp' || validation.type === undefined) { //Default type
                    const regexp = new RegExp(validation.rule);
                    if (!regexp.test(value)) {
                        return validation.message;
                    }
                }

                if (validation.type === 'expression') {
                    if (!evaluateExpressionAgainstValues(values, validation.rule)) {
                        return validation.message;
                    }
                }

                if(validation.type === 'js') {
                    if(!validation.rule(values)) {
                        return validation.message;
                    }
                }
            } catch (e) {
                // console.log(e)
            }
        }
    }
}

export function evaluateExpressionAgainstValues(values, expression) {
    return new Function(
        ...Object.keys(values),
        "return " + expression
    )(...Object.values(values));
}

export function getFormValidationErrors(form, values) {
    const errors = {};
    form.inputs.forEach(input => {
        const error = getInputValidationError(
            form.inputs,
            input,
            values
        );
        errors[input.name] = error || null;
    });
    return errors;
}

export default {
    typesMap,
    registerType,
    getNumberOfErrors,
    shouldDisplayInput,
    getInputValidationError,
    evaluateExpressionAgainstValues,
    getFormValidationErrors
}
