## Pano viewer

### Usage
```
npm i thisiskuva/vvr --save
```

For video you'll want this;

```javascript
var vr = require('vvr').video
var canvas = document.createElement( 'canvas' )
var player = vr( canvas, 'http://path.to/360-video.mp4')
```

and for a static image, you'll want this;

```javascript
var vr = require('vvr').image
var canvas = document.createElement( 'canvas' )
var player = vr( canvas, 'http://path.to/360-image.png')
```

The player api for the video player is
```javascript
{
  setSize,
  toggleMute,
  play,
  toggleStereo
}
```

and for a static image, it's
```javascript
{
  setSize,
  toggleMute,
  play,
  toggleStereo
}
```


You'll want your media in an 2:1 [equirectangular](https://en.wikipedia.org/wiki/Equirectangular_projection) projection. And ideally in a power of 2 (512, 1024, 2048... )
