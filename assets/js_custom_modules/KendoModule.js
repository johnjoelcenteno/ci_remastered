class CustomKendoGrid {
    titles = [];
    fields = [];
    #columns = [];
    #gridId = "";
    #dataSource = {};
    #kendoGridObj = {};
    #hasActionButtons = false;

    toBeUsedData = []; // if read request endpoint is empty this will be used

    constructor(gridId) {
        this.#gridId = `#${gridId}`;
    }


    #IsTitlesAndFieldsValid() {
        return this.titles.length == 0 || this.fields.length == 0;
    }

    AddActionButtons() {
        if (!this.#IsTitlesAndFieldsValid) throw ("Invalid titles and fieldss");

        this.#columns.push(
            {
                title: "Actions",
                command: [{
                    name: "edit",
                    text: {
                        edit: " "
                    },
                    template: "<a class='customEdit btn btn-success btn-round' title='Rate'><i class='material-icons'>edit</i></a>"
                },
                ],
                width: '10%',
            }
        );

        this.#hasActionButtons = true;
    }

    #GenerateColumns() {
        if (this.titles.length != this.fields.length) throw "titles and length not equal lengths";

        for (let index = 0; index < this.titles.length; index++) {
            const title = this.titles[index];
            const field = this.fields[index];

            const columnObjStructure = { title, field };
            this.#columns.push(columnObjStructure);
        }
    }

    GenerateDataSource(readEndPoint = "", groupByFields = [], editEndpoint = "") {
        // groupByFields is = string[]
        this.#GenerateColumns();

        this.#dataSource = {
            pageSize: 10
        };

        // if you want a local data to be used. use CustomKendoGrid.toBeUsedData
        if (readEndPoint != "") {
            if (this.#hasActionButtons)
                if (editEndpoint == "") throw "editEndPoint not initialized";

            this.#dataSource.transport = {
                read: {
                    url: `${baseUrl}${readEndPoint}`,
                    contentType: "json",
                    type: "GET"
                }
            };

            this.#dataSource.schema = {
                data: (resp) => JSON.parse(resp),
                total: (resp) => JSON.parse(resp).length
            };

            $(this.#gridId).on("click", ".customEdit", function () {
                var row = $(this).closest("tr");
                var data = grid.dataItem(row);



                location.replace(`${baseUrl}${editEndpoint}?id=${data.id}`);
            })

        } else {
            if (this.toBeUsedData.length == 0) throw "readEndPoint is empty. toBeUsedData property could not be null";

            this.#dataSource.schema = {
                data: () => this.toBeUsedData,
                total: () => this.toBeUsedData.length
            }
        }

        // if you need to group fields specify the fields(string) to be grouped
        if (groupByFields.length != 0) {
            const groupObjects = group.map(x => {
                return { field: x }
            });

            this.#dataSource.group = groupObjects;
        }

        this.#dataSource.requestEnd = (resp) => { // triggered when deleting
            const { type } = resp;

            if (type != "read") {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: "Deleted Successfully",
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }
    }

    GenerateKendoGridObj(
        toolbar = [],
        sortable = false,
        groupable = false
    ) {
        if (Object.keys(this.#dataSource).length === 0) throw "dataSource property not initialized";

        this.#kendoGridObj = {
            toolbar,
            sortable,
            groupable,
            columns: this.#columns,
            dataSource: this.#dataSource,
        }

    }


    RenderGrid() {
        if (Object.keys(this.#dataSource).length === 0) throw "dataSource property not initialized";
        if (Object.keys(this.#kendoGridObj).length === 0) throw "kendoGridObj property not initialized";

        const gridDivElement = document.getElementById(this.#gridId);
        $(this.#gridId).kendoGrid(this.#kendoGridObj);
    }

}