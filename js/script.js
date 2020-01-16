import * as THREE from '../vendor/three.js-master/build/three.module.js';
import Stats from '../vendor/three.js-master/examples/jsm/libs/stats.module.js';
import { OrbitControls } from '../vendor/three.js-master/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from '../vendor/three.js-master/examples/jsm/loaders/FBXLoader.js';

const Scene = {
	vars: {
		container: null,
		scene: null,
		renderer: null,
		camera: null,
		stats: null,
		controls: null,
		texture: null,
		mouse: new THREE.Vector2(),
		raycaster: new THREE.Raycaster(),
		animBaseSpeed: null,
		animBasePercent: 0.00,
		animPartyStart: false,
		animPartyMin: false,
		animPartyMax: false,
		partySound: null,
		musicPlaying: false,
		sceneLoaded: false,
		text1: "DAWIN",
		text2: "PARTY",
	},
	animate: () => {
		requestAnimationFrame(Scene.animate);
		Scene.vars.raycaster.setFromCamera(Scene.vars.mouse, Scene.vars.camera);

		Scene.customBaseAnimation();
		Scene.customPartyAnimation();



		if (Scene.vars.goldGroup !== undefined) {
			let intersectsGold = Scene.vars.raycaster.intersectObjects(Scene.vars.goldGroup.children, true);

			if (intersectsGold.length > 0) {
				Scene.vars.animBaseSpeed = 0.05;
			} else {
				Scene.vars.animBaseSpeed = -0.05;
			}

		}

		if (Scene.vars.silverGroup !== undefined) {
			let intersectsSilver = Scene.vars.raycaster.intersectObjects(Scene.vars.silverGroup.children, true);

			if (intersectsSilver.length > 0) {
				console.log("SILVER");
			}
		}

		if (Scene.vars.partyGroup !== undefined) {
			let intersectsParty = Scene.vars.raycaster.intersectObjects(Scene.vars.partyGroup.children, true);



			if (intersectsParty.length > 0) {

				if (!Scene.vars.musicPlaying) {
					Scene.vars.partySound.setVolume(1);
					Scene.vars.partySound.play();
					Scene.vars.musicPlaying = true;
				}

				Scene.vars.scene.children[4].intensity = .8;
				Scene.vars.animPartyStart = true;
		
			} else {
				Scene.vars.animPartyStart = false;
				Scene.vars.bronzeGroup.children[2].rotation.x = 0;
				Scene.vars.silverGroup.children[2].rotation.x = 0;
				Scene.vars.goldGroup.children[2].rotation.z = 0;
				Scene.vars.scene.children[2].color.set(new THREE.Color(0xFFFFFF));
				Scene.vars.scene.children[3].color.set(new THREE.Color(0xFFFFFF));
				Scene.vars.scene.children[4].color.set(new THREE.Color(0xFFFFFF));
				Scene.vars.scene.children[4].intensity = 0;
				Scene.vars.animPartyMin = false;
				Scene.vars.animPartyMax = false;
				Scene.vars.startMusic = false;
				if (Scene.vars.sceneLoaded) {
					Scene.vars.partySound.stop();
					Scene.vars.musicPlaying = false;

				}
				
			}
		}



		Scene.render();
	},
	render: () => {
		Scene.vars.renderer.render(Scene.vars.scene, Scene.vars.camera);
		Scene.vars.stats.update();
	},
	customPartyAnimation: () => {
		let vars = Scene.vars;
		let speed = 0.20;
		let angle = 0.5;

		if (vars.animPartyStart == false) {
			return;
		}

		if (vars.animPartyStart) {
			

			if (!vars.animPartyMin && !vars.animPartyMax) {
				vars.bronzeGroup.children[2].rotation.x += speed;
				vars.silverGroup.children[2].rotation.x -= speed;
				vars.goldGroup.children[2].rotation.z -= speed;
				if (vars.bronzeGroup.children[2].rotation.x >= angle && vars.silverGroup.children[2].rotation.x <= -angle && vars.goldGroup.children[2].rotation.z <= -angle) {
					let r1 = Math.round(Math.random());
					let g1 = Math.round(Math.random());
					let b1 = Math.round(Math.random());

					let r2 = Math.round(Math.random());
					let g2 = Math.round(Math.random());
					let b2 = Math.round(Math.random());

					let r3 = Math.round(Math.random());
					let g3 = Math.round(Math.random());
					let b3 = Math.round(Math.random());
					vars.scene.children[2].color.set(new THREE.Color(r1, g1, b1));
					vars.scene.children[3].color.set(new THREE.Color(r2, g2, b2));
					vars.scene.children[4].color.set(new THREE.Color(r3, g3, b3));
					vars.animPartyMax = true;
				}


			} else if (vars.animPartyMin && !vars.animPartyMax) {
				vars.bronzeGroup.children[2].rotation.x += speed;
				vars.silverGroup.children[2].rotation.x -= speed;
				vars.goldGroup.children[2].rotation.z -= speed;
				if (vars.bronzeGroup.children[2].rotation.x >= angle && vars.silverGroup.children[2].rotation.x <= -angle && vars.goldGroup.children[2].rotation.z <= -angle) {

					let r1 = Math.round(Math.random());
					let g1 = Math.round(Math.random());
					let b1 = Math.round(Math.random());

					let r2 = Math.round(Math.random());
					let g2 = Math.round(Math.random());
					let b2 = Math.round(Math.random());

					let r3 = Math.round(Math.random());
					let g3 = Math.round(Math.random());
					let b3 = Math.round(Math.random());
					vars.scene.children[2].color.set(new THREE.Color(r1, g1, b1));
					vars.scene.children[3].color.set(new THREE.Color(r2, g2, b2));
					vars.scene.children[4].color.set(new THREE.Color(r3, g3, b3));
					vars.animPartyMax = true;
					vars.animPartyMin = false;
				}
			} else if (!vars.animPartyMin && vars.animPartyMax) {
				vars.bronzeGroup.children[2].rotation.x -= speed;
				vars.silverGroup.children[2].rotation.x += speed;
				vars.goldGroup.children[2].rotation.z += speed;
				if (vars.bronzeGroup.children[2].rotation.x <= -angle && vars.silverGroup.children[2].rotation.x >= angle && vars.goldGroup.children[2].rotation.z >= angle) {

					let r1 = Math.round(Math.random());
					let g1 = Math.round(Math.random());
					let b1 = Math.round(Math.random());

					let r2 = Math.round(Math.random());
					let g2 = Math.round(Math.random());
					let b2 = Math.round(Math.random());

					let r3 = Math.round(Math.random());
					let g3 = Math.round(Math.random());
					let b3 = Math.round(Math.random());
					vars.scene.children[2].color.set(new THREE.Color(r1, g1, b1));
					vars.scene.children[3].color.set(new THREE.Color(r2, g2, b2));
					vars.scene.children[4].color.set(new THREE.Color(r3, g3, b3));
					vars.animPartyMax = false;
					vars.animPartyMin = true;
				}
			}

			
		}

	},
	customBaseAnimation: () => {
		let vars = Scene.vars;

		if (vars.animBaseSpeed === null) {
			return;
		}

		vars.animBasePercent = vars.animBasePercent + vars.animBaseSpeed;

		if (vars.animBasePercent < 0) {
			vars.animBasePercent = 0;
			return;
		}
		if (vars.animBasePercent > 1) {
			vars.animBasePercent = 1;
			return;
		}

		if (vars.animBasePercent <= 0.33) {
			Scene.vars.plaquette.position.z = 45 + (75 * vars.animBasePercent);
			Scene.vars.texte.position.z = 45 + (150 * vars.animBasePercent);
		}

		if (vars.animBasePercent >= 0.20 && vars.animBasePercent <= 0.75) {
			let percent = (vars.animBasePercent - 0.2) / 0.55;
			vars.socle1.position.x = 25 * percent;
			vars.socle2.position.x = -25 * percent;
			vars.logo.position.x = 45 + 50 * percent;
			vars.logo2.position.x = -45 - 50 * percent;
		} else if (vars.animBasePercent < 0.20) {
			vars.socle1.position.x = 0;
			vars.socle2.position.x = 0;
			vars.logo.position.x = 45;
			vars.logo2.position.x = -45;
		}

		if (vars.animBasePercent >= 0.40) {
			let percent = (vars.animBasePercent - 0.4) / 0.6;
			vars.statuette.position.y = 50 * percent;
		} else if (vars.animBasePercent < 0.70) {
			vars.statuette.position.y = 0;
		}
	},

	loadFBX: (file, scale, position, rotation, color, namespace, callback) => {
		let vars = Scene.vars;
		let loader = new FBXLoader();

		if (file === undefined) {
			return;
		}

		loader.load('./fbx/' + file, (object) => {

			object.traverse((child) => {
				if (child.isMesh) {

					child.castShadow = true;
					child.receiveShadow = true;

					if (namespace === "plaquette") {
						child.material = new THREE.MeshBasicMaterial({
							map: Scene.vars.texture
						});
					}

					if (namespace === "statuette") {
						child.material = new THREE.MeshStandardMaterial({
							color: new THREE.Color(color),
							roughness: .3,
							metalness: .6
						})
					}

					child.material.color = new THREE.Color(color);
				}
			});

			object.position.x = position[0];
			object.position.y = position[1];
			object.position.z = position[2];

			object.rotation.x = rotation[0];
			object.rotation.y = rotation[1];
			object.rotation.z = rotation[2];

			object.scale.x = object.scale.y = object.scale.z = scale;
			Scene.vars[namespace] = object;

			callback();
		});

	},
	loadText: (text, scale, position, rotation, color, namespace, callback) => {
		let loader = new THREE.FontLoader();

		if (text === undefined || text === "") {
			return;
		}

		loader.load('./vendor/three.js-master/examples/fonts/helvetiker_regular.typeface.json', (font) => {
			let geometry = new THREE.TextGeometry(text, {
				font,
				size: 1,
				height: 0.1,
				curveSegments: 1,
				bevelEnabled: false
			});

			geometry.computeBoundingBox();
			let offset = geometry.boundingBox.getCenter().negate();
			geometry.translate(offset.x, offset.y, offset.z);

			let material = new THREE.MeshBasicMaterial({
				color: new THREE.Color(color)
			});

			let mesh = new THREE.Mesh(geometry, material);

			mesh.position.x = position[0];
			mesh.position.y = position[1];
			mesh.position.z = position[2];

			mesh.rotation.x = rotation[0];
			mesh.rotation.y = rotation[1];
			mesh.rotation.z = rotation[2];

			mesh.scale.x = mesh.scale.y = mesh.scale.z = scale;

			Scene.vars[namespace] = mesh;

			callback();
		});
	},
	onWindowResize: () => {
		let vars = Scene.vars;
		vars.camera.aspect = window.innerWidth / window.innerHeight;
		vars.camera.updateProjectionMatrix();
		vars.renderer.setSize(window.innerWidth, window.innerHeight);
	},
	onMouseMove: (event) => {
		Scene.vars.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		Scene.vars.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
	},
	init: () => {
		let vars = Scene.vars;

		// Préparer le container pour la scène
		vars.container = document.createElement('div');
		vars.container.classList.add('fullscreen');
		document.body.appendChild(vars.container);

		// ajout de la scène
		vars.scene = new THREE.Scene();
		vars.scene.background = new THREE.Color(0xa0a0a0);
		vars.scene.fog = new THREE.Fog(vars.scene.background, 500, 3000);

		// paramétrage du moteur de rendu
		vars.renderer = new THREE.WebGLRenderer({ antialias: true });
		vars.renderer.setPixelRatio(window.devicePixelRatio);
		vars.renderer.setSize(window.innerWidth, window.innerHeight);

		vars.renderer.shadowMap.enabled = true;
		vars.renderer.shadowMapSoft = true;

		vars.container.appendChild(vars.renderer.domElement);

		// ajout de la caméra
		vars.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
		vars.camera.position.set(-1.5, 210, 572);

		// ajout de la lumière
		const lightIntensityHemisphere = .5;
		let light = new THREE.HemisphereLight(0xFFFFFF, 0x444444, lightIntensityHemisphere);
		light.position.set(0, 700, 0);
		vars.scene.add(light);

		// ajout des directionelles
		const lightIntensity = .8;
		const d = 1000;
		let light1 = new THREE.DirectionalLight(0xFFFFFF, lightIntensity);
		light1.position.set(0, 700, 0);
		light1.castShadow = true;
		light1.shadow.camera.left = -d;
		light1.shadow.camera.right = d;
		light1.shadow.camera.top = d;
		light1.shadow.camera.bottom = -d;
		light1.shadow.camera.far = 2000;
		light1.shadow.mapSize.width = 4096;
		light1.shadow.mapSize.height = 4096;
		vars.scene.add(light1);
		// let helper = new THREE.DirectionalLightHelper(light1, 5);
		// vars.scene.add(helper);

		let light2 = new THREE.DirectionalLight(0xFFFFFF, lightIntensity);
		light2.position.set(-400, 200, 400);
		light2.castShadow = true;
		light2.shadow.camera.left = -d;
		light2.shadow.camera.right = d;
		light2.shadow.camera.top = d;
		light2.shadow.camera.bottom = -d;
		light2.shadow.camera.far = 2000;
		light2.shadow.mapSize.width = 4096;
		light2.shadow.mapSize.height = 4096;
		vars.scene.add(light2);
		// let helper2 = new THREE.DirectionalLightHelper(light2, 5);
		// vars.scene.add(helper2);

		let light3 = new THREE.DirectionalLight(0xFFFFFF, lightIntensity);
		light3.position.set(400, 200, 400);
		light3.castShadow = true;
		light3.shadow.camera.left = -d;
		light3.shadow.camera.right = d;
		light3.shadow.camera.top = d;
		light3.shadow.camera.bottom = -d;
		light3.shadow.camera.far = 2000;
		light3.shadow.mapSize.width = 4096;
		light3.shadow.mapSize.height = 4096;
		vars.scene.add(light3);
		// let helper3 = new THREE.DirectionalLightHelper(light3, 5);
		// vars.scene.add(helper3);

		let light4 = new THREE.DirectionalLight(0xFFFFFF, 0);
		light4.position.set(0, 200, 400);
		light4.castShadow = true;
		light4.shadow.camera.left = -d;
		light4.shadow.camera.right = d;
		light4.shadow.camera.top = d;
		light4.shadow.camera.bottom = -d;
		light4.shadow.camera.far = 2000;
		light4.shadow.mapSize.width = 4096;
		light4.shadow.mapSize.height = 4096;
		vars.scene.add(light4);
		// let helper4 = new THREE.DirectionalLightHelper(light4, 5);
		// vars.scene.add(helper4);

		// ajout du sol
		let mesh = new THREE.Mesh(
			new THREE.PlaneBufferGeometry(2000, 2000),
			new THREE.MeshLambertMaterial(
				{ color: new THREE.Color(0x888888) }
			)
		);
		mesh.rotation.x = -Math.PI / 2;
		mesh.receiveShadow = false;
		vars.scene.add(mesh);

		let planeMaterial = new THREE.ShadowMaterial();
		planeMaterial.opacity = 0.07;
		let shadowPlane = new THREE.Mesh(
			new THREE.PlaneBufferGeometry(2000, 2000),
			planeMaterial);
		shadowPlane.rotation.x = -Math.PI / 2;
		shadowPlane.receiveShadow = true;

		vars.scene.add(shadowPlane);

		// ajout de la texture helper du sol
		// let grid = new THREE.GridHelper(2000, 20, 0x000000, 0x000000);
		// grid.material.opacity = 0.2;
		// grid.material.transparent = true;
		// vars.scene.add(grid);

		// ajout de la sphère
		let geometry = new THREE.SphereGeometry(1000, 32, 32);
		let material = new THREE.MeshPhongMaterial({ color: new THREE.Color(0xFFFFFF) });
		material.side = THREE.DoubleSide;
		let sphere = new THREE.Mesh(geometry, material);
		vars.scene.add(sphere);

		vars.texture = new THREE.TextureLoader().load('./texture/marbre.jpg');

		let hash = document.location.hash.substr(1);
		if (hash.length !== 0) {
			let text = hash.substring();
			Scene.vars.text = decodeURI(text);
		}


		var listener = new THREE.AudioListener();
		Scene.vars.camera.add(listener);

		// create a global audio source
		Scene.vars.partySound = new THREE.Audio(listener);

		// load a sound and set it as the Audio object's buffer
		let audioLoader = new THREE.AudioLoader();
		audioLoader.load('../audio/great_spirit.mp3', function (buffer) {
			Scene.vars.partySound.setBuffer(buffer);
			Scene.vars.partySound.setLoop(true);
			Scene.vars.partySound.setVolume(0);
			Scene.vars.partySound.play();
		});


		Scene.loadFBX("Logo_Feelity.FBX", 10, [45, 22, 0], [0, 0, 0], 0xFFFFFF, 'logo', () => {
			Scene.loadFBX("Statuette.FBX", 10, [0, 0, 0], [0, 0, 0], 0xFFD700, 'statuette', () => {
				Scene.loadFBX("Socle_Partie1.FBX", 10, [0, 0, 0], [0, 0, 0], 0x1A1A1A, 'socle1', () => {
					Scene.loadFBX("Socle_Partie2.FBX", 10, [0, 0, 0], [0, 0, 0], 0x1A1A1A, 'socle2', () => {
						Scene.loadFBX("Plaquette.FBX", 10, [0, 4, 45], [0, 0, 0], 0xFFFFFF, 'plaquette', () => {
							Scene.loadText(Scene.vars.text1, 10, [0, 23, 52], [0, 0, 0], 0x1A1A1A, "texte", () => {
								Scene.loadText(Scene.vars.text2, 10, [0, 23, 52], [0, 0, 0], 0x1A1A1A, "texteParty", () => {


									let vars = Scene.vars;

									let gold = new THREE.Group();
									gold.add(vars.socle1);
									gold.add(vars.socle2);
									gold.add(vars.statuette);
									gold.add(vars.logo);
									gold.add(vars.texte);
									gold.add(vars.plaquette);


									let logo2 = vars.logo.clone();
									logo2.rotation.z = Math.PI;
									logo2.position.x = -45;
									vars.logo2 = logo2;
									gold.add(logo2);
									gold.position.z = -50;
									gold.position.y = 10;
									vars.scene.add(gold);
									vars.goldGroup = gold;

									let silver = gold.clone();
									silver.position.set(-200, 10, 0);
									silver.rotation.y = Math.PI / 4;
									silver.children[2].traverse(node => {
										if (node.isMesh) {
											node.material = new THREE.MeshStandardMaterial({
												color: new THREE.Color(0xC0C0C0),
												metalness: .6,
												roughness: .3
											})
										}
									});
									vars.scene.add(silver);
									vars.silverGroup = silver;

									let bronze = gold.clone();
									bronze.position.set(200, 10, 0);
									bronze.rotation.y = -Math.PI / 4;
									bronze.children[2].traverse(node => {
										if (node.isMesh) {
											node.material = new THREE.MeshStandardMaterial({
												color: new THREE.Color(0xCD7F32),
												metalness: .6,
												roughness: .3
											})
										}
									});
									vars.scene.add(bronze);
									vars.bronzeGroup = bronze;

									let party = gold.clone();
									party.position.set(0, 10, 100);
									party.scale.set(0.5, 0.5, 0.5);
									party.add(vars.texteParty);
									console.log(party.children);
									party.remove(party.children[4]);
									party.children[2].traverse(node => {
										if (node.isMesh) {
											node.material = new THREE.MeshStandardMaterial({
												color: new THREE.Color(0xDB10F4),
												metalness: .6,
												roughness: .3
											})
										}
									});
									vars.scene.add(party);
									vars.partyGroup = party;

									// vars.scene.add(vars.jazz);

									let elem = document.querySelector('#loading');
									elem.parentNode.removeChild(elem);
									Scene.vars.sceneLoaded = true;
								});
							});
						});
					});
				});
			});
		});


		// ajout des controles
		vars.controls = new OrbitControls(vars.camera, vars.renderer.domElement);
		vars.controls.minDistance = 300;
		vars.controls.maxDistance = 600;
		vars.controls.minPolarAngle = Math.PI / 4;
		vars.controls.maxPolarAngle = Math.PI / 2;
		vars.controls.minAzimuthAngle = - Math.PI / 4;
		vars.controls.maxAzimuthAngle = Math.PI / 4;
		vars.controls.target.set(0, 100, 0);
		vars.controls.update();

		window.addEventListener('resize', Scene.onWindowResize, false);
		window.addEventListener('mousemove', Scene.onMouseMove, false);

		vars.stats = new Stats();
		vars.container.appendChild(vars.stats.dom);

		Scene.animate();

		console.log(vars.scene.children);
	}
};

Scene.init();