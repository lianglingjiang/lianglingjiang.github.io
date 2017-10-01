import React from 'react';
import * as THREE from 'three';
import PropTypes from 'prop-types';

import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';

import React3 from 'react-three-renderer';

import DraggableCube from './DraggableCube';

import styles from './styles.module.css';

const width = window.innerWidth; // canvas width
const height = window.innerHeight; // canvas height

class DraggableCubes extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      cameraPosition: new THREE.Vector3(0, 300, 300),
      cameraRotation: new THREE.Euler(),
      hovering: false,
      dragging: false,
    };

    this._cursor = {
      hovering: false,
      dragging: false,
    };

    this.lightPosition = new THREE.Vector3(0, 300, 3000);
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

    this._hoveredCubes = 0;
    this._draggingCubes = 0;
  }

  shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate;

  _onAnimate = () => {
    this._onAnimateInternal();

    var minVelocity = 0.02,
        maxVelocity = 0.05;

    let isReverse = Math.random();

    for (let i = 0; i < 100; ++i) {
      if(this.cubes[i].isReverse) {
        this.cubes[i].rotation.y += Math.random() * 0.01;
        this.cubes[i].rotation.x += Math.random() * 0.01;
      } else {
        this.cubes[i].rotation.y -= Math.random() * 0.01;
        this.cubes[i].rotation.x -= Math.random() * 0.01;
      }

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

  componentDidMount() {

    const {
      container,
      camera,
    } = this.refs;

  }

  _onCubesMounted = (cubes) => {
    this.cubes = cubes;
  };

  _onHoverStart = () => {
    this.setState({
      hovering: true,
    });
  };

  _onHoverEnd = () => {
    this.setState({
      hovering: false,
    });
  };

  _onDragStart = () => {
    this.setState({
      dragging: true,
    });
  };

  _onDragEnd = () => {
    this.setState({
      dragging: false,
    });
  };

  _onCubeCreate = (index, cube) => {
    this.cubes[index] = cube;
  };

  _onCubeDragStart = () => {
    
    this._onDragStart();

    this._draggingCubes++;
  };

  _onCubeDragEnd = () => {
    this._draggingCubes--;

    if (this._draggingCubes === 0) {
      const {
        onDragEnd,
      } = this._onDragEnd;

      onDragEnd();
    }
  };



  _onTrackballChange = () => {
    this.setState({
      cameraPosition: this.refs.camera.position.clone(),
      cameraRotation: this.refs.camera.rotation.clone(),
    });
  };



  _onAnimateInternal() {
    const {
      camera,
    } = this.refs;

    if (this.state.camera !== camera) {
      this.setState({
        camera,
      });
    }
  }

  render() {
    const width = 1.5* window.innerWidth; // canvas width
    const height = 1.5*window.innerHeight; // canvas height

    const {
      cameraPosition,
      cameraRotation,

      camera,

      hovering,
      dragging,
    } = this.state;

    const style = {};

    if (dragging) {
      style.cursor = 'move';
    } else if (hovering) {
      style.cursor = 'pointer';
    }

    this._cursor.hovering = hovering;
    this._cursor.dragging = dragging;

    return (<div
      ref="container"
      className={styles.threeCanvas}
    >
      <React3
        width={width}
        height={height}
        antialias
        pixelRatio={window.devicePixelRatio}
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
            position={cameraPosition}
            rotation={cameraRotation}
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
      
                camera={camera}
      
                initialPosition={cubePosition}
                onCreate={onCreate}

                cursor={this._cursor}
              />);
            })}
          </group>
        </scene>
      </React3>
    </div>);
  }
}

export default DraggableCubes;