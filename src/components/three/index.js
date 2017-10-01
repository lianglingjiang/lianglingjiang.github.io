import React from 'react';

import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';

import * as THREE from 'three';

import React3 from 'react-three-renderer';

import DraggableCube from './DraggableCube';

import ExampleBase from './ExampleBase';

import TrackballControls from './trackball';

import MouseInput from './MouseInput';

import styles from './styles.module.css';


class DraggableCubes extends ExampleBase {
  constructor(props, context) {
    super(props, context);

    this.state = {
      cameraPosition: new THREE.Vector3(0, 0, 1000),
      cameraRotation: new THREE.Euler(),
      mouseInput: null,
      hovering: false,
      dragging: false,
    };

    this._cursor = {
      hovering: false,
      dragging: false,
    };

    this.lightPosition = new THREE.Vector3(0, 500, 2000);
    this.lightTarget = new THREE.Vector3(0, 0, 0);


    const cubePositions = [];
    cubePositions.length = 200;

    for (let i = 0; i < 200; ++i) {
      cubePositions[i] = new THREE.Vector3(
        (Math.random()-0.5) * 2000,
        (Math.random()-0.5) * 2000,
        (Math.random()-0.5) * 2000
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

    var minVelocity = 2,
        maxVelocity = 5;

    for (let i = 0; i < 200; ++i) {
      if(this.cubes[i].isReverse) {
        this.cubes[i].rotation.y += Math.random() * 0.1;
        this.cubes[i].rotation.x += Math.random() * 0.1;
      } else {
        this.cubes[i].rotation.y -= Math.random() * 0.1;
        this.cubes[i].rotation.x -= Math.random() * 0.1;
      }

      if(this.cubes[i].position.y < -500){
        this.cubes[i].position.x = ( Math.random() - 0.5 ) * 1000;
        this.cubes[i].position.y = ( Math.random() - 0.5 ) * 1000;
        this.cubes[i].position.y = 500;
      } else {
        this.cubes[i].position.y -= Math.random() * ( maxVelocity - minVelocity + 1) + minVelocity;
      }
      
    }
  };

  componentDidMount() {

    const {
      container,
      camera,
    } = this.refs;

    const controls = new TrackballControls(camera);

    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;

    this.controls = controls;

    this.controls.addEventListener('change', this._onTrackballChange);


  }

  shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate;

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

  _onCubeMouseEnter = () => {
    if (this._hoveredCubes === 0) {
      this._onHoverStart();
    }

    this._hoveredCubes++;
  };

  _onCubeMouseLeave = () => {
    this._hoveredCubes--;

    if (this._hoveredCubes === 0) {
      this._onHoverEnd();
    }
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

  componentDidUpdate(newProps) {
    const {
      mouseInput,
    } = this.refs;

    const {
      width,
      height,
    } = this.props;

    if (width !== newProps.width || height !== newProps.height) {
      mouseInput.containerResized();
    }
  }

  _onTrackballChange = () => {
    this.setState({
      cameraPosition: this.refs.camera.position.clone(),
      cameraRotation: this.refs.camera.rotation.clone(),
    });
  };

  componentWillUnmount() {
    this.controls.removeEventListener('change', this._onTrackballChange);

    this.controls.dispose();
    delete this.controls;
  }

  _onAnimateInternal() {
    const {
      mouseInput,
      camera,
    } = this.refs;

    if (!mouseInput.isReady()) {
      const {
        scene,
        container,
      } = this.refs;

      mouseInput.ready(scene, container, camera);
      mouseInput.restrictIntersections(this.cubes);
      mouseInput.setActive(false);
    }

    if (this.state.mouseInput !== mouseInput) {
      this.setState({
        mouseInput,
      });
    }

    if (this.state.camera !== camera) {
      this.setState({
        camera,
      });
    }

    this.controls.update();
  }

  render() {
    const width = window.innerWidth; // canvas width
    const height = window.innerHeight; // canvas height

    const {
      cameraPosition,
      cameraRotation,

      mouseInput,
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
        clearColor={0xf0f0f0}
      >
        <module
          ref="mouseInput"
          descriptor={MouseInput}
        />
        <resources>
          <cylinderGeometry
            resourceId="boxGeometry"

            radiusTop={0}
            radiusBottom={20}
            height={20}
            radialSegments={4}
          />
          <meshBasicMaterial
            resourceId="highlightMaterial"

            color={0xffff00}
            wireframe
          />
        </resources>
        <scene ref="scene">
          <perspectiveCamera
            fov={70}
            aspect={width / height}
            near={1}
            far={10000}
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
            intensity={1.5}
            position={this.lightPosition}
            lookAt={this.lightTarget}

            castShadow
            shadowCameraNear={200}
            shadowCameraFar={10000}
            shadowCameraFov={50}

            shadowBias={-0.00022}

            shadowMapWidth={2048}
            shadowMapHeight={2048}
          />
          <group>
            {this.cubePositions.map((cubePosition, index) => {
              const onCreate = this._onCubeCreate.bind(this, index);
              return (<DraggableCube
                key={index}
      
                mouseInput={mouseInput}
                camera={camera}
      
                initialPosition={cubePosition}
                onCreate={onCreate}
                onMouseEnter={this._onCubeMouseEnter}
                onMouseLeave={this._onCubeMouseLeave}
                onDragStart={this._onCubeDragStart}
                onDragEnd={this._onCubeDragEnd}
                cursor={this._cursor}
                isReverse = {Math.random() >= 0.5}
              />);
            })}
          </group>
        </scene>
      </React3>
    </div>);
  }
}

export default DraggableCubes;