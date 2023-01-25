import { WeatherForecastSummary } from './WeatherForecastSummary.js';

/** Weather forecast class definition */
export class WeatherForecast {

    // private values
    /** @type {Date} */ #Date;
    /** @type {number} */ #TemperatureC;
    /** @type {number} */ #TemperatureF;
    /** @type {WeatherForecastSummary} */ #Summary;

    /** Weather forecast class definition */
    constructor() {
        this.#Date = new Date();
        this.#TemperatureC = 0;
        this.#TemperatureF = 32;
        this.#Summary = WeatherForecastSummary.Cool;
    }

    /**
    * Forecast date time
    * Server type 'DateTime'
    * @type {Date}
    */
    get Date() {
        return this.#Date;
    }
    set Date(val) {
        if (val instanceof Date) {
            this.#Date = val;
        }
    }

    /**
    * Server type 'int' custom range -50 ...  100
    * @type {number}
    */
    get TemperatureC() {
        return this.#TemperatureC;
    }
    set TemperatureC(val) {
        if (typeof val === 'number') {
            this.#TemperatureC = (val < -50 ? -50 : (val >  100 ?  100 : Math.round(val)))
        }
    }

    /**
    * Server type 'int' custom range -58 ...  212
    * @type {number}
    */
    get TemperatureF() {
        return this.#TemperatureF;
    }
    set TemperatureF(val) {
        if (typeof val === 'number') {
            this.#TemperatureF = (val < -58 ? -58 : (val >  212 ?  212 : Math.round(val)))
        }
    }

    /**
    * Forecast summary enum value
    * Server type enum 'WeatherForecastSummary' values [0,1,2,3,4,5,6,7,8,9]
    * @type {WeatherForecastSummary}
    */
    get Summary() {
        return this.#Summary;
    }
    set Summary(val) {
        if ([0,1,2,3,4,5,6,7,8,9].includes(val)) {
            this.#Summary = val;
        }
    }

    /** WeatherForecast JSON serializer. Called automatically by JSON.stringify(). */
    toJSON() {
        return {
            'Date': this.#Date,
            'TemperatureC': this.#TemperatureC,
            'TemperatureF': this.#TemperatureF,
            'Summary': this.#Summary
        }
    }

    /**
    * Deserializes json to instance of WeatherForecast.
    * @param {string} json json serialized WeatherForecast instance
    * @returns {WeatherForecast} deserialized WeatherForecast class instance
    */
    static fromJSON(json) {
        let o = JSON.parse(json);
        return WeatherForecast.fromObject(o);
    }

    /**
    * Maps object to instance of WeatherForecast.
    * @param {object} o object to map instance of WeatherForecast from
    * @returns {WeatherForecast} mapped WeatherForecast class instance
    */
    static fromObject(o) {
        if (o != null) {
            let val = new WeatherForecast();
            if (o.hasOwnProperty('Date')) { val.Date = new Date(o.Date); }
            if (o.hasOwnProperty('TemperatureC')) { val.TemperatureC = o.TemperatureC; }
            if (o.hasOwnProperty('TemperatureF')) { val.TemperatureF = o.TemperatureF; }
            if (o.hasOwnProperty('Summary')) { val.Summary = o.Summary; }
            return val;
        }
        return null;
    }

    /**
    * Deserializes json to array of WeatherForecast.
    * @param {string} json json serialized WeatherForecast array
    * @returns {WeatherForecast[]} deserialized WeatherForecast array
    */
    static fromJSONArray(json) {
        let arr = JSON.parse(json);
        return WeatherForecast.fromObjectArray(arr);
    }

    /**
    * Maps array of objects to array of WeatherForecast.
    * @param {object[]} arr object array to map WeatherForecast array from
    * @returns {WeatherForecast[]} mapped WeatherForecast array
    */
    static fromObjectArray(arr) {
        if (arr != null) {
            let /** @type {WeatherForecast[]} */ val = [];
            arr.forEach(function (f) { val.push(WeatherForecast.fromObject(f)); });
            return val;
        }
        return null;
    }

}
