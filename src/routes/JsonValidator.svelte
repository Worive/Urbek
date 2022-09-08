<script lang="ts">
    import {debug} from "svelte/internal";
    import rules from '../assets/jsonRules.json'

    let files;
    let fileName = ''

    let listErrors = []

    let listWarns = []

    $: listAreEmpty = listErrors.length === 0 && listWarns.length === 0

    $: if (files && files[0]) {
        fileName = files[0].name
        asyncReadFile(files[0])
    }

    async function asyncReadFile(file) {
        try {
            const reader = new FileReader();
            reader.readAsText(file, "UTF-8");

            reader.onload = (event) => {
                if (typeof event.target.result === "string") {
                    validate(JSON.parse(event.target.result))
                }
            }
        } catch (err) {
            console.log(err);
            return 'Something went wrong'
        }
    }

    function validate(jsonObj: object) {
        if (jsonObj['construs'] === undefined || jsonObj['construs'] === null) {
            return 'Missing Construs:'
        }

        for (let i = 0; i < jsonObj['construs'].length; i++) {
            const attribute = jsonObj['construs'][i]

            try {
                isAttributeValide(attribute, 'construsObject', [])
            } catch (err) {
                logError(`[Building ${i}# - ${jsonObj['construs'][i]['codeName']}] [${err.parent.join(' -> ')}] ${err.description}`)
            }

        }
    }

    function isAttributeValide(attribute, attributeName: string, parentList: string[]) {
        const subParentList = [...parentList]
        subParentList.push(attributeName)
        const attributeRules = rules[attributeName]

        if (attributeRules === undefined) {
            switch (attributeName) {
                case 'string':
                    if (typeof attribute !== 'string') {
                        throw {
                            parent: parentList,
                            description: `The attribute '${attributeName}' is not a string, found a ${typeof attribute} instead : ${attribute}`
                        }
                    }
                    return;
                case 'number':
                    if (typeof attribute !== 'number') {
                        throw {
                            parent: parentList,
                            description: `The attribute '${attributeName}' is not a number, found a ${typeof attribute} instead : ${attribute}`
                        }
                    }
                    return;
                default:
                    throw {parent: parentList, description: 'Unknown attribute: ' + attributeName}
            }
        }

        if (attribute instanceof Object && !Array.isArray(attribute)) {
            if (attributeRules['isObject'] === undefined) {
                console.error(`Attribute '${attributeName}' shouldn\'t be an object: `)
                console.error(attribute)
                return;
            }

            for (const attributeKey in attribute) {
                if (!attributeRules['contains'].some(item => item.name === attributeKey)) {

                    if (subParentList[1] !== 'unblock' && subParentList[1] !== 'preunblock') {
                        logWarn(`[WARN] [${subParentList.join(' -> ')}] Unknown attribute defined: ${attributeKey}`)
                    }
                }
            }

            for (let i = 0; i < attributeRules['contains'].length; i++) {
                const attributeKeyRules = attributeRules['contains'][i]

                let found = false
                for (const attributeKey in attribute) {
                    const attributeValue = attribute[attributeKey]

                    if (attributeKeyRules.name === attributeKey) {
                        found = true
                        try {
                            isAttributeValide(attributeValue, attributeKey, subParentList)
                        } catch (err) {
                            logError(`[ERROR] [${err.parent.join(' -> ')}] ${err.description}`)
                        }
                    }
                }

                if (!found && attributeKeyRules.required) {

                    if (attributeKeyRules.notRequiredIf !== undefined) {
                        if (attribute.hasOwnProperty(attributeKeyRules.notRequiredIf)) {
                            continue
                        }
                    }

                    if (subParentList[1] !== 'unblock' && subParentList[1] !== 'preunblock') {
                        throw {parent: parentList, description: 'Missing required attribute: ' + attributeKeyRules.name}
                    }


                }

                if (found && attributeKeyRules.need !== undefined) {
                    switch (attributeKeyRules.need.type) {
                        case 'OR':
                            for (let j = 0; j < attributeKeyRules.need.value.length; j++) {
                                if (attribute.hasOwnProperty(attributeKeyRules.need.value[j])) {
                                    return;
                                }
                            }

                            throw {
                                parent: parentList,
                                description: 'Missing needed (OR) attribute(s) for ' + attributeKeyRules.name + ': ' + attributeKeyRules.need.value
                            }
                        case 'AND':
                            for (let j = 0; j < attributeKeyRules.need.value.length; j++) {
                                if (!attribute.hasOwnProperty(attributeKeyRules.need.value[j])) {
                                    throw {
                                        parent: parentList,
                                        description: 'Missing mandatory attribute(s) for ' + attributeKeyRules.name + ': ' + attributeKeyRules.need.value
                                    }
                                }
                            }
                            break
                        default:
                            console.error('Unknown attribute need type:' + attributeKeyRules.need.type)
                    }
                }
            }

        } else {
            switch (attributeRules.value) {
                case 'boolean':
                    if (typeof attribute !== 'Boolean') {
                        break
                    }
                    throw {parent: parentList, description: 'Invalid boolean value: ' + typeof attribute}
                case 'string':
                    if (typeof attribute === 'string') {
                        if (attributeRules.regex !== undefined) {
                            const regex = new RegExp('^' + attributeRules.regex + '$', 'gm')

                            if (!regex.test(attribute)) {
                                throw {
                                    parent: parentList,
                                    description: 'Invalid string format for ' + attributeName + ': ' + attribute
                                }
                            }

                        }

                        if (attributeRules.select !== undefined) {
                            const possibleValues = attributeRules.select

                            if (!possibleValues.includes(attribute)) {
                                throw {
                                    parent: parentList,
                                    description: `Invalid string value for ${attributeName} (select), found instead: '${attribute}'`
                                }
                            }
                        }

                        break
                    }
                    throw {
                        parent: parentList,
                        description: `The attribute '${attributeName}' is not a string, found a ${typeof attribute} instead : ${attribute}`
                    }
                case 'float':
                case 'number':
                    if (typeof attribute === 'number') {
                        if (attributeRules.max !== undefined) {
                            if (attribute > attributeRules.max) {
                                throw {
                                    parent: parentList,
                                    description: 'Number above the maximum value of ' + attributeRules.max + ': ' + attribute
                                }
                            }
                        }
                        if (attributeRules.min !== undefined) {
                            if (attribute < attributeRules.min) {
                                throw {
                                    parent: parentList,
                                    description: 'Number above the minimum value of ' + attributeRules.min + ': ' + attribute
                                }
                            }
                        }
                    } else {
                        throw {parent: parentList, description: 'Invalid number value: ' + typeof attribute}
                    }
                    break

                case 'list':
                    if (Array.isArray(attribute)) {
                        const types = attributeRules.listType

                        for (let i = 0; i < attribute.length; i++) {
                            const attributeListElement = attribute[i]

                            let found = false
                            for (let j = 0; j < types.length; j++) {
                                const type = types[j]

                                try {
                                    isAttributeValide(attributeListElement, type, subParentList)

                                    found = true
                                } catch (err) {
                                    if (!found) {
                                        throw err
                                    }
                                }

                            }

                            if (!found) {
                                console.error(attributeListElement)
                                throw {parent: parentList, description: 'Unknown value in list ' + attributeName + ': '}

                            }
                        }
                    }
                    break
                default:
                    throw {parent: parentList, description: `Unknown Type: ${attributeRules.value}`}
            }
        }
    }

    function logError(message: string) {
        if (message === undefined) return
        listErrors.push(message)
        listErrors = listErrors
    }

    function logWarn(message: string) {
        if (message === undefined) return

        listWarns.push(message)
        listWarns = listWarns
    }
</script>
<div class="container col-6 mt-3 mx-auto w-100 text-start">
    <div class="px-4 py-5 my-5 text-center">
        <img alt="" class="d-block mx-auto mb-4" height="100"
             src="/urbek/icons/urbekLogo.png">
        <h1 class="display-5 fw-bold">JSON Validator</h1>
        <div class="col-lg-6 mx-auto">
            <p class="lead mb-4">Will verify your urbek json file is correct, from the naming of resources to the format
                of models.</p>
        </div>
    </div>
    <div class="col-5 mx-auto">
        <input accept='text/plain,.json' class="form-control" bind:files={files} type="file">
    </div>
    <h4 id="output-file">{fileName}</h4>
    <div class="col-8 mx-auto my-3" id="output">
        {#if listAreEmpty && fileName !== ''}
            <div class="alert alert-success" role="alert">
                <h4 class="alert-heading">Well done!</h4>
                <p>No error has been found!</p>
            </div>
        {/if}

        {#each listWarns as warn}
            <div class="alert alert-warning" role="alert">{warn}</div>
        {/each}

        {#each listErrors as error}
            <div class="alert alert-danger" role="alert">{error}</div>
        {/each}
    </div>
</div>