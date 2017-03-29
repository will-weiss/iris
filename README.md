# Iris

Mustache Template Engine to emit DOM elements


## User Story

> As a frontend web developer
> I want a mustache template compiler that emits pure JS functions which return DOM elements
> So that without additional dependencies I can create interactive elements within client-side code.


## Why?

Templates are a good idea. Separating model logic from view creation leads to more extensible software.

However, generating HTML strings from templates is insufficient to handle user interactivity on the client. Functions with closures are not serializable so they cannot be passed as callbacks to handle user events. Developers are forced to find DOM elements to add these callbacks manually. Their code becomes mutative, tightly coupled with the view, and difficult to maintain.

The alternatives are worse. Template systems featuring domain specific languages leave developers wanting the full capabilities of javascript. Frameworks require developers to learn and buy into specific toolchains and can behave unexpectedly on minor deviations.

There is a need for a template engine that compiles to plain JS functions callable on the client which return DOM elements, not strings. Developers will then reap the benefits templates provide and seamlessly handle browser events.


## Intended Usage

This template

```html
<div>
  <h3>{{text}}</h3>
  <button onclick={{handleClick}}>
    Click Me!
  </button>
</div>
```

should generate something like the following javascript

```javascript
function(context) {
  var div_0 = document.createElement('div');
  var h3_0 = document.createElement('h3');
  var button_0 = document.createElement('button');

  h3_0.appendChild(document.createTextNode(context['text']));
  button_0.appendChild(document.createTextNode('Click Me!'));
  div_0.appendChild(h3_0);
  div_0.appendChild(button_0);

  button_0.onclick = context['handleClick']

  return div_0;
}
```

## Design Goals

* Client Functionality
  * Mustache spec compliant
  * Composable templates
  * Attachable event handlers
  * Generates pure, standalone JS functions
  * Runs without additional scripts/dependencies

* Developer Happiness
  * Superb documentation
  * Do-what-I-mean API
  * Opt-in strictness
  * Informative error messages for unrecoverable situations
  * Helpful warnings for common mistakes
  * Working TodoMVC implementation without additional dependencies

* Supported Options
  * JS API + CLI
  * Generation of type definitions for typescript
  * Strict option that disallows undefined variables
  * Compile to ES3, ES5, ES6, and ES7

## Design Choices

* Compiler Dependencies
  * node.js + typescript
  * mocha + chai + sinon
  * hogan.js for scanning + parsing
  * mustache/spec for test suite

* Testability
  * Passes mustache.js test suite
  * 100% branch coverage

* Code Style
  * Strict type annotation
  * Strict dependency injection
  * No class keyword
  * No mutating state in compiler

## Out of Scope

* Being a framework
* Implementing a lexer/tokenizer/parser
* Dependency-less compiler
* Diffing
* Virtual DOM
* State management
* Embedded code
* Anything async
* Build tool integrations i.e., webpack, gulp, grunt
* Server plugins i.e., express, koa, hapi
* Bundling
* Minification


# TODO

- [x] Initial commit
- [x] Create harnesses to run against mustache test suite
- [x] Compile static templates
- [x] Compile comment tags
- [x] Compile variable tags for non-nested object contexts and falsy values
- [x] Compile escaped variable tags for non-nested object contexts and falsy values
- [x] Compile section tags for falsy values including empty lists
- [x] Compile section tags for non-empty lists
- [x] Compile section tags for non-falsy, non-list, non-callable values
- [x] Compile section tags for callable values
- [x] Compile inverted section tags
- [x] Compile partial tags
- [x] Compile set delimeter tags
- [x] Access context properties recursively
- [x] Allow objects/functions to be added as element attributes using variable tags
- [x] Compile to static div
- [x] Compile to div with variable
- [ ] Differentiate between quoted and unquoted element attributes
- [ ] Recursively parse HTML attributes
- [ ] Strip HTML comments
- [ ] Handle HTML directives
- [ ] Handle self-closing tags
- [ ] Unify templates where possible
- [ ] Optionally strip extraneous whitespace when compiling for the DOM
- [ ] Strict mode throws errors when a variable is undefined
- [ ] Minify using Google Closure
- [ ] CLI


# Open Questions

- Lambdas?
- TS definitions?
- What are common errors/warnings to alert on?
- Exact behavior of attributes?