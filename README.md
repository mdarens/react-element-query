# react-element-query [![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-url]][daviddm-image] [![Build Status][travis-image]][travis-url]

Once you start thinking in elements, media queries, which are reliant on the size of the whole screen don't work well. Elements are frequently not the full screen-width. Element queries solve this, but CSS [won't have element queries for a while](http://discourse.specifiction.org/t/element-queries/26).

[eq.js](https://github.com/snugug/eq.js) does a good job, but it doesn't play nicely with React and react provides some nice performance and API benefits.

This is performant, and works on both the server and the client.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](http://doctoc.herokuapp.com/)*

  - [Install](#install)
  - [Usage](#usage)
- [I have a `.small` when over 150px and `.large` when over 300px](#i-have-a-small-when-over-150px-and-large-when-over-300px)
  - [Props](#props)
    - [`<Array> sizes` **Required**](#array-sizes-required)
    - [`<Function> makeClassName`](#function-makeclassname)
    - [`<String> default`](#string-default)
  - [Methods](#methods)
    - [`static` ElementQuery.register `(<React Element> element, <Array> sizes[, <Function> onResize])`](#static-elementqueryregister-react-element-element-array-sizes-function-onresize)
    - [`static` ElementQuery.unregister `(<React Element> element)`](#static-elementqueryunregister-react-element-element)
    - [`static` ElementQuery.listen()](#static-elementquerylisten)
    - [`static` ElementQuery.unregister()](#static-elementqueryunregister)
  - [Developing](#developing)
    - [Requirements](#requirements)
    - [Tests](#tests)
  - [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Install

```sh
npm i -S react-element-query
```


## Usage
```js
  import React from 'react'
  import ElementQuery from 'element-query'
  React.render((<ElementQuery
    sizes={[{name: 'large', width: 300}, {name: 'small', width: 150}]}
    >
    <h1>I have a `.small` when over 150px and `.large` when over 300px</h1>
  </ElementQuery>), document.createElement('div'))
```

## Props
### `<Array> sizes` **Required**
An array of objects containing minimum widths and classnames to apply. `[{name: 'large', width: 300}]` will apply the class `.large` to the child when the element is `300px` or larger.

### `<Function> makeClassName`
Takes the `name` for the matched size and returns a different classname. Useful if you want to apply a namespace to all your class names.

### `<String> default`
The server has no way to know the browser window width, and therefore, can't calculate the element width, so by default, it assumes there is no element query class applied. If you'd like to set a different default, pass a size name. Defaults to `''`.

## Methods
### `static` ElementQuery.register `(<React Element> element, <Array> sizes[, <Function> onResize])`
Allows you to use the ElementQuery throttled resize event for your own purposes. This allows you to have only one resize listener attached over your whole app.

`onResize` is an optional callback so that is called with the arguments: `<React Element> element, <Array> sizes`. If not defined, the default behavior is used.

### `static` ElementQuery.unregister `(<React Element> element)`
Once a component is registered, you can unregister it. Do this when the component is unmounted.

### `static` ElementQuery.listen()
Manually attach the resize listener. This is called automatically when a component is registered.

### `static` ElementQuery.unregister()
Manually remove the resize listener. This is called automatically when all components have been unregistered.


## Developing
To publish, run `npm run release -- [{patch,minor,major}]`

_NOTE: you might need to `sudo ln -s /usr/local/bin/node /usr/bin/node` to ensure node is in your path for the git hooks to work_

### Requirements
* **npm > 2.0.0** So that passing args to a npm script will work. `npm i -g npm`
* **git > 1.8.3** So that `git push --follow-tags` will work. `brew install git`

### Tests
Tests are in [tape](https://github.com/substack/tape).

* `npm test` will run both server and browser tests
* `npm run test-browser` and `npm run test-server` run their respective tests
* `npm run tdd-server` will run the server tests on every file change.
* `npm run tdd-browser` will run the browser tests on every file change.

## License

Artistic 2.0 © [Joey Baker](http://byjoeybaker.com) and contributors. A copy of the license can be found in the file `LICENSE`.


[npm-url]: https://npmjs.org/package/react-element-query
[npm-image]: https://badge.fury.io/js/react-element-query.svg
[travis-url]: https://travis-ci.org/joeybaker/react-element-query
[travis-image]: https://travis-ci.org/joeybaker/react-element-query.svg?branch=master
[daviddm-url]: https://david-dm.org/joeybaker/react-element-query.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/joeybaker/react-element-query