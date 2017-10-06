import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';

import DraggableCube from './DraggableCube';

import styles from './styles.module.css';

class DraggableCubes extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = { width: '0', height: '0' };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    const cameraPosition = new THREE.Vector3(0, 300, 300);
    const cameraRotation = new THREE.Euler();

    this.lightPosition = new THREE.Vector3(0, 0, 3000);
    this.lightTarget = new THREE.Vector3(0, 0, 0);

    const cubePositions = [];
    cubePositions.length = 100;

    for (let i = 0; i < 100; ++i) {
      cubePositions[i] = new THREE.Vector3(
        (Math.random()-0.5) * 1000,
        (Math.random()-0.5) * 1000,
        (Math.random()-0.5) * 1000
      );
    }

    const cubes = [];
    cubes.length = cubePositions.length;

    this.cubes = cubes;
    this.cubePositions = cubePositions;

  }

  _onAnimate = () => {

    var minVelocity = 0.02,
        maxVelocity = 0.05;

    //let isReverse = Math.random();

    for (let i = 0; i < 100; ++i) {
      /*
      if(this.cubes[i].isReverse) {
        this.cubes[i].rotation.y += Math.random() * 0.01;
        this.cubes[i].rotation.x += Math.random() * 0.01;
      } else {
        this.cubes[i].rotation.y -= Math.random() * 0.01;
        this.cubes[i].rotation.x -= Math.random() * 0.01;
      }*/
      this.cubes[i].rotation.y += 0.006;
      this.cubes[i].rotation.x -= 0.006;

      if(this.cubes[i].position.y < -200){
        this.cubes[i].position.x = ( Math.random() - 0.5 ) * 1000;
        this.cubes[i].position.y = ( Math.random() - 0.5 ) * 1000;
        this.cubes[i].position.y = 200;
      } else {
        this.cubes[i].position.x -= Math.random() * ( maxVelocity - minVelocity + 0.2) + minVelocity * Math.random();
        this.cubes[i].position.y -= Math.random() * ( maxVelocity - minVelocity + 0.2) + minVelocity * Math.random();
      }      
    }
  };

  _onCubeCreate = (index, cube) => {
    this.cubes[index] = cube;
  };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    let width = Number(this.state.width);
    let height = Number(this.state.height);

    return (<div
      ref="container"
      className={styles.threeCanvas}
    >
      <React3
        width={width}
        height={height}
        antialias
        pixelRatio={width/height}
        mainCamera="mainCamera"
        onAnimate={this._onAnimate}
        sortObjects={false}
        shadowMapEnabled
        shadowMapType={THREE.PCFShadowMap}
        clearColor={0xffffff}
      >
        <resources>
          <cylinderGeometry
            resourceId="boxGeometry"
            radiusTop={0}
            radiusBottom={20}
            height={20}
            radialSegments={3}
          />
          <meshStandardMaterial
            resourceId="highlightMaterial"
            shading={THREE.FlatShading}
            color={0xffffff}
            wireframe
          />
        </resources>
        <scene ref="scene">
          <perspectiveCamera
            fov={140}
            aspect={width / height}
            near={0.01}
            far={100000}
            name="mainCamera"
            ref="camera"
            position={this.cameraPosition}
            rotation={this.cameraRotation}
          />
          <ambientLight
            color={0x505050}
          />
          <spotLight
            color={0xffffff}
            intensity={1}
            position={this.lightPosition}
            lookAt={this.lightTarget}
            castShadow
            shadowCameraNear={1}
            shadowCameraFar={10000}
            shadowCameraFov={10}
            shadowBias={-0.00022}
            shadowMapWidth={2048}
            shadowMapHeight={2048}
          />
          <group>
            {this.cubePositions.map((cubePosition, index) => {
              const onCreate = this._onCubeCreate.bind(this, index);
              return (<DraggableCube
                key={index}
                initialPosition={cubePosition}
                onCreate={onCreate}
              />);
            })}
          </group>
        </scene>
      </React3>
    </div>);
  }
}

export default DraggableCubes;