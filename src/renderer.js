import THREE from 'three'
import DeviceOrientationControls from './DeviceOrientationControls.js'
import OrbitControls from './OrbitControls.js'
import stereo from './stereo.js'
import math from './math'


export default ( texture, container, mapping = [ 360, 180 ], backgroundColor = 0x000000 ) => {

    container.className = 'vvr'

    let renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false/*, depth: false*/ }),
        scene = new THREE.Scene(),
        stereo = new THREE.StereoEffect( renderer ),
        camera = new THREE.PerspectiveCamera( 70, container.width / container.height, 0.01, 4 )

    let useStereo = false

    renderer.setPixelRatio( devicePixelRatio || 1 )
    renderer.setClearColor( backgroundColor )
    container.appendChild( renderer.domElement )

    texture.anistropy = renderer.getMaxAnisotropy()
    texture.generateMipmaps = false
    texture.magFilter = THREE.LinearFilter
    texture.minFilter = THREE.LinearFilter


    var uniforms = THREE.UniformsUtils.merge([THREE.ShaderLib.basic.uniforms]);
    let material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: texture, depthWrite:false, depthTest:false , transparent:false })
    material.type = 'ShaderMaterial'
    material.uniforms = uniforms
    material.uniforms = uniforms
    material.vertexShader = THREE.ShaderLib.basic.vertexShader
    material.fragmentShader = `

        uniform vec3 diffuse;
        uniform float opacity;

        #ifndef FLAT_SHADED

        varying vec3 vNormal;

        #endif

        #include <common>
        #include <color_pars_fragment>
        #include <uv_pars_fragment>
        #include <uv2_pars_fragment>
        #include <map_pars_fragment>




        void main() {



        vec4 diffuseColor = vec4( diffuse, opacity );


        #ifdef USE_MAP

            vec2 inVUv = vUv;
            inVUv.x = 1.0 - inVUv.x;
        	vec4 texelColor = texture2D( map, inVUv );

        	texelColor = mapTexelToLinear( texelColor );
        	diffuseColor *= texelColor;

        #endif





        ReflectedLight reflectedLight;
        reflectedLight.directDiffuse = vec3( 0.0 );
        reflectedLight.directSpecular = vec3( 0.0 );
        reflectedLight.indirectDiffuse = diffuseColor.rgb;
        reflectedLight.indirectSpecular = vec3( 0.0 );



        vec3 outgoingLight = reflectedLight.indirectDiffuse;



        gl_FragColor = vec4( outgoingLight, diffuseColor.a );

        }
    `

    // Remap the sphere
    let phiLength   = mapping[0] / 360 * Math.PI * 2
    let thetaLength = mapping[1] / 180 * Math.PI
    let phiStart = -phiLength / 2
    let thetaStart = 0
    let sphere = new THREE.Mesh( new THREE.SphereBufferGeometry( 1, 60, 60, phiStart, phiLength, thetaStart, thetaLength ), material )



    // Controls

    let imuControls = new DeviceOrientationControls( camera)
    let mouseControls = new OrbitControls( camera, renderer.domElement )

    mouseControls.enableDamping = true
    mouseControls.rotateSpeed = 0.2;

    let controls = mouseControls

    // window.addEventListener('deviceorientation', o => {
    //     if( o.gamma !== null && o.alpha !== null && o.beta !== null ){
    //         mouseControls.enabled = false
    //         controls = imuControls
    //     }
    // }, false);


    // Silly OrbitControls don't work unless there's some distance between the camera and the origin
    camera.position.x = 0.001
    scene.add( sphere )

    let draw = _ => {

        controls.update(_)
        useStereo ? stereo.render( scene, camera ) :  renderer.render( scene, camera )
        requestAnimationFrame( draw )

    }


    draw( Date.now() )


    let setSize = ( w, h ) => {

        camera.aspect = w/h
        camera.updateProjectionMatrix()
        renderer.setSize( w, h )

    }

    let toggleStereo = _ => useStereo = !useStereo


    return { setSize, draw, toggleStereo }


}
