## 360 panoramic viewer

### Usage
Install
```
npm i thisiskuva/vvr --save
```

### Video

```
var vr = require('vvr/video-player')
var canvas = document.createElement( 'canvas' )
var player = vr( canvas, 'http://path.to/360-video.mp4')
```

### Static image

```
var vr = require('vvr/image-player')
var canvas = document.createElement( 'canvas' )
var player = vr( canvas, 'http://path.to/360-image.png')
```
