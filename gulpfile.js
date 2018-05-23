var gulp = require('gulp');
var merge = require('gulp-merge-json');
var path = require('path');

gulp.task('build-locales', () => {
    gulp.src('lang/*.json')
    .pipe(merge({
        fileName: 'locales.json',
        edit: (parsedJson, file) => {
			const lang = path.basename(file.path, '.json');
			return {
				[lang]: parsedJson
			};
        }
    }))
    .pipe(gulp.dest('.'));
});
