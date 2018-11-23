let mix = require('laravel-mix');

mix.js('assets/js/app.js', 'js')
    .sass('assets/sass/style.scss', './')
    .options({
        processCssUrls: false
        
    })
    .setPublicPath('./');