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

## Integrating d2l-sequence-viewer into Brightspace

1.  Login to [Launch Darkly](https://app.launchdarkly.com/default/test/features/enhanced-asv/targetting), find the `enhanced-asv` flag and add your Brightspace tenantid to the list.

2.  Navigate to the Config Variable Browser found in the Brightspace Admin Tools gear menu and enable the following feature:
```
d2l.Tools.SequenceViewer.EnableLearnerExperience
```

3.  Open the Free-Range App Manager found in the Brightspace Admin Tools gear menu

4.  Search for the FRA key: `urn:d2l:fra:class:enhanced-sequence-viewer`

5.  Override the current location to the latested published FRA location on the CDN.  For instance:
`https://s.brightspace.com/apps/d2l-sequence-viewer/dev/c7da0c347c035a952d8b5ba7bc36b71dc3ab56c5/appconfig.json`

6.  Login as a student in your Brightspace OrgUnit and navigate to a topic


### Optional Steps For integrating to a local development instance

7.  Clone the [lp-devappregistry-config](https://git.dev.d2l/projects/CORE/repos/lp-devappregistry-config/browse) into your instance's _checkout_ directory.

8.  Perform a full build
