import gulp from "gulp";


import { path } from "./gulp/config/path.js"
import { plugins } from "./gulp/config/plugins.js"
import ts from "gulp-typescript"


global.app = {
	isBuild: process.argv.includes('--build'),
	isDev: !process.argv.includes('--build'),
	path: path,
	gulp: gulp,
	plugins: plugins
}

import { copy } from "./gulp/tasks/copy.js"
import { reset } from "./gulp/tasks/reset.js"
import { html } from "./gulp/tasks/html.js"
import { server } from "./gulp/tasks/server.js"
import { scss } from  "./gulp/tasks/scss.js"
import { images } from "./gulp/tasks/images.js"
import { otfToTtf, ttfToWoff, fontStyle } from "./gulp/tasks/fonts.js"
import { zip } from "./gulp/tasks/zip.js"
import { typescript } from "./gulp/tasks/typescript.js";


function watcher() {
	gulp.watch(path.watch.files, copy),
	gulp.watch(path.watch.html, html)
	gulp.watch(path.watch.scss, scss)
	gulp.watch(path.watch.images, images)
	gulp.watch(path.watch.typescript, typescript)
}


export const tsProject = ts.createProject("tsconfig.json");

const fonts = gulp.series(otfToTtf, ttfToWoff, fontStyle)

const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, typescript, images))


const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server))
const build = gulp.series(reset, mainTasks)
const deployZIP = gulp.series(reset, mainTasks, zip)

// Экспорт сценариев
export { dev }
export { build }
export { deployZIP }

gulp.task('default', dev)