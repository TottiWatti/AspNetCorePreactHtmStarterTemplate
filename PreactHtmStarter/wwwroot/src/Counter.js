"use strict";

import { html, Component } from '../lib/htm/preact/standalone.module.js'; 

export class Counter extends Component {

    constructor(props) {
        super(props);
        this.state = { currentCount: 0 };
    }

    incrementCounter() {
        this.setState({
            currentCount: this.state.currentCount + 1
        });
    }

    render() {
        return html`
<div>
    <h1>Counter</h1>
    <p>This is a simple example of a React component.</p>
    <p aria-live="polite">Current count: <strong>${this.state.currentCount}</strong></p>
    <button class="btn btn-primary" onClick=${() => this.incrementCounter()}>Increment</button>
</div>
      `;
    }

}
