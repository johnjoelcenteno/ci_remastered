# Kendo Grid Class Implementation
Made with **LOVE** by **Joel John Centeno**


### Needed dependencies

    <script src="<?= base_url() ?>assets/jquery/dist/jquery.min.js"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <link rel="stylesheet" href="<?= base_url() ?>assets/kendo/styles/kendo.common-material.min.css" />
    <link rel="stylesheet" href="<?= base_url() ?>assets/kendo/styles/kendo.custom.min.css" />
    <link rel="stylesheet" href="<?= base_url() ?>assets/kendo/styles/kendo.material.mobile.min.css" />
    <script defer src="<?= base_url() ?>assets/kendo/js/kendo.all.min.js"></script>
    <script defer src="<?= base_url() ?>assets/kendo/js/jszip.min.js"></script>




**Important note!**
You must use $(document).ready(); before implementing it


### Implementing local data to grid

    $(document).ready(function () { 
        const gridIdSelector = "grid";
        const localData = [
            {
                firstname: "Joel John",
                middlename: "Deguzman",
                lastname: "Centeno"
            }
        ];
    
        const customKendoGrid = new CustomKendoGrid(gridIdSelector);
        customKendoGrid.titles = ["First Name", "Middle Name", "Last Name"];
        customKendoGrid.fields = ["firstname", "middlename", "lastname"];
        customKendoGrid.toBeUsedData = localData;
        customKendoGrid.GenerateDataSource();
        customKendoGrid.GenerateKendoGridObj(["search"]);
        customKendoGrid.RenderGrid();
    });



### Implementing with an endpoint for data source

    $(document).ready(function () {
        const customKendoGrid = new CustomKendoGrid('grid');
        customKendoGrid.titles = ["First Name", "Middle Name", "Last Name"];
        customKendoGrid.fields = ["firstname", "middlename", "lastname"];
        customKendoGrid.GenerateDataSource("Accounts/GetAllUsers");
        customKendoGrid.GenerateKendoGridObj(["search"]);
        customKendoGrid.RenderGrid();
    });


