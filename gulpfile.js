"use strict";

var gulp   = require('gulp'),
watch      = require('gulp-watch'),
open       = require('gulp-open'),
rename     = require('gulp-rename'),
connect    = require('gulp-connect'),
concat     = require('gulp-concat'),
replace    = require('gulp-replace'),
uglify     = require('gulp-uglify'),
rigger     = require('gulp-rigger'),
image      = require('gulp-image'),
plumber    = require('gulp-plumber'),
sourcemaps = require('gulp-sourcemaps'),
postcss    = require('gulp-postcss'),
assets     = require('postcss-assets'),
sprites    = require('postcss-sprites'),
postimport = require("postcss-import"),
cssnext    = require('postcss-cssnext'),
cssnano    = require('cssnano'),
svg        = require('postcss-svg'),
clearfix   = require('postcss-clearfix'),
rimraf     = require('rimraf');

var path = {
  dev: {
    html    : 'dev/*.html',
    htmlDir : 'dev/',
    js      : 'dev/assets/js/main.js',
    jsMain  : 'main.js',
    jsDir   : 'dev/assets/js/',
    css     : 'dev/assets/css/main.css',
    cssMain : 'main.css',
    cssDir  : 'dev/assets/css/',
    img     : 'dev/assets/img/*.*',
    imgDir  : 'dev/assets/img/',
    font    : 'dev/assets/fonts/**/*.*',
    fontDir : 'dev/assets/fonts/',
  },
  src: {
    html      : 'src/*.html',
    jsStart   : 'src/assets/js/main.js',
    jsEnd     : 'src/assets/js/main_end.js',
    jsModules : 'src/modules/**/**/**/*.js',
    svgDir    : 'src/assets/img/svgs/',
    img       : 'src/assets/img/**/*.*',
    css       : 'src/assets/css/main.css',
    cssAll    : ['src/assets/css/main.css',
                 'src/assets/css/*.css',
                 'src/modules/**/*.css',
                 'src/modules/**/**/*.css',
                 'src/modules/**/**/**/*.css'
                ],
    cssDir    : 'src/assets/css/',
    font      : 'src/assets/fonts/**/*.*',
    fileFirs   : ['../img/',
                  '../img/sprites/',
                  '../img/svgs/',
                  '../fonts/'
                 ],
  },
  prod: {
    htmlDir   : 'prod/',
    jsDir     : 'prod/js/',
    cssDir    : 'prod/css/',
    imgDir    : 'prod/img/',
    imgSprite : 'prod/img/sprite.png',
    fontDir   : 'prod/fonts/',
  },
  watch: {
    html : 'src/**/*.html',
    js   : 'src/**/**/**/**/*.js',
    css  : ['src/assets/css/*.css',
            'src/modules/**/*.css',
            'src/modules/**/**/*.css',
            'src/modules/**/**/**/*.css'
           ],
    img  : 'src/assets/img/**/*.*',
    font : 'src/assets/fonts/**/*.*'
  },
  clean: {
    dev  : './dev',
    prod : './prod'
  }
};

var sprites_opts = {
    stylesheetPath : path.prod.cssDir,
    spritePath     : path.prod.imgSprite,
    retina         : true,
    filterBy       : function(image) {
      return /(sprites)/gi.test(image.url);
    },
};

var cssnano_opts = {
  autoprefixer:{browsers:['> 0.5%','ie 8','ie 9']},
  convertValues:false,
};

var postimport_opts = {
  from: path.src.css
};

var svg_opts = {
  paths:[path.src.svgDir]
}

var assets_opts = {
  loadPaths  : path.src.fileFirs,
  basePath   : path.src.cssDir,
  relativeTo : path.src.cssDir
};

var cssnext_opts = {

}

var processors_dev = [
  postimport,
  svg(svg_opts),
  assets(assets_opts),
  cssnext(cssnext_opts),
  clearfix,
]

var processors_prod = [
  sprites(sprites_opts),
  cssnano(cssnano_opts)
]

gulp.task('connect:dev', function () {
  connect.server({
    root: ['dev'],
    port: 8000
  });
  gulp.src('')
      .pipe(open({uri: 'http://localhost:8000/'}));
});

gulp.task('clean:dev', function (cb) {
  rimraf(path.clean.dev, cb);
});

gulp.task('clean:prod', function (cb) {
  rimraf(path.clean.prod, cb);
});

gulp.task('html:dev', function () {
  gulp.src(path.src.html)
      .pipe(rigger())
      .pipe(gulp.dest(path.dev.htmlDir))
});

gulp.task('html:prod', function () {
  gulp.src(path.dev.html)
      .pipe(rigger())
      .pipe(replace('assets/',''))
      .pipe(gulp.dest(path.prod.htmlDir))
});

gulp.task('js:dev', function () {
  gulp.src([path.src.jsStart,path.src.jsModules,path.src.jsEnd])
      .pipe(sourcemaps.init())
      .pipe(rigger())
      .pipe(concat(path.dev.jsMain))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(path.dev.jsDir))
});

gulp.task('js:prod', function () {
  gulp.src(path.dev.js)
      .pipe(uglify())
      .pipe(gulp.dest(path.prod.jsDir))
});

gulp.task('css:dev', function () {
  gulp.src(path.src.cssAll)
      .pipe( plumber() )
      .pipe( sourcemaps.init() )
      .pipe( concat(path.dev.cssMain) )
      .pipe( postcss(processors_dev) )
      .pipe( sourcemaps.write('.') )
      .pipe( gulp.dest(path.dev.cssDir) );
});

gulp.task('css:prod', function () {
  gulp.src(path.dev.css)
      .pipe( postcss(processors_prod) )
      .pipe( gulp.dest(path.prod.cssDir) );
});

gulp.task('img:dev', function () {
  gulp.src(path.src.img)
      .pipe(gulp.dest(path.dev.imgDir))
});

gulp.task('img:prod', function () {
  gulp.src(path.dev.img)
      .pipe(image())
      .pipe(gulp.dest(path.prod.imgDir))
});

gulp.task('font:dev', function() {
  gulp.src(path.src.font)
      .pipe(gulp.dest(path.dev.fontDir))
});

gulp.task('font:prod', function() {
  gulp.src(path.dev.font)
      .pipe(gulp.dest(path.prod.fontDir))
});

gulp.task('dev', [
          'html:dev',
          'js:dev',
          'css:dev',
          'font:dev',
          'img:dev',
          'connect:dev'
]);

gulp.task('prod', [
          'html:prod',
          'css:prod',
          'js:prod',
          'img:prod',
          'font:prod'
]);

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:dev');
    });
    watch(path.watch.css, function(event, cb) {
        gulp.start('css:dev');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:dev');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('img:dev');
    });
    watch([path.watch.font], function(event, cb) {
        gulp.start('font:dev');
    });
});
gulp.task('default', ['dev','watch']);
