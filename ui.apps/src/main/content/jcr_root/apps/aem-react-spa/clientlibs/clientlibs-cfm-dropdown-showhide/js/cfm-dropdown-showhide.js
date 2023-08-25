(function(document, $) {
    $(document).on("foundation-contentloaded", function(e) {
        Coral.commons.ready(function() {
            showHideHandler($(".cfm-dialog-dropdown-showhide", e.target))
        })
    });
    $(document).on("selected", ".cfm-dialog-dropdown-showhide", function(e) {
        showHideHandler($(this))
    });
    function showHideHandler(el) {
        el.each(function(i, element) {
            if ($(element).is("coral-select"))
                Coral.commons.ready(element, function(component) {
                    showHide(component, element);
                    component.on("change", function() {
                        showHide(component, element)
                    })
                });
            else {
                var component =
                    $(element).data("select");
                if (component)
                    showHide(component, element)
            }
        })
    }
    function showHide(component, element) {
        var target = $(element).data("cfmDialogDropdownShowhideTarget");

        // Hide your tab here
    }


})(document, Granite.$);