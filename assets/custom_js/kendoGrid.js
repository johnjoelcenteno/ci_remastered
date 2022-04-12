$(document).ready(function () {
    const processResp = (resp) => {
        resp = JSON.parse(resp);
        console.log(resp);
        let applicantListContainer = [];
        // find unique applicants 
        let uniqueApplicantElement = resp.filter(respElement => {
            let applicantIdRespElem = respElement.applicant_id;
            let plantillaItemNumberRespElem = respElement.plantilla_item_no;

            const pushedFilterObj = {
                applicant_id: applicantIdRespElem,
                plantilla_number: plantillaItemNumberRespElem
            };

            if (applicantListContainer.findIndex(x => x.applicant_id == applicantIdRespElem && x.plantilla_number == plantillaItemNumberRespElem) == -1) {
                applicantListContainer.push(pushedFilterObj);
                return respElement;
            }
        }); // filter loop completed

        return uniqueApplicantElement;
    }

    $('#grid').kendoGrid({
        toolbar: ['search'],
        sortable: true,
        pageable: true,
        editable: "popup",
        groupable: true,
        edit: function (e) {
            e.container.find(".k-edit-label:first").hide();
            e.container.find(".k-edit-field:first").hide();
        },
        columns: [{
            field: "employee_id",
            hidden: true
        },
        {
            field: 'applicant_fullname',
            title: 'Applicant Name'
        },
        {
            field: 'title_location',
            title: 'Position Details'
        },
        {
            command: [{
                name: "edit",
                text: {
                    edit: " "
                },
                template: "<a class='customEdit btn btn-success btn-round' title='Rate'><i class='material-icons'>edit</i></a>"
            },
            ],
            width: '10%',
        },
        ],

        dataSource: {
            pageSize: 5,
            group: [{ field: "title_location" }],
            transport: {
                read: {
                    url: `${baseUrl}`,
                    contentType: "json",
                    type: "GET"
                },
                parameterMap: function (data, type) {
                    return type != 'read' ? JSON.stringify(data) : null;
                },
            },

            schema: {
                data: () => [],
                total: () => 5,
                model: {
                    id: "rated_applicant_id",
                    fields: {
                        rated_applicant_id: {
                            editable: false,
                            nullable: true
                        },
                        applicant_fullname: {
                            type: "string",
                            validation: {
                                required: true,
                                min: 1
                            }
                        },
                        title_location: {
                            type: "string",
                            validation: {
                                required: true,
                                min: 1
                            }
                        },
                    }
                },
            },

            requestEnd: function (e) {
                type = e.type;
                if (type != "read") {
                    // $('#grid').data("kendoGrid").dataSource.read(e);

                    let title = type == 'update' ? "Employee updated successfully" : "Employee deleted successfully";
                    if (type == 'create') title = 'Employee created successfully';

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: title,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }

            }

        }
    });

    var grid = $("#grid").data("kendoGrid");

    $("#grid").on("click", ".customEdit", function () {
        var row = $(this).closest("tr");
        var data = grid.dataItem(row);
        const baseUrl = $('#baseUrl').val();
        let plantilla_no = data.plantilla_item_no;
        let applicant_id = data.applicant_id;

        location.replace(`${baseUrl}ComprehensiveEvaluationResults/addOtherScores?applicant_id=${applicant_id}&plantilla_no=${plantilla_no}`);
    })


}); // document ready end