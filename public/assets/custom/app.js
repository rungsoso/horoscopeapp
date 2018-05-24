/** custom function **/
if (!document.addEventListener) {
    alert("To use this web application you need to use another client. Please start IE9, Firefox >= 3.5, Google Chrome, Safari >= 4, or Opera >= 9 and visit this address again.");
    window.open('', '_self', '');
    window.close();
}

/**
Core script to handle the entire theme and core functions
**/
var MyApp = function () {

    // Handles Select2
    var handleSelect2 = function () {
        $('.m-select2').select2();
    }

    // Handles BootstrapSelect
    var handleBootstrapSelect = function () {
        // minimum setup
        $('.m_selectpicker').selectpicker();
    }

    // Handles Blockui
    var handleBlockui = function () {
        $('.block-ui').click(function () {
            mApp.blockPage({
                overlayColor: '#000000',
                state: 'primary'
            });

            setTimeout(function() {
                mApp.unblockPage();
            }, 2000);
        });
    }

    // Handles Datepicker
    var handleDatepicker = function () {
        $('.datepicker-th').datepicker({
            format: "dd/mm/yyyy",
            clearBtn: true,
            language: "th-th",
            autoclose: true,
            daysOfWeekDisabled: [0, 6]
        });
    }

    // Handles Bootbox
    var handleBootbox = function () {
        // Confirm action.
        $(document).on("click", "[data-toggle=\"confirm\"]", function (e) {
            e.preventDefault();
            var lHref = $(this).attr('href');
            var lText = this.attributes.getNamedItem("data-title") ? this.attributes.getNamedItem("data-title").value : "Are you sure?"; // If data-title is not set use default text
            bootbox.confirm(lText, function (confirmed) {
                if (confirmed) {
                    //window.location.replace(lHref); // similar behavior as an HTTP redirect (DOESN'T increment browser history)
                    window.location.href = lHref; // similar behavior as clicking on a link (Increments browser history)
                }
            });
        });
    }

    // Handles Tooltip
    var handleTooltip = function () {
        $('body').tooltip({ selector: '[data-toggle="m-tooltip"]' });
    }

    //* END:CORE HANDLERS *//

    return {

        //main function to initiate the theme
        init: function () {
            //IMPORTANT!!!: Do not modify the core handlers call order.

            //UI Component handlers     
            handleSelect2(); // Handles Select2
            handleBootstrapSelect(); // Handles BootstrapSelect
            handleBlockui(); // Handles Blockui
            handleDatepicker(); // Handles Datepicker
            handleBootbox(); // Handles Bootbox
            handleTooltip(); // Handles Tooltip
        }
    };

}();

$(document).ready(function () {
    MyApp.init(); // init metronic core componets
});