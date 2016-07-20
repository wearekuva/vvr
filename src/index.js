import video from './video-panorama'
import image from './image-panorama'

let isSupported = ( function () {

	try {

		var canvas = document.createElement( 'canvas' ); return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );

	} catch ( e ) {

		return false;

	}

} )()

let pano = { video, image, isSupported }

window.pano = pano

export default pano
