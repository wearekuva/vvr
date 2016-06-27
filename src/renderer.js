import THREE from 'three'
import DeviceOrientationControls from './DeviceOrientationControls.js'
import OrbitControls from './OrbitControls.js'


export default ( texture ) => {


    texture.repeat.x = -1
    texture.wrapS = THREE.RepeatWrapping


    let renderer = new THREE.WebGLRenderer({canvas:canvas, antialias: false, alpha: false, depth: false }),
        scene = new THREE.Scene(),
        camera = new THREE.PerspectiveCamera( 90, canvas.width / canvas.height, 0.1, 1000 )


    let material = new THREE.MeshBasicMaterial({ side:THREE.BackSide, map: texture, depthWrite:false })
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

        // if( videoWidth == 0 ){
        //     videoWidth = video.videoWidth
        //     if( isPOT( videoWidth )){
        //         // texture.minFilter = THREE.LinearMipMapLinearFilter
        //         texture.needsUpdate = true
        //     }
        //
        // }

        controls.update(_)
        renderer.render( scene, camera )
        requestAnimationFrame( draw )

    }


    draw( Date.now() )


    let setSize = ( w, h ) => {

        camera.aspect = w/h
        camera.updateProjectionMatrix()
        renderer.setSize( w, h )

    }


    return { setSize, draw }


}
