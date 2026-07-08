import {
  Box3,
  BufferGeometry,
  Matrix4,
  Mesh,
  Object3D,
  Quaternion,
  Vector3,
} from "three";

export interface AnchorTransform {
  position: [number, number, number];
  quaternion: [number, number, number, number];
  scale: [number, number, number];
}

const IDENTITY_TRANSFORM: AnchorTransform = {
  position: [0, 0, 0],
  quaternion: [0, 0, 0, 1],
  scale: [1, 1, 1],
};

// Anchor nodes in the /models library carry no mesh of their own — they're
// empty locators whose world transform marks where a piece should attach
// (e.g. a head's "MainAnchor" is where the center gemstone sits). Reading
// the transform straight off the node replaces the old hand-tuned
// per-combination position/rotation/scale tables.
export function getAnchorTransform(anchor?: Object3D): AnchorTransform {
  if (!anchor) return IDENTITY_TRANSFORM;

  anchor.updateWorldMatrix(true, false);

  const position = new Vector3();
  const quaternion = new Quaternion();
  const scale = new Vector3();
  anchor.matrixWorld.decompose(position, quaternion, scale);

  return {
    position: [position.x, position.y, position.z],
    quaternion: [quaternion.x, quaternion.y, quaternion.z, quaternion.w],
    scale: [scale.x, scale.y, scale.z],
  };
}

export function getDecorationAnchors(
  nodes: Record<string, Object3D>,
): Object3D[] {
  return nodes.Decoration?.children ?? [];
}

export function findFirstMeshGeometry(nodes: Record<string, Object3D>) {
  for (const key in nodes) {
    const candidate = nodes[key];
    if ((candidate as Mesh).isMesh) {
      return (candidate as Mesh).geometry;
    }
  }
  return undefined;
}

// Accent-diamond anchors are named "<PREFIX>_SIDE_Anchor_NNN".
export function getAnchorShapePrefix(anchor: Object3D): string {
  return anchor.name.replace(/_SIDE_Anchor.*$/, "");
}

export function makeTransformMatrix(
  position: [number, number, number],
  quaternion: [number, number, number, number],
  scale: [number, number, number],
): Matrix4 {
  return new Matrix4().compose(
    new Vector3(...position),
    new Quaternion(...quaternion),
    new Vector3(...scale),
  );
}

// Bounds are used to auto-fit and recenter the assembled ring, since each
// head/shank combination has different proportions (a chunky triple-row
// pavé shank isn't the same size as a plain solitaire).
export function getTransformedBoundingBox(
  geometry: BufferGeometry | undefined,
  matrix: Matrix4,
): Box3 | null {
  if (!geometry) return null;
  if (!geometry.boundingBox) geometry.computeBoundingBox();
  if (!geometry.boundingBox) return null;
  return geometry.boundingBox.clone().applyMatrix4(matrix);
}
