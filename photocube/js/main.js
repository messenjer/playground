$(function() {

	var renderer = null,
		scene = null,
		camera = null,
		cube = null,
		animating = false,

		streaming = false,
		video = $('#video').get(0),
		canvas = $('#canvas').get(0),
		photo = $('#photo').get(0),
		$startbutton = $('#startbutton'),
		width = 200,
		height = 150;

	function onLoad() {

		// Grab our container div
		var container = document.getElementById("cube");

		// Create the Three.js renderer, add it to our div
		renderer = new THREE.WebGLRenderer({
			antialias: true
		});
		renderer.setSize(container.offsetWidth, container.offsetHeight);
		container.appendChild(renderer.domElement);

		// Create a new Three.js scene
		scene = new THREE.Scene();

		// Put in a camera
		camera = new THREE.PerspectiveCamera(45, container.offsetWidth / container.offsetHeight, 1, 4000);
		camera.position.set(0, 0, 3);

		// Create a directional light to show off the object
		var light = new THREE.DirectionalLight(0xffffff, 1.5);
		light.position.set(0, 0, 1);
		scene.add(light);

		// Create a shaded, texture-mapped cube and add it to the scene
		// First, create the texture map
		var mapUrl = "images/molumen_small_funny_angry_monster.jpg";
		var map = THREE.ImageUtils.loadTexture(mapUrl);

		// Now, create a Phong material to show shading; pass in the map
		var material = new THREE.MeshPhongMaterial({
			map: map
		});

		// Create the cube geometry
		var geometry = new THREE.CubeGeometry(1, 1, 1);

		// And put the geometry and material together into a mesh
		cube = new THREE.Mesh(geometry, material);

		// Turn it toward the scene, or we won't see the cube shape!
		cube.rotation.x = Math.PI / 5;
		cube.rotation.y = Math.PI / 5;

		// Add the cube to our scene
		scene.add(cube);

		// Run our render loop
		run();
	}

	function run() {
		// Render the scene
		renderer.render(scene, camera);
		cube.rotation.y -= 0.01;

		// Ask for another frame
		requestAnimationFrame(run);
	}

	navigator.getMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

	navigator.getMedia(

	// constraints
	{
		video: true,
		audio: false
	},

	// successCallback

	function(localMediaStream) {
		video.src = window.URL.createObjectURL(localMediaStream);
		video.onloadedmetadata = function(e) {
			// Do something with the video here.
			video.play();
		};
	},

	// errorCallback

	function(err) {
		console.log("The following error occured: " + err);
	}

	);

	video.addEventListener('canplay', function(e) {
		if(!streaming) {
			video.setAttribute('width', width);
			video.setAttribute('height', height);
			canvas.setAttribute('width', width);
			canvas.setAttribute('height', height);
			streaming = true;
		}
	}, false);

	function takepicture() {
		canvas.width = width;
		canvas.height = height;
		canvas.getContext('2d').drawImage(video, 0, 0, width, height);
		var data = canvas.toDataURL('image/png');
		photo.setAttribute('src', data);
	}

	$startbutton.click(function(e) {
		e.preventDefault();
		takepicture();
	});

	onLoad();

})