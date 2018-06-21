var root = '//files.facer2vm.org/view/';
root = 'data/';

var camera;
var controls;
var renderer;
var scene;

var clock = new THREE.Clock();

init();
animate();

function init() {
  var container = document.getElementById('container');
  var dl_button = document.getElementById('dlbtn');
  
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xbfd1e5);
  
  if (location.hash) {
    var loader = new THREE.MapLoader();
    var name = location.hash.substr(1).match(/[\w-]*/)[0];
    var mapfile = name + '.map';
    var zipfile = name + '.zip';
    loader.setPath(root);
    loader.load(mapfile, function (mesh) {scene.add(mesh);});
    dl_button.href = root + zipfile;
  }
  
  camera = new THREE.PerspectiveCamera(50, 4/3, 1, 20000);
  camera.position.z = 400;
  camera.up = new THREE.Vector3(0, 1, 0);
  camera.lookAt(scene.position);
  
  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(400, 300);
  
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.addEventListener('change', render);
  
  container.innerHTML = '';
  container.appendChild(renderer.domElement);
  
  window.addEventListener('resize', onWindowResize, false);
  onWindowResize();
}

function onWindowResize() {
  var w = window.innerWidth;
  var h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
  //controls.handleResize();
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  //controls.update(clock.getDelta());
  renderer.render(scene, camera);
}
