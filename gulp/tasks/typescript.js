import { tsProject } from "../../gulpfile.js";
import sourcemaps from 'gulp-sourcemaps'

export const typescript = () => {
    return tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject()).js
        .pipe(sourcemaps.write('../typescript-maps'))
        .pipe(app.gulp.dest(app.path.build.typescript));
}

    