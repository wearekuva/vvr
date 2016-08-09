import THREE from 'three'
import panorama from './renderer'
// import makeVideoPlayableInline from 'iphone-inline-video'
import { supportsInlinePlayback, supportsWebGL } from './support'
import loadingIcon, { icon } from './loading-icon'


let isPOT = n => ( n & ( n - 1 )) === 0 && n !== 0
let isNPOT = n => !isPOT( n )
const isSupported = supportsInlinePlayback && supportsWebGL


const videoplayer = ( container, url, mapping = [ 360, 180 ], backgroundColor = 0x000000 ) => {

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

    let canPlay = false
    let shouldPlay = false


    // if( !supportsInlinePlayback ) makeVideoPlayableInline( video )
    var texture = new THREE.VideoTexture( video )
    video.webkitPlaysinline = 'true'
    video.preload='auto'
    video.crossOrigin = 'anonymous'
    video.src = url

    // let source = document.createElement( 'source')
    // source.src = url
    // source.type= "application/x-mpegURL"
    // video.appendChild( source )

    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;


    let { setSize, toggleStereo } = panorama( texture, container, mapping, backgroundColor )

    let toggleMute = _ => video.muted = !video.muted

    setSize( container.width, container.height )


    let { icon, start } = loadingIcon( container, video )
    let timeOut
    let play = _ => {

        icon.style.opacity = '1'
        start()
        video.play()

    }

    return { setSize, toggleMute, play, toggleStereo }

}

videoplayer.isSupported = isSupported

export default videoplayer
