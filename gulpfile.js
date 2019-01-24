const {src, dest} = require('gulp');
const merge = require('gulp-merge-json');
const path = require('path');

// merge all json files inside lang to `locales.json`
function defaultTask() {
	return src('lang/*.json')
		.pipe(merge({
			fileName: 'locales.json',
			edit: (parsedJson, {basename}) => {
				const lang = path.basename(basename, '.json');
				return {
					[lang]: parsedJson
				}
			}
		}))
		.pipe(dest('.'));
}

exports.default = defaultTask;