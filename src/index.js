import video from './video-panorama'
import image from './image-panorama'

let iosVersion = ( function() {
  if (/iP(hone|od|ad)/.test(navigator.userAgent)) {
    // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
    var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
    return parseInt(v[1], 10)
}else return Infinity
} )()

let supportsInlinePlayback = iosVersion >= 10

let supportsWebGL = ( function () {

	try {

		var canvas = document.createElement( 'canvas' ); return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );

	} catch ( e ) {

		return false;

	}

} )()

let isSupported = supportsWebGL && supportsInlinePlayback

if( !isSupported ) console.warn( 'This device device does not support panoramic content' )

let pano = { video, image, isSupported }

window.pano = pano

export default pano
