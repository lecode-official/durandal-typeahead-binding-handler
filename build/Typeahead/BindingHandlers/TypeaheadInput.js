// #region Import Directives
define(["require", "exports", "jquery", "knockout", "typeahead", "bloodhound"], function (require, exports, jquery, knockout) {
    "use strict";
    // #endregion
    /**
     * Represents a binding handler for using Twitter typeahead.js and the Bloodhound suggestion engine.
     */
    knockout.bindingHandlers["typeahead"] = {
        /**
         * Initializes the typeahead.js and Bloodhound bindings for the input that this binding is used on.
         * @param {any} element The DOM element involved in this binding. Should be a text input.
         * @param {() => any} valueAccessor A JavaScript function that you can call to get the current model property that is involved in this binding.
         * @param {KnockoutAllBindingsAccessor} allBindingsAccessor A JavaScript object that you can use to access all the model values bound to this DOM element.
         */
        init: function (element, valueAccessor, allBindingsAccessor) {
            // Prevents the input from which the typeahead is created from autocompleting itself
            var typeaheadInput = jquery(element);
            typeaheadInput.attr("autocomplete", "off");
            // Gets the options for the typeahead input
            var highlight = allBindingsAccessor.get("highlight");
            var hint = allBindingsAccessor.get("hint");
            var minLength = allBindingsAccessor.get("minLength");
            var classNames = allBindingsAccessor.get("classNames");
            // Gets the options for the typeahead dataset
            var async = allBindingsAccessor.get("async");
            var name = allBindingsAccessor.get("name");
            var limit = allBindingsAccessor.get("limit");
            var display = allBindingsAccessor.get("display");
            // Gets the suggestion source for the typeahead dataset
            var source = knockout.unwrap(allBindingsAccessor.get("source"));
            // Initializes the typeahead input
            typeaheadInput.typeahead({
                highlight: highlight,
                hint: hint,
                minLength: minLength,
                classNames: classNames
            }, [{
                    source: source,
                    async: async,
                    name: name,
                    limit: limit,
                    display: display
                }]);
            // Subscribes to the select event of the typeahead input, which is called, when the user selects a suggestion
            typeaheadInput.on("typeahead:select", function (event, suggestion) {
                // Updates the value to which the typeahead input was bound
                var value = valueAccessor();
                value(suggestion);
            });
        },
        /**
         * Is called once initially when the binding is applied to the input which is bound using typeahead binding handler. When any of these dependencies change, the update callback will be called once again. Updates the value of the typeahead input.
         * @param {any} element The DOM element involved in this binding. Should be a text input.
         * @param {() => any} valueAccessor A JavaScript function that you can call to get the current model property that is involved in this binding.
         * @param {KnockoutAllBindingsAccessor} allBindingsAccessor A JavaScript object that you can use to access all the model values bound to this DOM element.
         */
        update: function (element, valueAccessor, allBindingsAccessor) {
            // Sets the value of the typeahead input to the new value of the binding
            var currentValue = knockout.unwrap(valueAccessor());
            jquery(element).typeahead("val", currentValue);
        }
    };
});
