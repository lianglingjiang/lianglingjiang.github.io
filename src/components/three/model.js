import * as THREE from 'three';
import React from 'react';
import PropTypes from 'prop-types';
import createMaterial from '../../lib/create_material';

import ParsedModel from '../../lib/parsed_model';


class Model3D extends React.Component {

  constructor (props) {
    super(props);
  }

  render() {

    console.log("Model side: " + this.props.parsedModel.name);
    if(typeof this.props.parsedModel.model === 'undefined'){
      let size = 50;
      return (
        <mesh
          key={THREE.Math.generateUUID()}
          position={new THREE.Vector3(this.props.position.x, this.props.position.y, this.props.position.z)}
        >
          <boxGeometry
            width={size}
            height={size}
            depth={size}
          />
          <meshBasicMaterial
            color={0xcc0000}
          />
        </mesh>
      );
    }


    // render model with separate geometries
    let meshes = [];
    let geometries = this.props.parsedModel.geometries;
    let materialsArray = this.props.parsedModel.materialsArray;
    let materialIndices = this.props.parsedModel.materialIndices;

    geometries.forEach((geometry, uuid) => {
      // get the right material for this geometry using the material index
      let material = materialsArray[materialIndices.get(uuid)];
      // create a react-three-renderer material component
      material = createMaterial(material);

      meshes.push(
        <mesh
          key={uuid}
        >
          <geometry
            vertices={geometry.vertices}
            faces={geometry.faces}
          />
          {material}
        </mesh>
      );
    });

    return(
      <group>
        {meshes}
      </group>
    );
  }
}

Model3D.propTypes = {
  parsedModel: PropTypes.instanceOf(ParsedModel),
  mergeGeometries: PropTypes.bool,
  position: PropTypes.instanceOf(THREE.Vector3),
  quaternion: PropTypes.instanceOf(THREE.Quaternion),
  scale: PropTypes.number
};

export default Model3D;
