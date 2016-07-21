
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

    container.appendChild( icon )

    video.addEventListener('loadstart', _ => {
        console.log( 'start loading' )
        icon.style.display = 'initial'
    });

    video.addEventListener('canplay', _ => {
        console.log( 'can play' )
        icon.style.display = 'none'
    });

    return icon
}
