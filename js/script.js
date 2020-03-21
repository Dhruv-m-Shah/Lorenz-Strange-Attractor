$(document).ready(function () {
    setTimeout(function(){ $("#text").fadeOut(3000);}, 3000);
});
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var camera = new THREE.PerspectiveCamera(15, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 200);
camera.lookAt(0, 4, 0);

// initial variables
var x = 10;
var y = 0;
var z = 0;
var a = 10;
var b = 28;
var c = 8 / 3;
var dt = 0.01;
// initial variables
starts = [];
startsarr = [];
values = [];
var scene = new THREE.Scene();
//create a blue LineBasicMaterial
var material = new THREE.LineBasicMaterial({
    color: 0x32CD32,
    linewidth: 2,
    linecap: 'round', //ignored by WebGLRenderer
    linejoin: 'round'

});
var geometry = new THREE.Geometry();



document.onclick = function (event) {

    starts.push(new THREE.Vector3(event.pageX, event.pageY, 0));
    startsarr.push(starts);
    values.push([event.pageX, event.pageY, 0]);

};

function animate() {
    // console.log(startsarr);
    // for (var i = 0; i < startsarr.length; i++) {
    //     dx = a * (values[i][1] - values[i][0]) * dt;
    //     dy = (values[i][0] * (b - values[i][2]) - values[i][1]) * dt;
    //     dz = (values[i][0] * values[i][1] - c * values[i][2]) * dt;
    //     startsarr[i].push(new THREE.Vector3(values[i][0] + dx, values[i][1] + dy, values[i][2] + dz));
    //     values[i][0] += dx;
    //     values[i][1] += dy;
    //     values[i][2] += dz;
    //     var geometry = new THREE.BufferGeometry().setFromPoints(startsarr[i]);
    //     var line = new THREE.Line(geometry, material);
    //     scene.add(line);
    // }

    dx = a * (y - x) * dt;
    dy = (x * (b - z) - y) * dt;
    dz = (x * y - c * z) * dt;
    x = x + dx;
    y = y + dy;
    z = z + dz;
    geometry.vertices.push(new THREE.Vector3(x, y, z));
    var line = new MeshLine();
    console.log(geometry.vertices.length);
    line.setGeometry(geometry, function (p) {
        return 0.5;
    });
    if (geometry.vertices.length > 500) {
        geometry.vertices.shift();
    }
    var material = new MeshLineMaterial({
        color: new THREE.Color("rgb(255, 2, 2)"),
        opacity: 1,
        sizeAttenuation: 1,
        lineWidth: 1,
        near: 1,
        far: 100000,
        depthTest: false,
        blending: THREE.AdditiveBlending,
        transparent: true

    });

    var mesh = new THREE.Mesh(line.geometry, material); // this syntax could definitely be improved!
    scene.add(mesh);
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
