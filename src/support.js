
let iosVersion = ( function() {
  if (/iP(hone|od)/.test(navigator.userAgent)) {
    var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
    return parseInt(v[1], 10)
}else return Infinity
} )()

export const supportsInlinePlayback = iosVersion >= 10

export const supportsWebGL = ( function () {

	try {

		var canvas = document.createElement( 'canvas' ); return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );

	} catch ( e ) {

		return false;

	}

} )()
