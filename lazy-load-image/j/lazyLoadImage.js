/**
 * Author : Hitesh Aleriya
 * Version : base
 * Desc : Image Lazy load plugin
 *
 * USAGE:
 * Simply add this plugin on your page and initialize it with:
 * lazyLoadImage.init();
 *
 * SYNTAX:
 * <img src="./i/1-thumb.jpg" data-src="./i/1.jpg" style="background:#27304F" class="img" />
 *
 * ATTRIBUTES:
 * style: background color for the image, always use dominant color of the image.
 * src: Thumbnail image source, temporarily shown until the actual image download.
 * data-src: Actual image source.
 */

var lazyLoadImage = (function(window) {
    var timer;

    // image in viewport?
    function isInViewport(img) {
        var yOffset = window.pageYOffset || document.documentElement.scrollTop,
            iHeight = yOffset + window.innerHeight || document.documentElement.clientHeight,
            cRect, pT, pB, p = 0;
            cRect = img.getBoundingClientRect();
            pT = yOffset + cRect.top;
            pB = pT + cRect.height || img.offsetHeight;
            if (yOffset < pB && iHeight > pT) {
                return true;
            } else {
                return false;
            }
    }

    // replace with old image
    function replaceImg(oldImg, newImg) {
        if (window.requestIdleCallback) {
            requestIdleCallback(function() {
                oldImg.parentNode && oldImg.parentNode.replaceChild(newImg, oldImg);
            });
        } else {
            oldImg.parentNode && oldImg.parentNode.replaceChild(newImg, oldImg);
        }
    }

    // create new image with old image attributes
    function createNewImg(oldImg) {
        var newImg = new Image();
        var attrs = oldImg.attributes;
        var len = attrs.length;
        for (var i=0; i<len; i++) {
            if (attrs[i].name != "src" && attrs[i].name != "data-src") {
                newImg.setAttribute([attrs[i].name], attrs[i].value);
            }
        }
        newImg.src = oldImg.getAttribute('data-src');
        newImg.className += ' reveal';
        return newImg;
    }
    
    // load full image
    function loadImg(img) {
        var newImg = createNewImg(img);
        newImg.onload = function() {
            replaceImg(img, newImg);
        }
    }

    function lazyLoadImg() {
        var images = document.querySelectorAll('img[data-src]');
        var len = images.length, img;
        for (var i=0; i<len; i++) {
            img = images[i];
            if (isInViewport(img)) {
                loadImg(img);
            }
        }
    }

    // throttled scroll
    function scroller(e) {
        timer = timer || setTimeout(function() {
            timer = null;
            window.requestAnimationFrame ? window.requestAnimationFrame(lazyLoadImg) : lazyLoadImg();
        }, 300);
    }
    
    // initializing plugin
    function init() {
        lazyLoadImg();
        if (!window.isLazyLoadImage) {
            window.isLazyLoadImage = true;
            if (window.addEventListener) {
                window.addEventListener('scroll', scroller);
            } else {
                window.attachEvent('onscroll', scroller);
            }
        }
    }

    return {
        init: init
    };

})(window);