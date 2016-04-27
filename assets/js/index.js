(function(global, $, THREE) {

    var app, App = function(id) {
        app = this;
        app.init(id);
    };

    App.prototype = {

        init : function(id) {

            var $dom = $("#" + id);

            var scene = this.scene = window.scene = new THREE.Scene();
            var camera = this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.001, 1000);

            camera.position.x = 0;
            camera.rotation.y = 0;
            camera.position.z = 38;

            scene.add(camera);

            //directional light
            var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
            directionalLight.position.set( 0, 1, 0 );
            directionalLight.color.r = 0;
            directionalLight.color.g = 0.4;
            directionalLight.color.b = 0.4627450980392157;
            directionalLight.intensity = 2;

            scene.add( directionalLight );

            var renderer = new THREE.WebGLRenderer({
                alpha: true,
                antialias: true
            });

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
                  skewFactor = sizeFactor / 4;

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

            //for (var i = 0; i < 3; i+=.1) {
            for (var i = 0; i < numberOfSquares; i++) {
              var square = generateSquare(i);
              square.position.z = (i * 0.4);
              square.rotation.z = i;
              square.scale.x = square.scale.y = square.scale.z = 1 + (i * 0.1);
              squares.push(square);
              scene.add(square);
            }

            (function loop() {
              var delta = clock.getDelta();

              for (var i = 0; i < squares.length; i++) {
                var square = squares[i];
                square.rotation.z += .005;
                square.position.z += .09;

                if(square.position.z > (numberOfSquares * 0.4)){
                  square.position.z = 0;
                  //square.scale.x = square.scale.y = square.scale.z = 1;
                }
              }

              controls.update();
              renderer.render(scene, camera);
              requestAnimationFrame(loop);
            })();

            var updateRendererSize = function() {
                var w = window.innerWidth;
                var h = window.innerHeight;

                camera.aspect = w / h;
                camera.updateProjectionMatrix();

                renderer.setSize(w, h);
            };

            $(window).on('resize', updateRendererSize);
        }

    };

    global.App = App;

})(window, $, THREE);

$(function() {
    new App("viewer");
});
