import React from 'react';
import * as THREE from 'three';
import PropTypes from 'prop-types';

class DraggableCube extends React.Component {
  static propTypes = {
    initialPosition: PropTypes.instanceOf(THREE.Vector3).isRequired,
    camera: PropTypes.instanceOf(THREE.PerspectiveCamera),
    onCreate: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.rotation = new THREE.Euler(
      Math.random() * 2 * Math.PI,
      Math.random() * 2 * Math.PI,
      Math.random() * 2 * Math.PI
    );

    this.scale = new THREE.Vector3(
      Math.random() * 50 + 2,
      Math.random() * 50 + 2,
      Math.random() * 50 + 2
    );

    this.color = new THREE.Color( 0xffffff);

    const {
      initialPosition,
    } = props;

    this.state = {
      position: initialPosition,
    };
  }


  _ref = (mesh) => {
    const {
      onCreate,
    } = this.props;

    onCreate(mesh);
  };

  render() {
    const {
      rotation,
      scale,
    } = this;

    const {
      position,
    } = this.state;

    let color = this.color;

    return (<group
      position={position}
      rotation={rotation}
      scale={scale}
    >
      <mesh
        castShadow
        receiveShadow

        ref={this._ref}
      >
        <geometryResource
          resourceId="boxGeometry"
        />
        
        <meshStandardMaterial
          color={color}
          shading={THREE.FlatShading}
        />
      </mesh>
    </group>);
  }
}

export default DraggableCube;