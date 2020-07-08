var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var f1;
var f2;
var f3;
var f4;
fs.readFile(`./new_project/index.css`, 'utf8', function(err, description) {
    var css = description;


    function list(file_list) {
        var i = 0;
        var list = `<ul>`;
        while (i < file_list.length) {
            list = list + `<li><a href = "/?id=${file_list[i]}">${file_list[i]}</a></li>`;
            i = i + 1;
        }
        list = list + `<ul>`;

        return list
    }

    function index_template_1(file_list1, file_list2, file_list3, file_list4) {
        var template = `<html>

    <head>
    <meta charset="utf-8">
        <style>
        ${css}
        ul { margin: 0;  padding: 0; }

        </style>
    </head>
    
    <body>
        <title>Alumni.net</title>
    
        <h1 class="name">MMHS 30th</h1>
        <nav class="menu">
            <li><a href="/?id=Alumni_list">Alumni list</a></li>
            <li><a href="/?id=News">News</a></li>
            <li><a href="/?id=Menu3">Menu3</a></li>
            <li><a href="/?id=Menu4">Menu4</a></li>
        </nav>
        <div class="A">
    
            <div class="box">
                <div class="child1">
                    <h2><a href="/?id=Alumni_list">Alumni list</a></h2>
                    ${file_list1}
                </div>
                <div class="child1">
                    <h2><a href="/?id=News">News</a></h2>
                    ${file_list2}
                </div>
            </div>
            <div class="box">
                <div class="child2">
                    <h2><a href="/?id=Menu3">Menu3</a></h2>
                    ${file_list3}
                </div>
                <div class="child2">
                    <h2><a href="/?id=Menu4">Menu3</a></h2>
                    ${file_list4}
                </div>
            </div>
    
        </div>
    
    </body>
    
    </html>`;

        return template;

    }



    var app = http.createServer(function(request, response) {

        var _url = request.url;
        var queryData = url.parse(_url, true).query;
        var pathname = url.parse(_url, true).pathname;

        if (pathname === '/') {

            if (queryData.id === undefined) {
                fs.readdir('./data', function(err, file_list) {

                    f1 = list(file_list);
                    response.writeHead(200);

                });
                fs.readdir('./data_1', function(err, file_list) {

                    f2 = list(file_list);
                    response.writeHead(200);

                });
                fs.readdir('./data_2', function(err, file_list) {

                    f3 = list(file_list);
                    response.writeHead(200);

                });
                fs.readdir('./data_3', function(err, file_list) {

                    f4 = list(file_list);
                    response.writeHead(200);

                });

                fs.readdir('./data', function(err, file_list) {

                    var _template = index_template_1(f1, f2, f3, f4);
                    response.writeHead(200);
                    response.end(_template);

                });




            } else {
                response.writeHead(404);
                response.end('Not found');

            }

        }
    });

    app.listen(3000);

});