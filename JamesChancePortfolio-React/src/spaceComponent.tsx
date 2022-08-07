import React, { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const SpaceComponent = () => {
  const canvasRef = React.useRef(null);
  const scene = new THREE.Scene();
  const loader = new THREE.TextureLoader();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
  const material = new THREE.MeshStandardMaterial({
    color: 0xff6346,
  });

  useEffect(() => {
    const torus = new THREE.Mesh(geometry, material);
    const pointLight = new THREE.PointLight(0xffffff);
    const ambientLight = new THREE.AmbientLight(0xffffff);
    const renderer = new THREE.WebGL1Renderer({
      canvas: canvasRef.current,
    });
    const controls = new OrbitControls(camera, renderer.domElement);

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(30);

    renderer.render(scene, camera);

    scene.add(torus);

    pointLight.position.set(5, 5, 5);

    scene.add(ambientLight, pointLight);

    function animate() {
      requestAnimationFrame(animate);
      torus.rotation.x += 0.01;
      torus.rotation.y += 0.01;
      torus.rotation.z += 0.01;
      controls.update();
      renderer.render(scene, camera);
    }

    function addStar() {
      const geometry = new THREE.SphereGeometry(0.25, 24, 24);
      const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
      const star = new THREE.Mesh(geometry, material);

      const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(100));

      star.position.set(x, y, z);
      scene.add(star);
    }

    Array(200).fill().forEach(addStar);

    scene.background = loader.load("./assets/space.jpeg");

    animate();
  });

  return <canvas ref={canvasRef}></canvas>;
};

export default SpaceComponent;
