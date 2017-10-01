import React from 'react';
import PropTypes from 'prop-types';

import * as THREE from 'three';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';

// shared plane for dragging purposes
// it's good to share because you can drag only one cube at a time
const dragPlane = new THREE.Plane();

const backVector = new THREE.Vector3(0, 0, -1);

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

    const hsl = this.color.getHSL();

    hsl.s = Math.min(1, hsl.s * 1.1);
    hsl.l = Math.min(1, hsl.l * 1.1);

    const { h, s, l } = hsl;

    this.hoverColor = new THREE.Color().setHSL(h, s, l);
    this.pressedColor = 0xff0000;

    const {
      initialPosition,
    } = props;

    this.state = {
      hovered: false,
      pressed: false,
      position: initialPosition,
    };
  }

  shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate;

  componentWillUnmount() {

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
      cursor: {
        dragging,
      },
    } = this.props;

    const {
      hovered,
      pressed,
      position,
    } = this.state;

    let color;

    const hoverHighlight = (hovered && !dragging);

    if (pressed) {
      color = this.pressedColor;
    } else if (hoverHighlight) {
      color = this.hoverColor;
    } else {
      color = this.color;
    }

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
      {hoverHighlight ? <mesh
        ignorePointerEvents
      >
        <geometryResource
          resourceId="boxGeometry"
        />
        <materialResource
          resourceId="highlightMaterial"
        />
      </mesh> : null}
    </group>);
  }
}

export default DraggableCube;