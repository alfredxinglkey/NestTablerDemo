var iTableCounter = 1;
var oTable;
var oInnerTable;
var TableHtml;

function fnFormatDetails(table_id, html) {
    var sOut = "<table id=\"exampleTable_" + table_id + "\">";
    sOut += html;
    sOut += "</table>";
    return sOut;
}

//Run On HTML Build
$(document).ready(function () {
    TableHtml = $('#exampleTable_2').html();
    //Insert a 'details' column to the table
    var nCloneTh = document.createElement('th');
    var nCloneTd = document.createElement('td');

    $('#exampleTable thead tr').each(function () {
        this.insertBefore(nCloneTh, this.childNodes[0]);
    });

    //Initialse DataTables, with no sorting on the 'details' column
    var oTable = $('#exampleTable').dataTable({
        //'bJQueryUI': true,
        //'sPaginationType': 'full_numbers',
        'aoColumnDefs': [{
            'bSortable': false,
            'class': 'details-control',
            'aTargets': [0]
        }
        ],
        //'aaSorting': [[1, 'asc']],
        'paging':false,
        'info':false,
    });

    /* Add event listener for opening and closing details
     * Note that the indicator for showing which row is open is not controlled by DataTables,
     * rather it is done here
     */
    $('#exampleTable tbody tr td.details-control').on('click', function () {
        var nTr = $(this).closest('tr');

        if (oTable.fnIsOpen(nTr)) {

            oTable.fnClose(nTr);
        } else {
            oTable.fnOpen(nTr, fnFormatDetails(iTableCounter, TableHtml), 'details-control');
            oInnerTable = $('#exampleTable_' + iTableCounter).dataTable({
                'bJQueryUI': true,
                'sPaginationType': 'full_numbers',
                'paging': false,
                'searching':false,
                'info':false,
            });
            iTableCounter = iTableCounter + 1;
        }
    });


    // Handle click on "Collapse All" button
    $('#btn-hide-all-children').on('click', function () {
        // Enumerate all rows
        oTable.$('tr').each(function (index, nTr) {
            // If row has details expanded
            if (oTable.fnIsOpen(nTr)) {
                oTable.fnClose(nTr);
                $(nTr).removeClass('shown');
            }
        });
    });

    $('#btn-show-all-children').on('click', function () {
        // Enumerate all rows              
        oTable.$('tr').each(function (index, nTr) {
            // If row has details collapsed
            if (!oTable.fnIsOpen(nTr)) {
                /* Open this row */
                oTable.fnOpen(nTr, fnFormatDetails(iTableCounter, TableHtml), 'details-control');
                $(nTr).addClass('shown');
            }
        });
    });
});