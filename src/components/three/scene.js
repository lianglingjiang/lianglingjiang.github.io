import * as THREE from 'three';
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import React3 from 'react-three-renderer';


/* scene graph */
class SceneComponent extends React.Component {

  constructor(props) {
    super(props);

    this.directionalLightPosition = new THREE.Vector3(0, 0, 60);
  }

  render() {
    let scene = (
      <React3
        ref='react3'
        mainCamera='camera'
        width={window.innerWidth}
        height={window.innerHeight}
        antialias
        shadowMapEnabled={true}
        clearColor={0xcccccc}
        forceManualRender={this.props.forceManualRender}
        onManualRenderTriggerCreated={this._onManualRenderTriggerCreated}
      >
        <scene
          ref='scene'
        >
          <perspectiveCamera
            ref='camera'
            name='camera'
            fov={90}
            aspect={window.innerWidth / window.innerHeight}
            near={1}
            far={1000}
            position={this.props.cameraPosition}
            quaternion={this.props.cameraQuaternion}
          />

          <ambientLight
            color={new THREE.Color(0x333333)}
          />

          <directionalLight
            color={new THREE.Color(0xFFFFFF)}
            intensity={1.5}
            position={this.directionalLightPosition}
          />

          {this.props.children}

        </scene>
      </React3>
    );
    if(this.props.forceManualRender === true){
      this._renderTrigger();
    }

    return scene;
  }
}

export default SceneComponent;
