var SquareTunel = {
  squareTunel : new THREE.Object3D(),
  squares : [],
  numberOfSquares : 20,

  init : function() {
    this.squareTunel.name = "tunel";
    this.generateTunel();
  },

  generateTunel : function(){
    for (var i = s = 0; i < this.numberOfSquares; i++, s+=.1) {
      var square = this.generateSquare(i);
      square.position.z = (i * 0.6);
      square.rotation.z = i;

      //square.scale.x = square.scale.y = square.scale.z = 1 + (i * 0.1);
      //square.scale.x = square.scale.y = square.scale.z = ( Math.sin(s) + 3)
      square.scale.x = square.scale.y = square.scale.z = 3;


      this.squares.push(square);
      this.squareTunel.add(square);
    }
  },

  generateSquare: function(){
    var sizeFactor = 1,
        skewFactor = 0//sizeFactor / 4;

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

    //geometry.colors = [new THREE.Color( 0xff0000 )];
    geometry.translate( -(sizeFactor/2), -(sizeFactor/2), 0 );
    var cube = new THREE.LineSegments(geometry);
    return cube;
  },

  update: function(){
    for (var i = 0; i < this.squares.length; i++) {
      var square = this.squares[i];
      square.rotation.z += .009;
      //square.position.z += .05;

      // if(square.position.z > (this.numberOfSquares * 0.4)){
      //   square.position.z = 0;
      // }
    }
  },

  beatTheTunel : function() {
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

        //square.name = 'XXXXX'//only debug

        setTimeout(function() {
          square.scale.x = square.scale.y = square.scale.z = square.lastScaled
        }, 2000)
      }
    }
  }
};

//detect beat
//AudioHandler.update(function() beatTheTunel(); });

window.scene.add(SquareTunel.squareTunel)
SquareTunel.init()
SquareTunel.squareTunel.position.set(8,10.14,0);
SquareTunel.squareTunel.rotation.set(0, 10.98,0 );
