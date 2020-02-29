var ResultClass = /** @class */ (function () {
    function ResultClass(result) {
        this.result = result;
    }
    ResultClass.value = function (value) {
        return new ResultClass({
            type: "value",
            value: value
        });
    };
    ResultClass.error = function (error) {
        return new ResultClass({
            type: "errorr",
            error: error
        });
    };
    ResultClass.prototype.unwrap = function () {
        switch (this.result.type) {
            case "value":
                return this.result.value;
            case "errorr":
                throw this.result.error;
        }
    };
    ResultClass.prototype.map = function (f) {
        switch (this.result.type) {
            case "value":
                return new ResultClass({
                    type: "value",
                    value: f(this.result.value)
                });
            case "errorr":
                return new ResultClass(this.result);
        }
    };
    ResultClass.prototype.valueOrDefault = function (d) {
        switch (this.result.type) {
            case "value":
                return this.result.value;
            case "errorr":
                return d;
        }
    };
    return ResultClass;
}());
/**
 *
 * TEST FUNCTION
 * https://roll20.net/compendium/dnd5e/Dwarf#content
 * @param {Number} height
 * @returns {ResultClass<Number, Error>}
 */
function areYouADwarf(height) {
    if (height > 150) {
        return ResultClass.value(height);
    }
    return ResultClass.error(new Error("Yes, you are a dwarf😏"));
}
var result = areYouADwarf(180).unwrap();
console.log("result", result);
