import { configFTP } from "../config/ftp.js";
import pkg1 from 'vinyl-ftp';
const { vinylFTP } = pkg1;
import pkg2 from 'gulp-util';
const { util } = pkg2;

export const ftp = () => {
    configFTP.log = util.log;
    const ftpConnect = vinylFTP.create(configFTP)
    return app.gulp.src(`${app.path.buildFolder}/**/*.*`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "FTP",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(zipPlugin(`${app.path.rootFolder}.zip`))//rootFolder === GULP_2022
        .pipe(ftpConnect.dest(`/${app.path.ftp}/${app.path.rootFolder}`))
}