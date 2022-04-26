import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import cleanCss from 'gulp-clean-css'
import webpcss from 'gulp-webpcss'
import autoprefixer from 'gulp-autoprefixer'
import gulpGroupCssMediaQueries from "gulp-group-css-media-queries"

const sass = gulpSass(dartSass) // компилирует

export const scss = () => {
	return app.gulp.src(app.path.src.scss, { sourcemaps: true })
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: 'SCSS',
				message: 'Error: <%= error.message %>'
			})
		))
		// заменяем пути
		.pipe(app.plugins.replace(/@img\//g, '../img/'))
		.pipe(
			sass({
				outputStyle: 'expanded'
			})
		)
		// группируем медиа запросы
		.pipe(gulpGroupCssMediaQueries())

		.pipe(webpcss({
				webpClass: '.webp',
				noWebpClass: '.no-webp'
			})
		)
		.pipe(autoprefixer({
				grid: true,
				cascade: true,
				overrideBrowserslist: ["last 3 versions"]
			})
		)
		.pipe(app.gulp.dest(app.path.build.css))

		.pipe(cleanCss())
		.pipe(rename({
			extname: '.min.css'
		}))
		.pipe(app.gulp.dest(app.path.build.css))
		.pipe(app.plugins.browsersync.stream())
}