import THREE from 'three'
window.THREE = THREE
import DeviceOrientationControls from './DeviceOrientationControls.js'
import OrbitControls from './OrbitControls.js'


let isPOT = n => ( n & ( n - 1 )) === 0 && n !== 0
let isNPOT = n => !isPOT( n )


const vvr = ( canvas, videourl ) => {


    if( !canvas ){
        console.error( 'No canvas defined' )
        return null
    }


    let renderer = new THREE.WebGLRenderer({canvas:canvas}),
        scene = new THREE.Scene(),
        camera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 0.1, 1000 )


    // Video DOM
    var video = document.createElement('video');
    var texture = new THREE.VideoTexture( video )
    let videoWidth = 0
    video.crossOrigin = 'anonymous'
    video.src = videourl
    console.log( video )
    video.play()



    texture.minFilter = THREE.LinearFilter;
    texture.maxFilter = THREE.LinearFilter;
    let material = new THREE.MeshBasicMaterial({ side:THREE.BackSide, map: texture })
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


    // Silly OrbitControls don't work unless there's some distance between the camera and the origin
    camera.position.x = 0.001
    scene.add( sphere )

    let draw = _ => {

        if( videoWidth == 0 ){
            videoWidth = video.videoWidth
            if( isPOT( videoWidth )){
                texture.minFilter = THREE.LinearMipMapLinearFilter
                texture.needsUpdate = true
            }
        }

        mouseControls.update(_)
        renderer.render( scene, camera )
        requestAnimationFrame( draw )
    }

    draw( Date.now())


    let setSize = ( w, h ) => {

        camera.aspect = w/h
        camera.updateProjectionMatrix()
        renderer.setSize( w, h )

    }

    let toggleMute = _ => video.muted = !video.muted

    setSize( canvas.width, canvas.height )




    return { setSize, toggleMute }


}

window.vvr = vvr
