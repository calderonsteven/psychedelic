(function(global, $, THREE) {

    var app, App = function(id) {
        app = this;
        app.init(id);
    };

    App.prototype = {

        init : function(id) {

            var $dom = $("#" + id);

            var scene = this.scene = window.scene = new THREE.Scene();
            var camera = this.camera = window.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.001, 1000);
            //var camera = this.camera = window.camera = new new THREE.PerspectiveCamera(90, 1, 0.001, 700);
            //camera.position.set(0, 10, 0);
            camera.position.set(0, 0, 38)

            scene.add(camera);

            //directional light
            var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
            directionalLight.name = 'mainlight';
            directionalLight.position.set( 0, 1, 0 );
            directionalLight.color.r = 0;
            directionalLight.color.g = 0.4;
            directionalLight.color.b = 0.4627450980392157;
            directionalLight.intensity = 2;

            scene.add( directionalLight );

            var renderer = new THREE.WebGLRenderer(),
                effect = new THREE.StereoEffect(renderer);

            renderer.setClearColor(0x000000);
            //renderer.setClearColor(0xffffff);
            renderer.setSize(window.innerWidth, window.innerHeight);
            $dom.append(renderer.domElement);

            var clock = new THREE.Clock();
            var controls = new THREE.OrbitControls( camera, renderer.domElement );
    				controls.enableDamping = false;
    				controls.dampingFactor = 0.25;
    				//controls.enableZoom = false;
            //controls.minPolarAngle = Math.PI / 4;
            //controls.maxPolarAngle = Math.PI / 2;

            function generateSquare(i) {
              var sizeFactor = 1,
                  skewFactor = sizeFactor / 2;

              //square
              var geometry = new THREE.Geometry();
              geometry.vertices.push(new THREE.Vector3( 0,0,skewFactor ));
              geometry.vertices.push(new THREE.Vector3( 0,sizeFactor,0 ));

              geometry.vertices.push(new THREE.Vector3( 0,sizeFactor,0 ));
              geometry.vertices.push(new THREE.Vector3( sizeFactor,sizeFactor,0 ));

              geometry.vertices.push(new THREE.Vector3( sizeFactor,sizeFactor,0 ));
              geometry.vertices.push(new THREE.Vector3( sizeFactor,0,skewFactor ));

              geometry.vertices.push(new THREE.Vector3( sizeFactor,0,skewFactor ));
              geometry.vertices.push(new THREE.Vector3( 0,0,skewFactor ));

              geometry.colors = [new THREE.Color( 0xff0000 )];
              geometry.translate( -(sizeFactor/2), -(sizeFactor/2), 0 );
              var randomColor = new THREE.Color('hsl('+i+', 50%, 50%)'),
                  mat = new THREE.LineBasicMaterial({color: randomColor}),
                  cube = new THREE.LineSegments(geometry);

              return cube;
            }

            var squares = [],
                numberOfSquares = 100;
                //numberOfSquares = 10;

            var squareTunel = new THREE.Object3D();
            squareTunel.name = "tunel";

            //for (var i = 0; i < 3; i+=.1) {
            for (var i = s = 0; i < numberOfSquares; i++, s+=.1) {
              var square = generateSquare(i);
              square.position.z = (i * 0.4);
              square.rotation.z = i;

              //square.scale.x = square.scale.y = square.scale.z = 1 + (i * 0.1);
              square.scale.x = square.scale.y = square.scale.z = ( Math.sin(s) + 2)

              squares.push(square);
              squareTunel.add(square);
            }

            scene.add(squareTunel);

            function setOrientationControls(e) {
              if (!e.alpha) {
                return;
              }

              controls = new THREE.DeviceOrientationControls(camera, true);
              controls.connect();
              controls.update();

              ControlsHandler.audioParams.useVr = true;

              //element.addEventListener('click', fullscreen, false);
              window.removeEventListener('deviceorientation', setOrientationControls, true);
            }
            window.addEventListener('deviceorientation', setOrientationControls, true);

            //boxes
            var geometry = new THREE.BoxGeometry( 1, 1, 1 );
            var material = new THREE.MeshNormalMaterial( { color: 0xffff00 } );
            var box1 = new THREE.Mesh( geometry, material );
            box1.name = 'box1';
            material.wireframe = true;
            box1.position.x = 4.38;
            box1.position.y = 3.92;
            box1.position.z = 30;
            scene.add(box1);


            //loop
            (function loop() {
              var delta = clock.getDelta();

              //move back effect
              for (var i = 0; i < squares.length; i++) {
                var square = squares[i];
                square.rotation.z += .005;
                square.position.z += .05;

                // if(square.wasScaled){
                //   square.wasScaled = false;
                //   square.scale.x = square.scale.y = square.scale.z = square.lastScaled;
                // }
                //
                // //the prefect view point is between 63 and 65
                // if(square.position.z >= (63*.4) && square.position.z <= (65*.4)){
                //   square.wasScaled = true;
                //   square.lastScaled = square.scale.y;
                //
                //   square.scale.x = square.scale.y = square.scale.z = (square.scale.z + 1.5);
                //
                //   square.name = 'XXXXX'//only debug
                // }

                if(square.position.z > (numberOfSquares * 0.4)){
                  square.position.z = 0;
                  //square.scale.x = square.scale.y = square.scale.z = 1;
                }
              }

              //detect beat
              AudioHandler.update(function() {
                beatTheTunel();
              });

              camera.updateProjectionMatrix();
              controls.update(delta);
              if(ControlsHandler.audioParams.useVr){
                  effect.render(scene, camera);
              }else{
                renderer.render(scene, camera);
              }
              requestAnimationFrame(loop);
            })();

            var beatTheTunel = function() {
              for (var i = 0; i < squares.length; i++) {
                var square = squares[i];

                if(square.wasScaled){
                  square.wasScaled = false;
                  square.scale.x = square.scale.y = square.scale.z = square.lastScaled;
                }

                //the prefect view point is between 63 and 65
                if(square.position.z >= (55*.4) && square.position.z <= (65*.4)){
                  square.wasScaled = true;
                  square.lastScaled = square.scale.y;

                  square.scale.x = square.scale.y = square.scale.z = (square.scale.z + 2.5);

                  square.name = 'XXXXX'//only debug

                  setTimeout(function() {
                    square.scale.x = square.scale.y = square.scale.z = square.lastScaled
                  }, 2000)
                }
              }
            };

            var updateRendererSize = function() {
                var w = window.innerWidth;
                var h = window.innerHeight;

                camera.aspect = w / h;
                camera.updateProjectionMatrix();

                renderer.setSize(w, h);
                effect.setSize(w, h);
            };

            $(window).on('resize', updateRendererSize);
            updateRendererSize();
        },

        restoreCamera: function(){

        }
    };

    global.App = App;

})(window, $, THREE);

$(function() {
    new App("viewer");
});
