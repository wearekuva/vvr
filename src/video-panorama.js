import THREE from 'three'
import panorama from './renderer'
import makeVideoPlayableInline from 'iphone-inline-video'
import { supportsInlinePlayback, supportsWebGL } from './support'
import loadingIcon from './loading-icon'


let isPOT = n => ( n & ( n - 1 )) === 0 && n !== 0
let isNPOT = n => !isPOT( n )
const isSupported = supportsInlinePlayback && supportsWebGL


const videoplayer = ( container, url ) => {

    if( !isSupported ){
        console.warn( 'This device does cannot play panoramic content' )
        return
    }

    if( !container ){
        console.error( 'No container defined' )
        return null
    }




    // Video DOM
    var video = document.createElement('video');


    loadingIcon( container, video )


    // if( !supportsInlinePlayback ) makeVideoPlayableInline( video )
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


    let { setSize, toggleStereo } = panorama( texture, container )

    let toggleMute = _ => video.muted = !video.muted

    setSize( container.width, container.height )

    let play = _ => video.play()

    return { setSize, toggleMute, play, toggleStereo }

}

videoplayer.isSupported = isSupported

export default videoplayer
