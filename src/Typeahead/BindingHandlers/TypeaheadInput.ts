
// #region Import Directives

/// <amd-dependency path="typeahead.js"/>

//import jquery = require("jquery");
import knockout = require("knockout");
//import bloodhound = require("bloodhound");

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
    }
};