"use strict";

import { html, Component } from '../lib/htm/preact/standalone.module.js';
import { WeatherForecast } from './Shared/WeatherForecast.js';

var feelsLike = ["Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"];

/**
 * @typedef {Object} FetchDataState FetchData component state structure
 * @property {WeatherForecast[]} forecasts array of WeatherForecast class instances
 * @property {boolean} loading true = values still loading from server, false = values has been loaded from server
 */

export class FetchData extends Component {

    constructor(props) {
        super(props);
        /** @type{FetchDataState} */ this.state = { forecasts: [], loading: true };
    }

    componentDidMount() {
        this.populateWeatherData();
    }

    async populateWeatherData() {
        const response = await fetch('api/weatherforecast');
        const json = await response.json();         
        this.state.forecasts = WeatherForecast.fromJSONArray(json);        
        this.state.loading = false;
        this.forceUpdate();
    }

    render() {
        if (this.state.loading) {
            return html`<p><em>Loading...</em></p>`;
        }
        else {
            return html`
<div>
    <h1>Weather forecast</h1>
    <p>This component demonstrates fetching data from the server.</p>
    <table class="table table-striped">
        <thead>
            <tr>
                <th>Date</th>
                <th>Temp. (C)</th>
                <th>Temp. (F)</th>
                <th>Summary</th>
            </tr>
        </thead>
        <tbody>
    ${this.state.forecasts.map(f => html`
            <tr>
                <th scope="row">${f.Date.toLocaleString()}</th>
                <td>${f.TemperatureC}</td>            
                <td>${f.TemperatureF}</td>
                <td>${feelsLike[f.Summary]}</td>
            </tr>
    `)}
        </tbody>
    </table>    
</div>
`;
        }
    }

}
