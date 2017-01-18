
// #region Import Directives

/// <amd-dependency path="typeahead.js"/>
/// <amd-dependency path="bloodhound"/>

import jquery = require("jquery");
import knockout = require("knockout");

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
    init: (element: any, valueAccessor: () => any, allBindingsAccessor: KnockoutAllBindingsAccessor) => {

        // Prevents the input from which the typeahead is created from autocompleting itself
        var typeaheadInput = jquery(element);
        typeaheadInput.attr("autocomplete", "off")

        // Gets the options for the typeahead input
        var highlight: boolean | undefined = allBindingsAccessor.get("highlight");
        var hint: boolean | undefined = allBindingsAccessor.get("hint");
        var minLength: number | undefined = allBindingsAccessor.get("minLength");
        var classNames: Twitter.Typeahead.ClassNames | undefined = allBindingsAccessor.get("classNames");

        // Gets the options for the typeahead dataset
        var async: boolean | undefined = allBindingsAccessor.get("async");
        var name: string | undefined = allBindingsAccessor.get("name");
        var limit: number | undefined = allBindingsAccessor.get("limit");
        var display: string | ((obj: any) => string) | undefined = allBindingsAccessor.get("display");

        // Gets the suggestion source for the typeahead dataset
        var source: Bloodhound<any> | ((query: string, syncResults: (result: any[]) => void, asyncResults?: (result: any[]) => void) => void) = knockout.unwrap(allBindingsAccessor.get("source"));

        // Initializes the typeahead input
        typeaheadInput.typeahead<string>({
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
        typeaheadInput.on("typeahead:select", (event: JQueryEventObject, suggestion: any) => {

            // Updates the value to which the typeahead input was bound
            var value: KnockoutObservable<any> = valueAccessor();
            value(suggestion);
        });
    },

    /**
     * Is called once initially when the binding is applied to the input which is bound using typeahead binding handler. When any of these dependencies change, the update callback will be called once again. Updates the value of the typeahead input.
     * @param {any} element The DOM element involved in this binding. Should be a text input.
     * @param {() => any} valueAccessor A JavaScript function that you can call to get the current model property that is involved in this binding.
     * @param {KnockoutAllBindingsAccessor} allBindingsAccessor A JavaScript object that you can use to access all the model values bound to this DOM element.
     */
    update: (element: any, valueAccessor: () => any, allBindingsAccessor: KnockoutAllBindingsAccessor) => {
        
        // Sets the value of the typeahead input to the new value of the binding
        var currentValue: any = knockout.unwrap(valueAccessor());
        jquery(element).typeahead("val", currentValue);
    }
};