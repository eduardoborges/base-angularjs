'use-strict';

const conf = require('./deploy.conf.js');

var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var sourcemaps  = require('gulp-sourcemaps');
var uglify      = require('gulp-uglify');
var del         = require('del');
var wiredep     = require('gulp-wiredep');
var inject      = require('gulp-inject');
var useref      = require('gulp-useref');
var gulpif      = require('gulp-if');
var hApiFallback= require('connect-history-api-fallback');
var tempCache   = require('gulp-angular-templatecache');
var ftp         = require('gulp-ftp');
var debug       = require('gulp-debug');
var path = {
    app: './src/app',
    tmp: './.tmp',
    dist: './dist',
    src: './src'
};

/**
 * The basics is here ;D
 **/

gulp.task('sass', sassTask);
gulp.task('inject', injectTask);
gulp.task('serve',['inject','sass'], serveTask);
gulp.task('build',['bundle:dist', 'images:dist', 'fonts:dist', 'apache:dist']);
gulp.task('build:serve', buildserveTask);
gulp.task('deploy', deployTask);

var injectOpt       = { addRootSlash: false, relative: true };
var injectSources   = gulp.src([path.src + '/**/*.js'], {read: false});

function sassTask() {
    return gulp.src(path.src + '/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest(path.tmp))
        .pipe(browserSync.stream());
}

function injectTask(){
    return gulp.src(path.src + "/index.html")
        .pipe(inject(injectSources, injectOpt))
        .pipe(wiredep())
        .pipe(gulp.dest(path.tmp));
}

function serveTask() {
    var bsconfig = {
        injectChanges: true,
        open: false,
        server: {
            baseDir: [
                path.tmp,
                path.src
            ],
            middleware: [hApiFallback()],
            routes: {
                '/bower_components': 'bower_components'
            }
        }
    };

    browserSync.init(bsconfig);

    gulp.watch(path.src + "/*.js", ['inject']).on('change', browserSync.reload);
    gulp.watch(path.src + "/**/*.scss", ['sass']);
    gulp.watch('bower.json', ['inject']).on('change', browserSync.reload);
    
}

/**
 * Production TASKS
 */
gulp.task('inject:dist', injectDist);
gulp.task('bundle:dist',['inject:dist'], bundleDist);
gulp.task('images:dist', imagesDist);
gulp.task('fonts:dist', fontsDist);
gulp.task('apache:dist', apacheDist);

function injectDist() {
     return gulp.src(path.src + "/index.html")
        .pipe(inject(angularTemplateCache(), {starttag: '<!-- inject:partials -->',relative: true,  addRootSlash: true }))
        .pipe(inject(injectSources, injectOpt))
        .pipe(wiredep())
        .pipe(gulp.dest(path.dist));
}


function bundleDist() {
    return gulp.src(path.dist + "/index.html")
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.scss', sass({mode: 'compressed'}) ))
        .pipe(gulp.dest(path.dist));
            
}

function angularTemplateCache(){
    var config = {
        srcTemplates:[
            './src/app/**/*.html', 
            './src/app/**/**/*.html',
            '!.src/app/app/index.html'
        ],
        destPartials: './dist/scripts/',
        opt: {
            module: 'app',
            root: 'app/'
        }
    };

    return gulp.src(config.srcTemplates)
        .pipe(tempCache(config.opt))
        .pipe(gulp.dest(config.destPartials));
}

function fontsDist() {
    gulp.src(path.src + '/fonts/**/**')
        .pipe(gulp.dest(path.dist + '/fonts'));
}

function imagesDist() {
    gulp.src(path.src + '/images/**/**')
        .pipe(gulp.dest(path.dist + '/images'));
}

function apacheDist() {
    gulp.src('.htaccess')
        .pipe(gulp.dest(path.dist));
}

function buildserveTask(){
    return 0;
}


/**
 * Deploy tasks
*/

function deployTask(){
    console.log("Enviando arquivos... Vá tomar um café. ;)");
    return gulp.src("/")
        .pipe(prompt.confirm('Tem CERTEZA que deseja compilar e pôr em produção?',
        function(){
            if(res == "Y"){
                gulp.src(path.dist + "/**/**")
                    .pipe(ftp(conf.ftpData))
            }
            
        }))
        
}