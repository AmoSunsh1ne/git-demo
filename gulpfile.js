/**
 * 1. LESS编译 压缩 合并
 * 2. JS合并 压缩 混淆
 * 3. img复制
 * 4. html压缩
 */

// 在gulpfile中先载入gulp包，因为这个包提供了一些API
var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');

// 1. LESS编译 压缩 --合并没有必要，一般预处理CSS都可以导包
gulp.task('style',function(){
	gulp.src(['src/styles/*.less','!src/styles/_*.less'])
		.pipe(less())
		.pipe(cssnano())
		.pipe(gulp.dest('dist/style'))
		.pipe(browserSync.reload({
			stream:true
		}))
})
// 2. JS合并 压缩混淆
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
gulp.task('script',function(){
	gulp.src('src/scripts/*.js')
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/script/'))
		.pipe(browserSync.reload({
			stream:true
		}))
})
// 3. 图片复制
gulp.task('image',function(){
	gulp.src('src/images/*.*')
		.pipe(gulp.dest('dist/images/'))
		.pipe(browserSync.reload({
			stream:true
		}))
})
// 4.html
var htmlmin = require('gulp-htmlmin');
gulp.task('html',function(){
	gulp.src('src/*.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('dist/'))
		.pipe(browserSync.reload({
			stream:true
		}))
})
// 5.服务器
var browserSync = require('browser-sync');
gulp.task('serve',function(){
	browserSync({
		server: {
			baseDir:['dist']
		},


	}, function(err, bs) {
    console.log(bs.options.getIn(["urls", "local"]));
	});
	gulp.watch('src/images/*.*',['image']);
	gulp.watch('src/scripts/*.js',['script']);
	gulp.watch('src/style/*.less',['style']);
	gulp.watch('src/index.html',['html']);
})

