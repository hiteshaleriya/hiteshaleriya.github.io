# Lazy load image plugin

### USAGE:
Simply add this plugin on your page and call it with:
 ```
 lazyLoadImage.init();
 ```

### SYNTAX:
```
<img src="./i/1-thumb.jpg" data-src="./i/1.jpg" style="background:#27304F" class="img" />
```

Add below CSS as well:

```
img.reveal {
    will-change: transform, opacity; 
    animation: reveal 1s ease-out;
}

@keyframes reveal {
    0% {
        opacity: 0.5;
    }
    100% {
        opacity: 1;
    }
}
```

### ATTRIBUTES:
1. src: Thumbnail image source, temporarily shown until the actual image download.
2. data-src: Actual image source.
3. style: background color for the image, always use dominant color of the image. You can also use class for setting background color.

### BENEFITS:
1. Decreases page load time by lazy loading large images.
2. Improves the overall UX of your page (No more blank screen while image is loading).

### DEMO:
http://dev1.fed.infoedge.com/hitesh/lazy-load-image/
