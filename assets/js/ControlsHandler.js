
var ControlsHandler = function() {


	var audioParams = {
		useMic: false,
		useSample:true,
		volSens:1,
		beatHoldTime:40,
		beatDecayRate:0.97,
		sampleURL: './assets/audio/LetterOfIntent.mp3'
	};

	function init(){

		//Init DAT GUI control panel
		gui = new dat.GUI();
		$('#viewer').append(gui.domElement);
		var f2 = gui.addFolder('Settings');
		//f2.add(audioParams, 'useMic').listen().onChange(AudioHandler.onUseMic).name("Use Mic");
		f2.add(audioParams, 'volSens', 0, 5).step(0.1).name("Gain");
		f2.add(audioParams, 'beatHoldTime', 0, 100).step(1).name("Beat Hold");
		f2.add(audioParams, 'beatDecayRate', 0.9, 1).step(0.01).name("Beat Decay");
		f2.add(audioParams, 'useRestoreCamera')
			.listen()
			.onChange(function(){
				window.camera.position.x = 0;
				window.camera.rotation.y = 0;
				window.camera.position.z = 38;

				window.camera.rotation.x = window.camera.rotation.y = window.camera.rotation.z = 0;
			})
			.name("Restore Camera");


		f2.open();

		//AudioHandler.onUseMic();
		//AudioHandler.onUseSample();

	}

	return {
		init:init,
		audioParams: audioParams,
	};
}();

ControlsHandler.init();
