// #region Import Directives
define(["require", "exports", "jquery", "knockout", "typeahead", "bloodhound"], function (require, exports, jquery, knockout) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
            // Retrieves the options from the parameter of the binding
            var options = knockout.utils.unwrapObservable(valueAccessor());
            // Prevents the input from which the typeahead is created from autocompleting itself
            var typeaheadInput = jquery(element);
            typeaheadInput.attr("autocomplete", "off");
            // Initializes the typeahead input
            typeaheadInput.typeahead({
                highlight: options.highlight,
                hint: options.hint,
                minLength: options.minLength,
                classNames: options.classNames
            }, [{
                    source: options.source,
                    async: options.async,
                    name: options.name,
                    limit: options.limit || 9999,
                    display: options.display,
                    templates: options.templates
                }]);
            // Signs up for the open event and sets the Typeahead query to the current value of the textbox, this is needed, because otherwise Typeahead clears the value upon blur
            typeaheadInput.on("typeahead:open", function () {
                typeaheadInput.typeahead("val", typeaheadInput.val());
            });
            // Triggers the change event
            typeaheadInput.on("typeahead:autocomplete", function () {
                typeaheadInput.change();
            });
            typeaheadInput.on("typeahead:cursorchange", function () {
                typeaheadInput.change();
            });
            // Subscribes to the select event of the typeahead input, which is called, when the user selects a suggestion
            typeaheadInput.on("typeahead:select", function (event, suggestion) {
                typeaheadInput.change();
                // Updates the value to which the typeahead input was bound
                if (!!options.value) {
                    options.value(suggestion);
                }
                if (!!options.change) {
                    options.change(suggestion);
                }
            });
        },
        /**
         * Is called once initially when the binding is applied to the input which is bound using typeahead binding handler. When any of these dependencies change, the update callback will be called once again. Updates the value of the typeahead input.
         * @param {any} element The DOM element involved in this binding. Should be a text input.
         * @param {() => any} valueAccessor A JavaScript function that you can call to get the current model property that is involved in this binding.
         * @param {KnockoutAllBindingsAccessor} allBindingsAccessor A JavaScript object that you can use to access all the model values bound to this DOM element.
         */
        update: function (element, valueAccessor, allBindingsAccessor) {
            // Retrieves the options from the parameter of the binding
            var options = knockout.utils.unwrapObservable(valueAccessor());
            // Checks whether the binding is updated
            if (!!options.value) {
                // Retrieves the display name based on the display option (which can either be a function that retrieves the name or a path string)
                var currentValue = options.value();
                if (typeof (options.display) === "string") {
                    for (var part in options.display.split(".")) {
                        currentValue = currentValue[part];
                    }
                }
                else {
                    currentValue = options.display(currentValue);
                }
                // Sets the value of the typeahead input to the new value of the binding
                jquery(element).typeahead("val", currentValue);
            }
        }
    };
});
