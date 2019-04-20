/* global require */
/* global gulp */

var gulp = require('gulp'),
   ts = require('gulp-typescript'),
   sourcemaps = require('gulp-sourcemaps'),
   clean = require('gulp-clean'),
   changed = require('gulp-changed'),
   concat = require('gulp-concat');

var config = require('./gulp.config');

var tsServerProject = ts.createProject({
   declarationFiles: false,
   noExternalResolve: false,
   module: 'commonjs',
   target: 'ES5'
});

var tsPublicProject = ts.createProject({
   declarationFiles: false,
   noExternalResolve: false,
   module: 'system',
   target: 'ES5',
   experimentalDecorators: true,
   emitDecoratorMetadata : true
});

//main task for dev
gulp.task('start-server', ['compile-server'], startServer);
gulp.task('start-client',['compile-client', 'start-client-nodemon'],  browserSyncTask);

gulp.task('start-client-nodemon', startClient);

gulp.task('compile-all', ['compile-server', 'compile-public']);
gulp.task('compile-server', compileServer);
gulp.task('compile-client', compilePublic);

gulp.task('watch-server', ['compile-server'], watchServer);
gulp.task('watch-public', ['compile-public'], watchPublic);

gulp.task('clean-server-js', cleanServerJs);


var browserSync = null;
function browserSyncTask() {
      
   browserSync = require('browser-sync').create();
   
   browserSync.init(null, {
      proxy: "http://127.0.0.1:3000",
      files: config.browserSync,
      browser: "google chrome",
      port: 7000,
   });
   
   gulp.watch([config.srcPublic+'/**/*.js', config.srcPublic+'/**/*.css', '!'+config.srcPublic+'client.njsproj']).on('change', function(){
      browserSync.reload();
   });
}

function startClient(cb) {

   var started = false;
   var nodemon = require('gulp-nodemon');

   return nodemon({
      script: config.mainClientFile,
      ignore: ["server/*","client/public/*"],
      ext: 'js'
   }).on('start', function () {
      if (!started) {
         cb();
         started = true;
      }
   });
}

function startServer(cb) {

   var started = false;
   var nodemon = require('gulp-nodemon');

   return nodemon({
      script: config.mainServerFile,
      ignore: ["client/*"],
      env: { 
            'NODE_ENV': 'development',
            'JWT_SECRET_KEY': 'coffee trip axel bark', //Insert JWT Secret here
            'DB_HOST':'pgis-kokomo.cdxshbbvmooi.us-east-2.rds.amazonaws.com', //Insert Database hostname here
            'DB_NAME':'cube_demo', //Insert Database name here
            'DB_USERNAME':'geoadmin', //Insert Database username here
            'DB_PASSWORD':'G30s3rv3r', //Insert Database password here
            'DB_PORT':5432,
            'DB_SSL':false
      },
      nodeArgs: ['--inspect=127.0.0.1:9228'],
      ext: 'js'
   }).on('start', function () {
      if (!started) {
         cb();
         started = true;
      }
   });
}

function compileServer() {
   
   var tsResult = gulp.src(config.serverSourcePaths)
      .pipe(sourcemaps.init())
      .pipe(ts(tsServerProject));

   return tsResult.js
      .pipe(sourcemaps.write('./source-maps'))
      .pipe(gulp.dest(config.destServer));
      
}

function compilePublic() {
   var tsResult = gulp.src(config.clientSourcePaths)
      .pipe(sourcemaps.init())
      .pipe(ts(tsPublicProject));

   return tsResult.js
      .pipe(sourcemaps.write('../source-maps'))
      .pipe(gulp.dest(config.clientAppPath));
}


function watchServer() {
   gulp.watch(config.serverSourcePaths, ['compile-server']);
}

function watchPublic() {
   gulp.watch(config.clientSourcePaths, ['compile-public']);
}

function cleanServerJs() {
   var paths = [
      config.srcServer + '**/*.js'
   ];
   return gulp.src(paths, { read: true })
      .pipe(clean());
}

function log(message, object) {
   if(object){
      console.log(message, object);
   }
   else{
      console.log(message);
   }
   
}

var minify = require('gulp-minify');

gulp.task('compress', function () {
    gulp.src('client/public/app/**/*.js')
      .pipe(concat('bootstrap.js'))
      .pipe(minify({
          exclude: ['tasks'],
          mangle: false,
          ignoreFiles: ['min.js']
      }))
      .pipe(gulp.dest('dist'))
});