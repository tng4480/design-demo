import * as THREE from './vendor/three.module.js';

export function mountPlayground(el, paused, notify) {
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-5, 5, 3.3, -3.3, .1, 100);
  camera.position.set(7, 8, 7);
  camera.lookAt(0, .4, 0);
  const renderer = new THREE.WebGLRenderer({alpha: true, antialias: true, powerPreference: 'low-power'});
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5));
  renderer.setClearColor('#e5e9df', 1);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.domElement.setAttribute('aria-label', 'Interactive isometric town. Drag to rotate; click an empty plot to build.');
  el.prepend(renderer.domElement);
  scene.add(new THREE.AmbientLight('#ffffff', 2.2));
  const light = new THREE.DirectionalLight('#fff2dd', 3);
  light.position.set(4, 8, 5);
  scene.add(light);
  const town = new THREE.Group();
  scene.add(town);
  const resources = new Set(), tiles = [], buildings = new Map();
  const material = (color) => {
    const m = new THREE.MeshStandardMaterial({color, roughness: .75});
    resources.add(m);
    return m;
  };
  const mats = {base: material('#b9c5ae'), path: material('#d2d8ca'), lawn: material('#a6bd96'), trunk: material('#9f886c'), leaf: material('#769b72'), window: material('#e8f2ee')};
  const colors = ['#8da6c4', '#b9a1c9', '#c3aa82', '#8aafa2'];
  const mesh = (geometry, mat, position, parent = town) => {
    resources.add(geometry);
    const object = new THREE.Mesh(geometry, mat);
    object.position.set(...position);
    parent.add(object);
    return object;
  };
  mesh(new THREE.BoxGeometry(5.1, .25, 5.1), mats.base, [0, -.28, 0]);
  for (let z = -2; z <= 2; z++) for (let x = -2; x <= 2; x++) {
    const road = x === 0 || z === 0;
    const tile = mesh(new THREE.BoxGeometry(.9, .09, .9), road ? mats.path : mats.lawn, [x, -.1, z]);
    tile.userData = {x, z, road, key: `${x},${z}`};
    tiles.push(tile);
    if (road) mesh(new THREE.BoxGeometry(.035, .01, .26), mats.window, [x, -.045, z]);
  }
  const plots = tiles.filter(t => !t.userData.road);
  function tree(x, z) {
    const group = new THREE.Group(); town.add(group);
    group.position.set(x, 0, z);
    mesh(new THREE.CylinderGeometry(.035, .05, .38, 7), mats.trunk, [0, .15, 0], group);
    mesh(new THREE.IcosahedronGeometry(.24, 1), mats.leaf, [0, .45, 0], group);
    return group;
  }
  tree(-2.28, -1.25); tree(2.27, 1.2); tree(-1.3, 2.27); tree(1.25, -2.28);
  function update() {
    el.querySelector('.town-status').textContent = `${buildings.size} / ${plots.length} plots built`;
    el.querySelector('[data-town=build]').disabled = buildings.size === plots.length;
  }
  function build(tile, animated = true) {
    const {key, x, z} = tile.userData;
    if (tile.userData.road || buildings.has(key)) return;
    const group = new THREE.Group();
    group.position.set(x, 0, z); town.add(group);
    const height = .5 + ((x + z + 8) % 4) * .25;
    const wall = material(colors[(x - z + 8) % colors.length]);
    mesh(new THREE.BoxGeometry(.62, height, .62), wall, [0, height / 2, 0], group);
    mesh(new THREE.BoxGeometry(.68, .06, .68), mats.window, [0, height + .03, 0], group);
    for (let floor = .2; floor < height - .1; floor += .25) for (const offset of [-.17, .17]) {
      mesh(new THREE.BoxGeometry(.095, .105, .018), mats.window, [offset, floor, .318], group);
      mesh(new THREE.BoxGeometry(.018, .105, .095), mats.window, [.318, floor, offset], group);
    }
    group.scale.y = animated && !paused() ? .02 : 1;
    buildings.set(key, group);
    update();
  }
  const seed = () => { for (const index of [0, 3, 5, 8, 10, 15]) build(plots[index], false); };
  seed();
  const raycaster = new THREE.Raycaster(), pointer = new THREE.Vector2();
  let hovered, drag, moved = false, targetRotation = 0, frame;
  const handlers = [];
  const on = (node, event, fn) => {node.addEventListener(event, fn); handlers.push(() => node.removeEventListener(event, fn));};
  function pick(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.set((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1);
    raycaster.setFromCamera(pointer, camera);
    return raycaster.intersectObjects(tiles)[0]?.object;
  }
  on(renderer.domElement, 'pointerdown', event => {
    drag = {x: event.clientX, rotation: targetRotation}; moved = false;
    renderer.domElement.setPointerCapture(event.pointerId);
  });
  on(renderer.domElement, 'pointermove', event => {
    if (drag) { const dx = event.clientX - drag.x; moved ||= Math.abs(dx) > 5; targetRotation = drag.rotation + dx * .012; }
    if (hovered) hovered.scale.y = 1;
    hovered = pick(event);
    if (hovered && !hovered.userData.road && !buildings.has(hovered.userData.key)) hovered.scale.y = 1.8;
  });
  on(renderer.domElement, 'pointerup', event => {
    if (drag && !moved) { const tile = pick(event); if (tile) build(tile); }
    drag = undefined;
  });
  on(renderer.domElement, 'pointercancel', () => drag = undefined);
  on(renderer.domElement, 'pointerleave', () => { if (hovered) hovered.scale.y = 1; hovered = undefined; });
  on(el.querySelector('.town-controls'), 'click', event => {
    const action = event.target.closest('[data-town]')?.dataset.town;
    if (action === 'rotate') targetRotation += Math.PI / 2;
    if (action === 'build') {
      const tile = plots.find(t => !buildings.has(t.userData.key));
      if (tile) build(tile);
    }
    if (action === 'reset') {
      buildings.forEach(group => town.remove(group)); buildings.clear(); targetRotation = 0; seed();
      notify('Playground reset.');
    }
  });
  const resize = () => {
    const rect = el.getBoundingClientRect(), aspect = rect.width / rect.height;
    camera.left = -3.3 * aspect; camera.right = 3.3 * aspect; camera.updateProjectionMatrix();
    renderer.setSize(rect.width, rect.height); renderer.render(scene, camera);
  };
  const observer = new ResizeObserver(resize); observer.observe(el); resize();
  function render() {
    town.rotation.y += paused() ? targetRotation - town.rotation.y : (targetRotation - town.rotation.y) * .12;
    buildings.forEach(group => group.scale.y += paused() ? 1 - group.scale.y : (1 - group.scale.y) * .13);
    renderer.render(scene, camera); frame = requestAnimationFrame(render);
  }
  render();
  return () => {cancelAnimationFrame(frame); observer.disconnect(); handlers.forEach(fn => fn()); resources.forEach(r => r.dispose()); renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove();};
}
