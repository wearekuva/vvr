import THREE from 'three'
import panorama from './renderer'

export default ( canvas, url ) => {


    if( !canvas ){
        console.error( 'No canvas defined' )
        return null
    }


    // Video DOM
    var image = document.createElement('img');
    var texture = new THREE.TextureLoader().load( url, t => {

        t.minFilter = THREE.LinearMipMapLinearFilter;
        t.magFilter = THREE.LinearFilter;

    })


    // texture.generateMipmaps = true
    // texture.needsUpdate = true


    let { draw, setSize, toggleStereo } = panorama( texture )


    setSize( canvas.width, canvas.height )


    return { setSize, toggleStereo }

}
