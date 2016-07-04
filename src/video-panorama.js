import THREE from 'three'
import panorama from './renderer'
import makeVideoPlayableInline from 'iphone-inline-video'


let isPOT = n => ( n & ( n - 1 )) === 0 && n !== 0
let isNPOT = n => !isPOT( n )


export default ( canvas, url ) => {

    if( !canvas ){
        console.error( 'No canvas defined' )
        return null
    }

    // Video DOM
    var video = document.createElement('video');
    makeVideoPlayableInline( video )
    var texture = new THREE.VideoTexture( video )
    video.webkitPlaysinline = 'true'
    video.crossOrigin = 'anonymous'
    video.src = url

    // let source = document.createElement( 'source')
    // source.src = url
    // source.type= "application/x-mpegURL"
    // video.appendChild( source )

    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;


    let { setSize, toggleStereo } = panorama( texture )

    let r = _ => {
        console.log( video.videoWidth )
        requestAnimationFrame( r )
    }
    r()


    let toggleMute = _ => video.muted = !video.muted

    setSize( canvas.width, canvas.height )

    let play = _ => video.play()

    return { setSize, toggleMute, play, toggleStereo }

}
