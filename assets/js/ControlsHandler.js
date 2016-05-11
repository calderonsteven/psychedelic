
var ControlsHandler = function() {


	var audioParams = {
		useMic: false,
		useSample:true,
		useVr:false,
		volSens:1,
		beatHoldTime:40,
		beatDecayRate:0.97,
		sampleURL: './assets/audio/tame.mp3',
		restoreCamera : function(){
			window.camera.position.x = 0;
			window.camera.position.y = 0;
			window.camera.position.z = 38;

		},
		loadSong : function(){
			AudioHandler.init();
			AudioHandler.loadSampleAudio();
		},
		toggleSound : function(){
			AudioHandler.onTogglePlay();
		}
	};

	function init(){

		//Init DAT GUI control panel
		gui = new dat.GUI();
		$('#viewer').append(gui.domElement);
		var f2 = gui.addFolder('Control');
		// f2.add(audioParams, 'useMic').listen().onChange(AudioHandler.onUseMic).name("Use Mic");
		// f2.add(audioParams, 'volSens', 0, 5).step(0.1).name("Gain");
		// f2.add(audioParams, 'beatHoldTime', 0, 100).step(1).name("Beat Hold");
		// f2.add(audioParams, 'beatDecayRate', 0.9, 1).step(0.01).name("Beat Decay");
		f2.add(audioParams, 'restoreCamera').name("Restore Camera");
		f2.add(audioParams, 'loadSong').name("Play Song");
		// f2.add(audioParams, 'toggleSound').name("Toggle Song");
		// f2.add(audioParams, 'useVr').listen().onChange(function(){
		// 	//$('.dg.main').remove();
		// 	$(window).resize();
		// }).name("Use Vr");

		f2.open();
	}

	return {
		init:init,
		audioParams: audioParams,
	};
}();

ControlsHandler.init();
