jQuery(document).ready(function($){
	var main_color = 0x009EF2;

	var canvas_height = window.innerHeight;
	var canvas_width = window.innerWidth;
	//////////////////////////////////////////
	  //   Scene
	//////////////////////////////////////////
	var scene = new THREE.Scene();
	scene.fog = new THREE.FogExp2( main_color, 0.0045 );

	//////////////////////////////////////////
	  //   Camera
	//////////////////////////////////////////
	var camera = new THREE.PerspectiveCamera( 75, canvas_width/canvas_height, 0.1, 1000 );
	camera.lookAt(new THREE.Vector3(0,50,0));
	camera.position.set(0,50,200);
	//////////////////////////////////////////
	  //   Renderer
	//////////////////////////////////////////
	var renderer = new THREE.WebGLRenderer({ alpha: true }); /// { alpha: true }
	renderer.setSize( canvas_width, canvas_height );
	renderer.shadowMapEnabled = true;
	renderer.shadowMapType = THREE.PCFSoftShadowMap;
	renderer.setClearColor(main_color,1);
	$('body').append( renderer.domElement );


	//////////////////////////////////////////
	  //   Resize
	//////////////////////////////////////////
	window.onresize = function(){
		canvas_height = window.innerHeight;
		canvas_width = window.innerWidth;
		camera.aspect = canvas_width / canvas_height;
		camera.updateProjectionMatrix();
		renderer.setSize( canvas_width, canvas_height );
	}
	//////////////////////////////////////////
	  //   Controls
	//////////////////////////////////////////

	controls = new THREE.OrbitControls( camera );
	controls.damping = 0.2;
	controls.maxPolarAngle = Math.PI/2;
	controls.minPolarAngle = 1;
	controls.minDistance = 100;
	controls.maxDistance = 220;
	controls.enabled = false;
	$('canvas').on( "mouseenter", function(e) {
		controls.enabled = true;
	});
	$('canvas').on( "mouseleave", function(e) {
		controls.enabled = false;
	});
	//////////////////////////////////////////
	  //    Light
	//////////////////////////////////////////
	var spotLight = new THREE.SpotLight(0xffffff);
	  spotLight.position.set( 0, 100, 100 );
	  spotLight.intensity = 1;
	  spotLight.castShadow = true;
	  scene.add(spotLight);
	//////////////////////////////////////////
	  //    Particles
	//////////////////////////////////////////
	var particles = new THREE.Geometry();
	// Cross Origin
	// loading the image from a different url
	// causes Security issues that you can fix like this

	THREE.ImageUtils.crossOrigin = true;

	// Particle Material
	var pMaterial = new THREE.PointCloudMaterial({
	    color: 0xffffff,
	    size: 1,
	    transparent:true,
	    opacity:.25,
	    map : THREE.ImageUtils.loadTexture(
	      "../images/gradient.png"
	    )
	  });

	// make 10.000 of Particles
	for(var i=0;i<10000;i++){
		var x = (Math.random() - 0.5 ) * 400;
		var y = (Math.random() - 0.5 ) * 400;
		var z = (Math.random() - 0.5 ) * 400;
		particles.vertices.push(new THREE.Vector3(x,y,z));
	}
	// make 10.000 of Particles
	var particleSystem = new THREE.PointCloud(particles,pMaterial);
	scene.add(particleSystem);
	//////////////////////////////////////////
	  //    Terrain Geometry
	//////////////////////////////////////////

	function terrain_obj(){
		this.terrain_geometry =  new THREE.PlaneGeometry(canvas_width * 2,canvas_height*2, 128,128);
		this.terrain_material = new THREE.MeshLambertMaterial({
	  	color: main_color

		});
		this.terrain_wire_material = new THREE.MeshLambertMaterial({
		  color: 0x000000,
		  wireframe: true,
		  transparent: true
		});
		this.terrain_wire = null;
		this.generate = function(){
		   for(var i=0;i<this.terrain_geometry.vertices.length;i++){
		      this.terrain_geometry.vertices[i].z = Math.random() * 20;
		   }
			 this.terrain =  new THREE.Mesh(this.terrain_geometry,this.terrain_material);
			 this.terrain_top =  new THREE.Mesh(this.terrain_geometry.clone(),this.terrain_material);
			 this.terrain_wire =  new THREE.Mesh(this.terrain_geometry.clone(),this.terrain_wire_material);
			 this.terrain.rotation.x = -Math.PI / 2;
			 this.terrain.position.y = -20;



			 this.terrain_top.rotation.x = Math.PI / 2;
			 this.terrain_top.position.y = 130;

			 this.terrain_wire.rotation.x = -Math.PI / 2;
			 this.terrain_wire.position.y = -19.9;
			 this.terrain.receiveShadow = true;
			 this.terrain.castShadow = true;

			 scene.add(this.terrain,this.terrain_wire,this.terrain_top);
			 return this;
		};
		this.generate();
	}
	var terrain_bottom = terrain_obj();



	var loader = new THREE.JSONLoader();
	var material_options = {
		emissive : 0xffffff,
		color: 0x000000,
		opacity: .5,
		// transparent:true
	}
	var wire_material_options = {
		wireframe : true,
		wireframeLinewidth :2,
		color : 0xffffff
	}
	// load hirsch
	loader.load(
		// resource URL
		"./js/hirsch.js",
		// Function when resource is loaded
		function ( geometry, materials ) {
		  var material = new THREE.MeshLambertMaterial( material_options );
		  var wire_material = new THREE.MeshBasicMaterial( wire_material_options );
		  var hirsch = new THREE.Mesh( geometry, material );
		  hirsch.scale.set(20,20,20);
		  hirsch.position.set(0,0,0);
		  //hirsch.rotation.set(0,Math.PI/2 * -1,0);
		  var hirsch_wire = new THREE.Mesh(geometry.clone(),wire_material);
		  hirsch_wire.scale.set(20.01,20.01,20.01);
		  scene.add( hirsch,hirsch_wire );
		}
	);

	//////////////////////////////////////////
	  //   Render
	//////////////////////////////////////////
	var render = function () {
		requestAnimationFrame( render );
		animation();
		renderer.render(scene, camera);
	};
	//////////////////////////////////////////
	  //    Animation
	//////////////////////////////////////////
	function animation(){
		scene.rotation.y  -= .0005;
	}
	//////////////////////////////////////////
	  //    Start scene
	//////////////////////////////////////////
	render();


});
