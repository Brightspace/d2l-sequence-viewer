[![Build Status](https://travis-ci.com/Brightspace/d2l-sequence-viewer.svg?token=s5DqGXfBESukCURszFfU&branch=master)](https://travis-ci.com/Brightspace/d2l-sequence-viewer)

# d2l-sequence-viewer

[Polymer](https://www.polymer-project.org)-based web component for D2L sequence-viewer.

## Installation

```shell
bower install d2l-sequence-viewer
```

## Usage

## Developing, Testing and Contributing

After cloning the repo, run `npm install` to install dependencies.

If you don't have it already, install the [Polymer CLI](https://www.polymer-project.org/2.0/docs/tools/polymer-cli) globally:

```shell
npm install -g polymer-cli
```

To start a [local web server](https://www.polymer-project.org/2.0/docs/tools/polymer-cli-commands#serve) that hosts the demo page and tests:

```shell
polymer analyze > analysis.json && polymer serve
```

To lint ([eslint](http://eslint.org/) and [Polymer lint](https://www.polymer-project.org/2.0/docs/tools/polymer-cli-commands#lint)):

```shell
npm run lint
```

To run unit tests locally using [Polymer test](https://www.polymer-project.org/2.0/docs/tools/polymer-cli-commands#tests):

```shell
polymer test --skip-plugin sauce
```

To lint AND run local unit tests:

```shell
npm test
```
