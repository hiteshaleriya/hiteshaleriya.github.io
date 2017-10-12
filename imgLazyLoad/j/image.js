;(function(window) {
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
            if (img.getAttribute('data-src') && isInViewport(img)) {
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
    
    if (window.addEventListener) {
        window.addEventListener('load', lazyLoadImg);
        window.addEventListener('scroll', scroller, false);
    } else {
        window.attachEvent('onload', lazyLoadImg);
        window.attachEvent('onscroll', scroller);
    }

})(window);