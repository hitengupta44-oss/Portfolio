import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDirection;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vViewDirection = normalize(-mvPosition.xyz);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uIntensity;
  uniform float uOpacity;
  uniform float uTime;
  uniform float uPhase;

  varying vec3 vNormal;
  varying vec3 vViewDirection;

  void main() {
    float facing = abs(dot(normalize(vNormal), normalize(vViewDirection)));
    float rim = pow(1.0 - facing, 2.4);
    float filament = 0.88 + 0.12 * sin(uTime * 7.0 + uPhase) * sin(uTime * 2.3 + uPhase * 0.5);
    float strength = rim * filament * uIntensity;
    gl_FragColor = vec4(uColor * strength, clamp(rim * uOpacity, 0.0, 1.0));
  }
`;

export function createHaloMaterial(color, phase) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color(color) },
      uIntensity: { value: 1 },
      uOpacity: { value: 1 },
      uTime: { value: 0 },
      uPhase: { value: phase },
    },
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
}
