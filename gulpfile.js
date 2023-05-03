// Основной модуль
import gulp from "gulp";
// Импорт путей
import { path } from "./gulp/config/path.js";
// Импорт общих плагинов
import { plugins } from "./gulp/config/plugins.js";

// Передаём значение в глобальную переменную
global.app = {
    isBuild: process.argv.includes("--build"),
    isDev: !process.argv.includes("--build"),
    path: path,
    gulp: gulp,
    plugins: plugins
} 

// Task`s import
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { zip } from "./gulp/tasks/zip.js";
import { ftp } from "./gulp/tasks/ftp.js";
//import { otfToTtf, ttfToWoff, fontStyle } from "./gulp/tasks/fonts.js"; еще не работают как надо

// Набдюдатель за изменениями в файлах
function watcher() {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
}

// Последовательная обработка шрифтов
//const fonts = gulp.series(otfToTtf, ttfToWoff, fontStyle)

//const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images));
const mainTasks = gulp.parallel(copy, html, scss, js, images);

// Построение сценариев выполнения задач, очерёдность важна
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZip = gulp.series(reset, /*mainTasks*/ js, zip);// должно быть mainTasks, но не работает из-за TypeError: app.plugins.if is not a function
//const deployZip = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, js, ftp);

//
export { dev };
export { build };
export { deployZip };
export { deployFTP };

//Выполняем сценарий по умолчанию
gulp.task('default', dev);
