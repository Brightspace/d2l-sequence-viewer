[![Build Status](https://travis-ci.com/Brightspace/d2l-sequence-viewer.svg?token=s5DqGXfBESukCURszFfU&branch=master)](https://travis-ci.com/Brightspace/d2l-sequence-viewer)

# d2l-sequence-viewer

[Polymer](https://www.polymer-project.org)-based web component for viewing sequences in Brightspace.

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

The demo will be available at [http://127.0.0.1:<port>/components/d2l-sequence-viewer](http://127.0.0.1:8081/components/d2l-sequence-viewer). Port is printed to console after the server starts. Alternatively, you can run the following command and then add `/demo` to the end of the URL:

```shell
polymer analyze > analysis.json && polymer serve --open
```

A demo with the new content alert enabled is available at this URL: [http://127.0.0.1:<port>/components/d2l-sequence-viewer/demo/with-alert.html](http://127.0.0.1:8081/components/d2l-sequence-viewer/demo/with-alert.html)

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

1.  Follow the steps in [brightspace-integration](https://github.com/Brightspace/brightspace-integration) to clone your own local copy of bsi. (Be sure to follow the instructions to update `D2L.LP.Web.UI.Html.Bsi.config.json`)

2.  Navigate to the Config Variable Browser found in the Brightspace Admin Tools gear menu and enable the following feature:
`d2l.Tools.SequenceViewer.EnableLearnerExperience`

3.  Run npm link in your `d2l-sequence-viewer` folder to add your local sequence viewer to the npm registry.

4.  Run
	```shell
	npm link d2l-sequence-viewer
	```
	in your `brightspace-integration` folder to link bsi to your local sequence viewer.

5.  Login as a student in your Brightspace OrgUnit and navigate to a topic
