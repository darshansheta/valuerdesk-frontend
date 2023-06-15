var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function mergeData() {
        var mergeTarget = {}, i = arguments.length, prop, event;
        // Allow for variadic argument length.
        while (i--) {
            // Iterate through the data properties and execute merge strategies
            // Object.keys eliminates need for hasOwnProperty call
            for (var _i = 0, _a = Object.keys(arguments[i]); _i < _a.length; _i++) {
                prop = _a[_i];
                switch (prop) {
                    // Array merge strategy (array concatenation)
                    case "class":
                    case "style":
                    case "directives":
                        if (!Array.isArray(mergeTarget[prop])) {
                            mergeTarget[prop] = [];
                        }
                        // Repackaging in an array allows Vue runtime
                        // to merge class/style bindings regardless of type.
                        mergeTarget[prop] = mergeTarget[prop].concat(arguments[i][prop]);
                        break;
                    // Space delimited string concatenation strategy
                    case "staticClass":
                        if (!arguments[i][prop]) {
                            break;
                        }
                        if (mergeTarget[prop] === undefined) {
                            mergeTarget[prop] = "";
                        }
                        if (mergeTarget[prop]) {
                            // Not an empty string, so concatenate
                            mergeTarget[prop] += " ";
                        }
                        mergeTarget[prop] += arguments[i][prop].trim();
                        break;
                    // Object, the properties of which to merge via array merge strategy (array concatenation).
                    // Callback merge strategy merges callbacks to the beginning of the array,
                    // so that the last defined callback will be invoked first.
                    // This is done since to mimic how Object.assign merging
                    // uses the last given value to assign.
                    case "on":
                    case "nativeOn":
                        if (!mergeTarget[prop]) {
                            mergeTarget[prop] = {};
                        }
                        for (var _b = 0, _c = Object.keys(arguments[i][prop] || {}); _b < _c.length; _b++) {
                            event = _c[_b];
                            // Concat function to array of functions if callback present.
                            if (mergeTarget[prop][event]) {
                                // Insert current iteration data in beginning of merged array.
                                mergeTarget[prop][event] = [].concat(mergeTarget[prop][event], arguments[i][prop][event]);
                            }
                            else {
                                // Straight assign.
                                mergeTarget[prop][event] = arguments[i][prop][event];
                            }
                        }
                        break;
                    // Object merge strategy
                    case "attrs":
                    case "props":
                    case "domProps":
                    case "scopedSlots":
                    case "staticStyle":
                    case "hook":
                    case "transition":
                        if (!mergeTarget[prop]) {
                            mergeTarget[prop] = {};
                        }
                        mergeTarget[prop] = __assign({}, arguments[i][prop], mergeTarget[prop]);
                        break;
                    // Reassignment strategy (no merge)
                    case "slot":
                    case "key":
                    case "ref":
                    case "tag":
                    case "show":
                    case "keepAlive":
                    default:
                        if (!mergeTarget[prop]) {
                            mergeTarget[prop] = arguments[i][prop];
                        }
                }
            }
        }
        return mergeTarget;
    }
    exports.mergeData = mergeData;
});
console.log(232342342423)