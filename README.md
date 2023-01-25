# ASP.Net Core Preact HTM Starter Template
 Lightweight ASP.NET Core SPA starter template with Preact HTM for Visual Studio 2022. Type checking, shared models, bundling and minification supported.

## Preface
Few years ago I needed a light weight solution for small ASP.NET (Core) projects. My requirements were:
* Type checking and intellisense
* Reusable components
* EcmaScript module support
* No compile or very fast compile
* Full blown Visual Studio project with both back and front end 

While there was number of ready solutions for Visual Studio Code that met requirements I found none for full blown Visual Studio.
I tried inbuild React solution. While React is great front end library debugging it with full Visual Studio becomes quite soon gets bloated and slow.
Not to mention that it tends to force you to do everything "React way" and I like to use all kind of JavaScript libraries and vanilla JavaScript.
Then I found Preact and it's alternative to JSX, HTM, which could be compiled at browser hence slow precompilation step with source map generation could be skipped.
Compilation, bundling and minification are optional but included.

## Features
* Front end build with ES modules. Debug modules directly in browser. Build, bundle and minify for production.
* React components with Preact but with HTM (Hyperscript Tagged Markup) instead of JSX
* Intellisense and type checking with JSDoc and TypeScript (TypeScript itself is not used, only TypeScript engine for code checking)
* Integrated minimal hash SPA router
* Optional shared models between C# back end and JavaScript front end
* Production building, bundling and minification
    * Compiles HTM templates to Preact nodes with babel
    * Bundles ES modules with Rollup
    * Mangles and minifies bundle with Terser
    * Purge and minify only used css with PurgeCSS
	
## Setup 
Download project and open it in Visual Studio 2022. Before project can be run few steps are necessary:
1. In solution explorer right click libman.json file and choose "Restore Client-Side Libraries". This loads Bootstrap 5 css and js along with Preact/HTM combined bundle.
2. In solution explorer right click package.json file and choose "Restore packages". This load all other libraries (Babel, Rollup, Terser, PurceCSS, trash-cli script and TypeScript lit-html Plugin).
3. In solution explorer locate downloaded file wwwroot\lib\htm\preact\standalone.module.js. Open file and add line "// @ts-nocheck" without quotes before script line, otherwise it will not pass type checking (We'll just need to believe it works).  After edit file should look something like below
```javascript
// @ts-nocheck
var e, n, _, t, o, r, u, l = {}, ...
```

## Debugging
After completing setup project should be able to start normally with Visual Studio play button. Template has SPA structure with Home/Counter/ Fetch data pages familiar from Visual Studio's inbuild templates.

# Shared models between C# and JavaScript
There are numerous C# to TypeScript conversion libraries out there. Since JSDoc is used for type definitions I suspected that there would be similar libraries to convert C# models to EcmaScript class model with JSDoc support.
I was surprised when I did not find any. Finally I ended up writing my own. Provided shared C# models at \Shared folder are converted to ES class models at folder \wwwroot\src\shared with it. 
Of course it is possible to manually keep C# and JavaScript models similar but in long rung automated solution is far better. If you want to use my [CSharpToES](https://github.com/TottiWatti/TottiWatti.CSharpToES) you can download and compile it.
Then just add reference to it at project's "Pre-build event" adding the something like
```
<Path to CSharpToES.exe> $(ProjectDir)Shared $(ProjectDir)wwwroot\src\shared
``` 
where <Path to CSharpToES.exe> would be something like C:\CSharpToES\CSharpToES\bin\Release\net6.0\CSharpToES.exe depending on where you saved downloaded project. You can of course copy project's output folder to simpler location like C:\CSharpToES and reference it there.
It is essential to use pre-build event for conversion to let intellisense spot client side errors when model change.

## Bundling and minification options
Template makes bundle and minify round automatically on every compile. It is only necessary prior publishing but automatic suits better for me (and my memory). It is defined at project's property "Post-build event". Default it makes full compilation. Compilation can also be triggered from console with same command.
Two options are defined in package.json file:
* build-all 
    * bundling and minification keeping template literals (they will compile at browser)
* build-all-babel
    * bundling and minification with template literals precompilet to Preact nodes

## Tech stuff
* Reusable components are life savers for JavaScript projects and there comes in [Preact](https://preactjs.com/), a 3kb minimal alternative to React. Old timers like me still remember time, when only alternative was JavaScript, which worked differently in all major browsers and jQuery was king. Few miss that.
* JSX requires precompilation step before JavaScript debug can start. I find debugging of plain JavaScript more fluent than with precompiled source maps. So there comes in Preact's alternative to JSX, [HTM](https://github.com/developit/htm). It turns JavaScript template literals to Preact nodes in browser so precompile step is not necessary. Usage is demonstrated in template source files at wwwroot\src folder.
* App.js file contains minimal hash SPA router, which is only a few lines of JavaScript. I developed it from vanilla JavaScript solution found from internet years ago and I'd like give credit that person but I cannot where I found it from.
* Type checking is another life saver for JavaScript projects especially for C# programmers. TypeScript can do that but standard TypeScript also needs precompilation step. 
Fortunately TypeScript engine can read type definitions from JSDoc comments and can be used just to inspect JavaScript code without compilation. File tsconfig.js wires TypeScript only for code and type checking. 
* Highlighting code makes it so much more readable. Plugin [typescript-lit-html-plugin](https://github.com/microsoft/typescript-lit-html-plugin) does just that for template literals. It would be great, if it had intellisense also for template literals. There are plugins like that for Visual Studio Code but I haven't found any for full Visual Studio
* Production JavaScript runs faster if HTM templates are precompiled to Preact nodes for production. [Babel](https://babeljs.io/) along with [babel-plugin-html](https://github.com/developit/htm/tree/master/packages/babel-plugin-htm) is used for that. It also obfuscates your template literals at your components.
* Even though modern browsers can run modular JavaScript directly (as this template does for debugging) it requires browser to fetch each module individually from server which slows start up time published application. [Rollup](https://www.rollupjs.org/) is therefore used to bunde all ES modules into single file.
* Minification makes your JavaScript smaller so it loads faster in published application. Minification also obfuscates your JavaScript code it's not open for anyone to read if that is something you like. [Terser](https://terser.org/) is used to mangle and minify final bundle
* Not only JavaScript can be minified but CSS also. [PurceCSS](https://purgecss.com/) is used to minify CSS. It inspects your source files and discards all css not used in project, in this case unused CSS in [Bootstrap](https://getbootstrap.com/) CSS. Just remember to add all necessary css source files PurgeCSS call at package.json file.
* This template is built on top of razor pages project. Razor is not used to inject presentatation data from server to browser as it normally is used. Razor has neat property, it can inject different code to browser while debugging versus production. That property is used to load modules to browser when debugging and bundled JavaScript in production.






