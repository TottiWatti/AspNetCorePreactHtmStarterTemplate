"use strict";

import { html, Component, render } from '../lib/htm/preact/standalone.module.js';
import { Home } from './Home.js';
import { Counter } from './Counter.js'
import { FetchData } from './FetchData.js'

// router pages, first page is considered home page
var pages = { '#Home': Home, '#Counter': Counter, '#FetchData': FetchData };

class App extends Component {

    constructor() {
        super();

        // window back navigation handler
        window.onpopstate = () => { this.Navigate(null); };

        // initial page
        this.state = { navPage: '#Home' };
    }

    /**
     * Navigates to page by name
     * @param {string} toPage Page name to navigate
     */
    Navigate(toPage) {        
        this.setState({ navPage: toPage });        
    }

    render() {

        // get     page to navigate to or                    browser back/forward navigation page or       first (home) page
        let page = this.state.navPage ? this.state.navPage : window.location.hash ? window.location.hash : Object.entries(pages)[0][0]; 
        
        // push page to browser navigation history if not current one
        if (window.location.hash !== page) {
            window.history.pushState({}, page, window.location.origin + page);
        }                   
          
        let content = html`<${pages[page]} />`;

        return html`
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" style="cursor: pointer" onClick=${() => this.Navigate("#Home")}>PreactHtmStarter</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" style="cursor: pointer" onClick=${() => this.Navigate("#Home")}>Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" style="cursor: pointer" onClick=${() => this.Navigate("#Counter")}>Counter</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" style="cursor: pointer" onClick=${() => this.Navigate("#FetchData")}>Fetch data</a>
        </li>        
      </ul>
    </div>
  </div>  
</nav>
<div class="container-fluid body-content">
    ${content}
</div>
      `;
    }

}

render(html`<${App} />`, document.body);