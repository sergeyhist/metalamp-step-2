# Toxin-Hotel Source code
## Requirements
+ [NodeJS](https://nodejs.org/en/)
+ [Npm](https://www.npmjs.com/)
## Npm Dependencies
+ [Pug](https://pugjs.org/api/getting-started.html)   
Template engine to create pages.
+ [Sass](https://sass-lang.com/)   
Template engine to create styles for pages.
+ [Webpack](https://github.com/webpack/webpack)   
To bundle pages and assets.
+ [Webpack-cli](https://github.com/webpack/webpack-cli)   
To interact with webpack from terminal.
+ [Webpack Dev Server](https://github.com/webpack/webpack-dev-server)   
To run bundled project on a http server with live-reload function.
+ Dependencies for correct webpack bundling:
    - [Clean Webpack Plugin](https://github.com/johnagan/clean-webpack-plugin)
    - [HTML Webpack Plugin](https://github.com/jantimon/html-webpack-plugin)
    - [CSS Loader](https://github.com/webpack-contrib/css-loader)
    - [Style loader](https://webpack.js.org/loaders/style-loader/)
    - [Sass Loader](https://github.com/webpack-contrib/sass-loader)
    - [Pug Plugin](https://github.com/webdiscus/pug-plugin)
+ [Jquery](https://github.com/jquery/jquery)   
To support jquery plugins.
+ [Air Datepicker](https://github.com/t1m0n/air-datepicker)   
For calendar implementation.
+ [IMask](https://github.com/uNmAnNeR/imaskjs)   
For text input mask implementation.
### Jquery Plugins
+ [Jquery-UI](https://github.com/jquery/jquery-ui)   
For range slider implementation.
## Fonts
+ [Material Icons Regular](https://github.com/google/material-design-icons)
+ [Montserrat Regular](https://github.com/JulietaUla/Montserrat)
+ [Font Awesome Brands](https://fontawesome.com/icons?s=brands)
## Deploy
1. Download repo and install needed dependencies:

        git clone https://github.com/sergeyhist/metalamp-step-2.git
        cd metalamp-step-2
        npm install
        
2. Use one of the avaliable commands below.
## Available Commands
+ Development build:   
Bundle all pages and assets with **webpack.config.js** in development mode and '**./dist**' as output path.

        npm run dev
         
+ Production build:   
Bundle all pages and assets with **webpack.config.js** in production mode and '**../hist-webpages/toxin-hotel**' as output path.

        npm run prod
    
+ Start dev server:   
Run webpack dev server at http://localhost:8080 in development mode with live reloading and '**./dist**' as static files directory. 

        npm run server
    
