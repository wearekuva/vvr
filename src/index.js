import video from './video-panorama'
import image from './image-panorama'
import { supportsWebGL } from './support'

if( !supportsWebGL ) console.warn( 'This device device does not support WebGL and cannot play panoramic content' )

let pano = { video, image }

window.pano = pano

export default pano
