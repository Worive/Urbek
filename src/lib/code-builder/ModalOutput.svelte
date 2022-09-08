<script lang="ts">
    import categories from '../../assets/data/codeBUilderData.json'

    export let buildingList;

    type FieldType = {
        fancyName: string,
        name: string,
        type: string,
        item: {
            type: string,
            placeHolder: string
        },
        wikiPage: string,
        display: {
            col: number
        },
        required: boolean,
        selectOptions: [
            {
                value: string,
                name: string
            }
        ]
    };

    type Model = {
        name: string,
        sizeX: number,
        sizeY: number,
        default: boolean,
        SI: boolean,
        E: boolean,
        DE: boolean,
        A: boolean,
        DA: boolean
    }

    let ouputObj

    let fields = new Map<string, FieldType>;

    for (const category of categories['categories']) {
        for (const subCategory of category['subCategories']) {
            for (const field of subCategory['fields']) {
                fields.set(field.name, field)
            }
        }
    }

    function getModel(model : Model): string[] {
        let models = []
        let prefix = `${model.name},${model.sizeX},${model.sizeY}`

        if (model.DA) {
            models.push(`${prefix},DA`)
        }

        if (model.DE) {
            models.push(`${prefix},DE`)
        }

        if (model.A) {
            models.push(`${prefix},A`)
        }

        if (model.E) {
            models.push(`${prefix},E`)
        }

        if (model.SI) {
            models.push(`${prefix},SI`)
        }

        if (model.default) {
            models.push(`${prefix}`)
        }

        return models
    }

    export const generate = () => {
        ouputObj = {
            construs: []
        }

        for (const building of buildingList) {
            let obj = {}

            for (const field in building.fields) {
                const fieldValue = building.fields[field]
                if (fieldValue === undefined) continue
                const fieldConfig = fields.get(field)

                if (fieldConfig.type === 'list') {
                    obj[field] = []
                    for (const listItem of fieldValue) {
                        obj[field].push(listItem.value)
                    }

                } else if (field === 'models') {
                    let models : Model[] = fieldValue

                    obj[field] = []
                    for (const model of models) {
                        obj[field].push(...getModel(model))
                    }

                } else {
                    obj[field] = fieldValue
                }
            }

            ouputObj.construs.push(obj)
        }

        return ouputObj

    }



    function downloadFile() {
        let file = new File([JSON.stringify(ouputObj, null, 4)], 'newBuilding.txt', {
            type: 'text/plain',
        })

        const link = document.createElement('a')
        const url = URL.createObjectURL(file)

        link.href = url
        link.download = file.name
        document.body.appendChild(link)
        link.click()

        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
    }
</script>

<div aria-hidden="true" aria-labelledby="exampleModalLabel" class="modal fade" id="exampleModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Generated Code</h5>
                <button aria-label="Close" class="btn-close" data-bs-dismiss="modal" type="button"></button>
            </div>
            <div class="modal-body">
                <div class="col-md-12 code p-4">
                <pre>
                    <code id="output">
                        {'\n' + JSON.stringify(ouputObj, null, 4)}
                    </code>
                </pre>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" data-bs-dismiss="modal" type="button">Close</button>
                <button class="btn btn-primary" type="button" on:click={downloadFile}>Download</button>
            </div>
        </div>
    </div>
</div>