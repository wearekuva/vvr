## Pano viewer

### Usage
```
npm i thisiskuva/vvr --save
```

For video you'll want this;

```javascript
var vr = require('vvr/video-player')
var canvas = document.createElement( 'canvas' )
var player = vr( canvas, 'http://path.to/360-video.mp4')
```

and for a static image, you'll want this;

```javascript
var vr = require('vvr/image-player')
var canvas = document.createElement( 'canvas' )
var player = vr( canvas, 'http://path.to/360-image.png')
```

You'll want your media in an 2:1 [equirectangular](https://en.wikipedia.org/wiki/Equirectangular_projection) projection. And ideally in a power of 2 (512, 1024, 2048... )
