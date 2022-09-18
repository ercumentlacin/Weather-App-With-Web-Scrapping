"use strict";
exports.__esModule = true;
exports.Weather = void 0;
var Weather = /** @class */ (function () {
    function Weather(_a) {
        var date = _a.date, day = _a.day, imgSrc = _a.imgSrc, description = _a.description, degrees = _a.degrees;
        this.date = date;
        this.day = day;
        this.imgSrc = imgSrc;
        this.description = description;
        this.degrees = degrees;
    }
    return Weather;
}());
exports.Weather = Weather;
