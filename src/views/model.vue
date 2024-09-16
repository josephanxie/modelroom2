<template>
  <div id="three-container"></div>
  <router-link to="/newModel">跳转</router-link>
  <router-link to="/newModel2">跳转</router-link>
  <button @click="onLogout">登出</button>
  
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default {
  mounted() {
    this.initThree();
  },
  methods: {
    initThree() {
      // 创建场景
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xd3d3d3); // 设置天空背景为浅灰色

      // 创建相机
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(0, 5, 20);

      // 创建渲染器
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.shadowMap.enabled = true; // 启用阴影
      renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 设置阴影贴图类型
      document.getElementById('three-container').appendChild(renderer.domElement);

      // 更新窗口大小时调整相机和渲染器的大小
      window.addEventListener('resize', () => {
        // Update sizes
        const sizes = {
          width: window.innerWidth,
          height: window.innerHeight
        };
        // Update camera aspect ratio
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();
        // Update renderer
        renderer.setSize(sizes.width, sizes.height);
      });

      // 添加鼠标控制
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true; // 使动画更加流畅

      // 添加坐标轴辅助器
      const axesHelper = new THREE.AxesHelper(5);
      scene.add(axesHelper);

      // 添加环境光
      const ambientLight = new THREE.AmbientLight(0x999999, 1); // 修改环境光颜色和强度
      scene.add(ambientLight);

      // 添加半球光
      const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.5);
      hemiLight.position.set(0, 200, 0);
      scene.add(hemiLight);

      // 创建平行光
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0); // 白色平行光，强度为默认值
      directionalLight.position.set(40, 40, 20); // 设置光源位置
      directionalLight.castShadow = true; // 启用光源的阴影投射
      scene.add(directionalLight);

      // 调整阴影质量
      directionalLight.shadow.mapSize.width = 2048; // 提高阴影贴图的质量
      directionalLight.shadow.mapSize.height = 2048; // 提高阴影贴图的质量

      // 加载GLB文件
      const gltfLoader = new GLTFLoader();
      gltfLoader.load('../model2.glb', (gltf) => {
        const object = gltf.scene;
        object.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            console.log('Child Mesh:', child);

            // 修改材质属性，确保模型使用金属纹理
            child.material = new THREE.MeshStandardMaterial({
              map: new THREE.TextureLoader().load('../texture.jpg', (texture) => {
                console.log('Texture loaded', texture);
              }, undefined, (error) => {
                console.error('Error loading texture', error);
              }),
              metalness: 0.5, // 降低金属度以确保能看到光照效果
              roughness: 0.1, // 降低粗糙度以确保能看到光照效果
              envMapIntensity: 10, // 增加环境贴图的强度
            });
          }
        });

        // 调整模型的缩放和位置
        object.scale.set(50, 50, 50); // 大的缩放因子确保可见性
        object.position.set(0, 0, 1); // 将模型移到中心位置
        scene.add(object);
        console.log('Model loaded successfully');

        // Log the bounding box of the model
        const box = new THREE.Box3().setFromObject(object);
        console.log('BoundingBox:', box);

        // Center the model
        const center = box.getCenter(new THREE.Vector3());
        object.position.sub(center);
        console.log('Model centered at:', object.position);
      }, 
      (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      (error) => {
        console.error('An error happened', error);
      });

      // 渲染场景
      function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      }

      animate();
    },
    onLogout() {
      localStorage.removeItem('isLogin')
      this.$router.push('/')
    }
  }
};
</script>

<style scoped>
#three-container {
  width: 100%;
  height: 100vh;
  display: block;
}
</style>
