import THREE from 'three'
import DeviceOrientationControls from './DeviceOrientationControls.js'
import OrbitControls from './OrbitControls.js'
import stereo from './stereo.js'


export default ( texture ) => {


    let renderer = new THREE.WebGLRenderer({canvas:canvas, antialias: false, alpha: false, depth: false }),
        scene = new THREE.Scene(),
        stereo = new THREE.StereoEffect( renderer ),
        camera = new THREE.PerspectiveCamera( 90, canvas.width / canvas.height, 0.1, 1000 )

    let useStereo = false

    var uniforms = THREE.UniformsUtils.merge([THREE.ShaderLib.basic.uniforms]);
    let material = new THREE.MeshBasicMaterial({ side: THREE.BackSide, map: texture, depthWrite:false })
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
        #include <alphamap_pars_fragment>
        #include <aomap_pars_fragment>
        #include <envmap_pars_fragment>
        #include <fog_pars_fragment>
        #include <specularmap_pars_fragment>
        #include <logdepthbuf_pars_fragment>
        #include <clipping_planes_pars_fragment>

        void main() {

        #include <clipping_planes_fragment>

        vec4 diffuseColor = vec4( diffuse, opacity );

        #include <logdepthbuf_fragment>
        #ifdef USE_MAP

            vec2 inVUv = vUv;
            inVUv.x = 1.0 - inVUv.x;
        	vec4 texelColor = texture2D( map, inVUv );

        	texelColor = mapTexelToLinear( texelColor );
        	diffuseColor *= texelColor;

        #endif
        #include <color_fragment>
        #include <alphamap_fragment>
        #include <alphatest_fragment>
        #include <specularmap_fragment>

        ReflectedLight reflectedLight;
        reflectedLight.directDiffuse = vec3( 0.0 );
        reflectedLight.directSpecular = vec3( 0.0 );
        reflectedLight.indirectDiffuse = diffuseColor.rgb;
        reflectedLight.indirectSpecular = vec3( 0.0 );

        #include <aomap_fragment>

        vec3 outgoingLight = reflectedLight.indirectDiffuse;

        #include <envmap_fragment>

        gl_FragColor = vec4( outgoingLight, diffuseColor.a );

        #include <premultiplied_alpha_fragment>
        #include <tonemapping_fragment>
        #include <encodings_fragment>
        #include <fog_fragment>

        }
    `


    let sphere = new THREE.Mesh( new THREE.SphereBufferGeometry( 1, 30, 30 ), material )


    // // REMAP STEREO IMAGE
    //
    // let uvs = sphere.geometry.attributes.uv
    // let l = uvs.length / uvs.itemSize
    // while( l-- > 0 ){
    //     uvs.setY( l, uvs.array[ ( l * uvs.itemSize ) + 1 ] * 0.5 )
    // }

    // Controls

    let imuControls = new DeviceOrientationControls( camera)
    let mouseControls = new OrbitControls( camera, renderer.domElement )

    mouseControls.enableDamping = true
    mouseControls.rotateSpeed = 0.2;

    let controls = mouseControls

    window.addEventListener('deviceorientation', o => {
        if( o.gamma !== null && o.alpha !== null && o.beta !== null ){
            mouseControls.enabled = false
            controls = imuControls
        }
    }, false);


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
