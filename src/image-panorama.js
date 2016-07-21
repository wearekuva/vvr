import THREE from 'three'
import panorama from './renderer'
import { supportsWebGL } from './support'

const isSupported = supportsWebGL

const imageplayer = ( container, url ) => {

    if( !isSupported ){
        console.warn( 'This device does cannot play panoramic content' )
        return
    }


    if( !container ){
        console.error( 'No container defined' )
        return null
    }


    // Video DOM
    var image = document.createElement('img');
    var texture = new THREE.TextureLoader().load( url, t => {

        t.generateMipmaps = false
        // t.minFilter = THREE.LinearMipMapLinearFilter;
        // t.magFilter = THREE.LinearFilter;

    })


    // texture.generateMipmaps = true
    // texture.needsUpdate = true


    let { draw, setSize, toggleStereo } = panorama( texture, container )


    setSize( container.width, container.height )


    return { setSize, toggleStereo }

}

imageplayer.isSupported = supportsWebGL

export default imageplayer
