/**
 * Created by sam on 16-7-25.
  * Updated by Ugo on 17-09-23.
 */


var exec= require('child_process').exec;
var spawn= require('child_process').spawn;
var StringDecoder = require('string_decoder').StringDecoder;

var async = require('async');

module.exports = function (grunt) {


    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-apidoc');
    grunt.loadNpmTasks('grunt-aws-s3');

    grunt.config.init({

        copy: {

            build: {
                files: [
                    {
                        expand: true,
                        cwd: 'api',
                        src: ['**'],
                        dest: 'build/api/',
                        filter: 'isFile'
                    }
                ]

            },

            build2: {
                files: [
                    {
                        expand: true,
                        src: ['package.json'],
                        dest: 'build/',
                        filter: 'isFile'
                    },
                     {
                        expand: true,
                        src: ['server.js'],
                        dest: 'build/',
                        filter: 'isFile'
                    }
                ]

             },

            build3: {
                files: [
                    {
                        expand: true,
                        cwd: 'helper',
                        src: ['**'],
                        dest: 'build/helper/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: 'node_modules',
                        src: ['**/*', '!**/electron-prebuilt/**', '!**/grunt/**', '!**/electron-download/**'],
                        dest: 'build/node_modules',
                        filter: 'isFile'
                    }
                ]

            }

        },

        apidoc: {
            myapp: {
                src: "api/routes/",
                dest: "apidocs/"
            }
        }




    });



    grunt.registerTask('testLocal', 'Test the local Index instance', function () {

        var done = this.async();

        var server = spawn('node', ['server'], {maxBuffer: 1024 * 10500});
        var decoder = new StringDecoder('utf8');

        var which = grunt.option('file');

        var error = false;


        server.stdout.on('data', function (data) {

            var output = decoder.write(data);
            grunt.log.write("Server: " + output);


        });


        server.stderr.on('data', function (data) {
            grunt.log.error("A problem ocurred with the server while testing the local server " + decoder.write(data));
          //  error = true;
        });


        //Testing code

        var startTest = function () {


            var child;

            if(which){

                child = safeSpawn('mocha', ['test/' + which + '_test', '--l'], {maxBuffer: 1024 * 10500});
            } else{
                child = safeSpawn('mocha', ['test', '--l'], {maxBuffer: 1024 * 10500});
            }

            child.stdout.on('data', function (data) {
                var output = decoder.write(data);
                grunt.log.write("Test: " + output);
            });


            child.stderr.on('data', function (data) {
                grunt.log.error("Test: A problem ocurred in the mocha test of the locally run  server: " + decoder.write(data));

               // server.kill();
            //    grunt.fail.warn("Error running local test server - restoring backup");
            });


            child.on('close', function () {
                if (error) {
                    server.kill();
                    grunt.fail.warn("Error running local test server - restoring backup");
                }

                grunt.log.write("Finished testing");

                server.kill();
                done();
            });


        };

        setTimeout(startTest, 2000);


    });

    grunt.registerTask('buildDocker', 'build the local version of docker', function (version) {

        var done = this.async();

        var cmd = ['build', '-t', 'uugo/todo-api', '.'];
        if(version) cmd = ['build', '-t', 'uugo/todo-api:' + version, '.'];


        var process = spawn('docker', cmd, {maxBuffer: 1024 * 10500, cwd:'build'});
        var decoder = new StringDecoder('utf8');

        process.stdout.on('data', function (data) {
            var output = decoder.write(data);
            grunt.log.write("Server: " + output);
        });


        process.stderr.on('data', function (data) {
            grunt.log.error("A problem ocurred with the server while testing the local server " + decoder.write(data));
            grunt.fail.warn("Error running local build to server - restoring backup");
        });


        process.on('close', function () {
            grunt.log.write("Built docker");
            done();
        });



    });


    grunt.registerTask('testStaging', 'Test the staging for docker', function () {


        var done = this.async();
        var which = grunt.option('file');
        var decoder = new StringDecoder('utf8');


        var child;

        if(which){

            child = safeSpawn('mocha', ['test/' + which + '_test', '--s'], {maxBuffer: 1024 * 10500});
        } else{
            child = safeSpawn('mocha', ['test', '--s'], {maxBuffer: 1024 * 10500});
        }




        child.stdout.on('data', function (data) {
            var output = decoder.write(data);
            grunt.log.write("Test: " + output);
        });


        child.stderr.on('data', function (data) {
            grunt.log.error("Test: A problem ocurred in the mocha test of the locally run  server: " + decoder.write(data));

        });


        child.on('close', function () {

            grunt.log.write("Finished testing");
            done();
        });


    });


    grunt.registerTask('testProduction', 'Test the staging for docker', function () {



        var done = this.async();
        var which = grunt.option('file');
        var decoder = new StringDecoder('utf8');


        var child;

        if(which){

            child = safeSpawn('mocha', ['test/' + which + '_test', '--p'], {maxBuffer: 1024 * 10500});
        } else{
            child = safeSpawn('mocha', ['test', '--p'], {maxBuffer: 1024 * 10500});
        }




        child.stdout.on('data', function (data) {
            var output = decoder.write(data);
            grunt.log.write("Test: " + output);
        });


        child.stderr.on('data', function (data) {
            grunt.log.error("Test: A problem ocurred in the mocha test of the locally run  server: " + decoder.write(data));

        });


        child.on('close', function () {

            grunt.log.write("Finished testing");
            done();
        });


    });


    grunt.registerTask('testLocalDocker', 'Test the local Index instance', function () {

        var done = this.async();

        var envVars = ['MONGO_INTERNAL_ADMIN_USER', 'MONGO_INTERNAL_ADMIN_PW', 'TOKEN_SECRET', 'AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'EXPRESS_PAY_MERCHANT_ID', 'EXPRESS_PAY_API_KEY', 'DEV_SECRET', 'FCM_SERVER_KEY', 'FCM_SERVER_KEY_CLIENT', 'POST_MASTER_KEY'];

        var runArray = ['run'];

        envVars.forEach(function (key) {

            runArray.push('-e');
            runArray.push(key + "=" + process.env[key]);
        });

        runArray.push('-p');
        runArray.push('5000:5000');
        runArray.push('uugo/todo-api:local');

        var server = spawn('docker',  runArray , {maxBuffer: 1024 * 10500});
        var decoder = new StringDecoder('utf8');

        var which = grunt.option('file');

        var error = false;


        server.stdout.on('data', function (data) {

            var output = decoder.write(data);
            grunt.log.write("Server: " + output);


        });


        server.stderr.on('data', function (data) {
            grunt.log.error("A problem ocurred with the server while testing the local server " + decoder.write(data));

            //  error = true;
        });




        //Testing code

        var startTest = function () {


            var child;

            if(which){

                child = safeSpawn('mocha', ['test/' + which + '_test', '--l'], {maxBuffer: 1024 * 10500});
            } else{
                child = safeSpawn('mocha', ['test', '--l'], {maxBuffer: 1024 * 10500});
            }


            child.stdout.on('data', function (data) {
                var output = decoder.write(data);
                grunt.log.write("Test: " + output);
            });


            child.stderr.on('data', function (data) {
                grunt.log.error("Test: A problem ocurred in the mocha test of the locally run  server: " + decoder.write(data));

                //server.kill();
             //   grunt.fail.warn("Error running local test server - restoring backup");
            });


            child.on('close', function () {
                if (error) {
                    server.kill();
                    grunt.fail.warn("Error running local test server - restoring backup");
                }

                grunt.log.write("Finished testing");

                server.kill();
                done();
            });


        };

        setTimeout(startTest, 2000);


    });


    // grunt.registerTask('pushStaging', 'Redoploy latest image on staging ', function () {


    //     var done = this.async();

    //     var cmd = 'docker run ';
    //     cmd = cmd + ' -e DOCKERCLOUD_USER=' + process.env.MONGO_INTERNAL_ADMIN_USER;
    //     cmd = cmd + ' -e DOCKERCLOUD_PASS=' + process.env.MONGO_INTERNAL_ADMIN_PW;
    //     cmd = cmd + ' -e DOCKERCLOUD_NAMESPACE=dotlearn';
    //     cmd = cmd + ' dockercloud/cli service redeploy 32d5ddf0';


    //     exec(cmd, {}, function(err, stdout, stderr){


    //         if(err) return grunt.fail.warn(err);

    //         if(stderr) grunt.log.error(stderr);


    //         grunt.log.write(stdout);

    //         grunt.log.write("Done restarting staging server");

    //         done();

    //     });


    // });


    // grunt.registerTask('pushProduction', 'Redoploy latest image on production ', function () {


    //     var done = this.async();

    //     var cmd = 'docker run ';
    //     cmd = cmd + ' -e DOCKERCLOUD_USER=' + process.env.MONGO_INTERNAL_ADMIN_USER;
    //     cmd = cmd + ' -e DOCKERCLOUD_PASS=' + process.env.MONGO_INTERNAL_ADMIN_PW;
    //     cmd = cmd + ' -e DOCKERCLOUD_NAMESPACE=dotlearn';
    //     cmd = cmd + ' dockercloud/cli service redeploy a9328606';


    //     exec(cmd, {}, function(err, stdout, stderr){


    //         if(err) return grunt.fail.warn(err);

    //         if(stderr) grunt.log.error(stderr);


    //         grunt.log.write(stdout);

    //         grunt.log.write("Done restarting production server");

    //         done();

    //     });


    // });

    grunt.registerTask('pushDocker', 'Push the docker instance to the docker cloud', function (version) {

        var done = this.async();
        var cmd = ['push',  'uugo/todo-api'];
        if(version) cmd = ['push',  'uugo/todo-api:' + version];
        var process = spawn('docker', cmd, {maxBuffer: 1024 * 10500});
        var decoder = new StringDecoder('utf8');
        process.stdout.on('data', function (data) {
            var output = decoder.write(data);
            grunt.log.write("Server: " + output);
        });
        process.stderr.on('data', function (data) {
            grunt.log.error("A problem ocurred with the server while testing the local server " + decoder.write(data));
        });
        process.on('close', function () {
            grunt.log.write("Built docker");
            done();
        });

    });


    grunt.registerTask('apis', [ 'apidoc']);

    grunt.registerTask('build',['copy:build', 'copy:build2', 'copy:build3']);

    grunt.registerTask('local', ['buildDocker:local','testLocalDocker']);

   // grunt.registerTask('staging', ['buildDocker:staging', 'pushDocker:staging', 'pushStaging']);

  //  grunt.registerTask('production', ['buildDocker:production', 'pushDocker:production', 'pushProduction']);

  //  grunt.registerTask('push', ['build', 'staging', 'production']);

};


function safeSpawn(root, commands, options){


    var sp;

    if (!/^win/.test(process.platform)) sp = spawn(root, commands, options);
    else {
        // windows
        sp = spawn('cmd', ['/s', '/c', root].concat(commands), options);
    }

    return sp;

}
