import THREE from 'three'
import panorama from './renderer'
import { supportsWebGL } from './support'

const isSupported = supportsWebGL

const imageplayer = ( canvas, url ) => {

    if( !isSupported ){
        console.warn( 'This device does cannot play panoramic content' )
        return
    }


    if( !canvas ){
        console.error( 'No canvas defined' )
        return null
    }


    // Video DOM
    var image = document.createElement('img');
    var texture = new THREE.TextureLoader().load( url, t => {

        t.generateMipmaps = true
        t.minFilter = THREE.LinearMipMapLinearFilter;
        t.magFilter = THREE.LinearFilter;

    })


    // texture.generateMipmaps = true
    // texture.needsUpdate = true


    let { draw, setSize, toggleStereo } = panorama( texture )


    setSize( canvas.width, canvas.height )


    return { setSize, toggleStereo }

}

imageplayer.isSupported = supportsWebGL

export default imageplayer
