"use strict";

import { html, Component } from '../lib/htm/preact/standalone.module.js';

export class Home extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return html`
 <div>
    <h1>Hello, world!</h1>
    <p>Welcome to your new single-page application, built with:</p>
    <ul>
        <li><a href='https://get.asp.net/'>ASP.NET Core</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx' target="_blank" rel="noopener noreferrer">C#</a> for cross-platform server-side code</li>
        <li><a href='https://preactjs.com/' target="_blank" rel="noopener noreferrer">Preact</a> with <a href='https://github.com/developit/htm'>HTM (Hyperscript Tagged Markup)</a> rendering for client-side code</li>
        <li><a href='http://getbootstrap.com/' target="_blank" rel="noopener noreferrer">Bootstrap</a> for layout and styling</li>
    </ul>
    <p>To help you get started, we have also set up:</p>
    <ul>
        <li><strong>Client-side navigation</strong>. For example, click <em>Counter</em> then <em>Back</em> to return here.</li>        
    </ul>    
 </div>
      `;
    }

}
