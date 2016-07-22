import THREE from 'three'

export default ( container, video ) => {

    var icon = document.createElement( 'div')
    icon.className = 'icon'

    var svgDocument = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgDocument.setAttributeNS(null, "class", 'spinner')
    svgDocument.setAttributeNS(null, "width", '65px')
    svgDocument.setAttributeNS(null, "height", '65px')
    svgDocument.setAttributeNS(null, "viewBox", "0 0 66 66")

    var shape = document.createElementNS("http://www.w3.org/2000/svg", "circle")
    shape.setAttributeNS(null, "class", 'path');
    shape.setAttributeNS(null, "cx", '33');
    shape.setAttributeNS(null, "cy", '33');
    shape.setAttributeNS(null, "r",  '30');
    shape.setAttributeNS(null, "fill", "none");
    shape.setAttributeNS(null, "stroke-width", '6');
    svgDocument.appendChild( shape )

    icon.appendChild( svgDocument )
    container.insertBefore( icon, container.childNodes[0]);

    var lastPlayPos    = 0
    var currentPlayPos = 0
    var bufferingDetected = true



    let start = _ => {

        currentPlayPos = video.currentTime

        let offset = 1/60
        // if no buffering is currently detected,
        // and the position does not seem to increase
        // and the player isn't manually paused...
        if (
                !bufferingDetected
                && currentPlayPos - lastPlayPos < offset * 0.5
                && !video.paused
            ) {
            bufferingDetected = true
            icon.style.opacity = '1'
        }

        // if we were buffering but the player has advanced,
        // then there is no buffering
        if (
            bufferingDetected
            && currentPlayPos - lastPlayPos > offset * 0.5
            && !video.paused
            ) {
            bufferingDetected = false
            icon.style.opacity = '0'
        }
        lastPlayPos = currentPlayPos

        requestAnimationFrame( start )

    }

    return { icon, start }
}
