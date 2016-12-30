/**
 * 发布
 * ilex
 */
const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const del = require('del'); // 清除文件（del）

// 设置默认任务（default）
gulp.task('default', ['clean'], function() {
  gulp.start('convertJS', 'convertCSS', 'imagesCopy', 'browserify', 'watch');
});

/////////////////////////////////////
//发布 BEGIN
////////////////////////////////////
// 编译并压缩js
// plugins:['transform-runtime','transform-remove-strict-mode']
gulp.task('compileJs', function(){
  return gulp.src('src/**/*.js')
    .pipe(babel({
      presets: ['es2015', 'react', 'stage-0']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('lib/'));
});
// 合并并压缩css
gulp.task('compileCSS', function(){
  return gulp.src('src/**/*.css')
    .pipe(concat('app.css'))
    .pipe(cssnano())
    .pipe(rename(function(path){
      path.basename += '.min';
    }))
    .pipe(gulp.dest('lib/styles'));
});

//复制静态资源到指定目录
gulp.task('compileImg', function(){
  return gulp.src(['src/**/*.png', 'src/**/*.jpg', 'src/**/*.gif', 'src/**/*.cur'])
    .pipe(gulp.dest('lib/'));
});
// 发布之前操作
gulp.task('prepublish', function(done) {
  del(['lib'], done);
});
// 执行发布
gulp.task('publish', ['compileJs', 'compileCSS', 'compileImg']);
//////////////////////////////////////////
//发布 END   gulp prepublish, gulp publish
/////////////////////////////////////////
