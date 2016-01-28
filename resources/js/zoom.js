function zoom_show__(side, x, y) {
    var zoom = document.getElementById('zoom-' + side);
    var img = document.getElementById('img-' + side);
    
    var box_width = 150;
    var box_height = 150;
    
    var fullX = x/img.width * img.naturalWidth - box_width;
    var fullY = y/img.height * img.naturalHeight - box_height;
    
    var ctx = zoom.getContext('2d');
    ctx.drawImage(img, Math.min(0, -fullX), Math.min(0, -fullY));
    
    zoom.style.left = (img.offsetLeft + x - box_width) + "px";
    zoom.style.top = (img.offsetTop + y - box_height) + "px";
    zoom.style.display = "block";
}

function show_zoom(x, y) {
    zoom_show__('left', x, y);
    zoom_show__('right', x, y);
}

function hide_zoom() {
    var zoom1 = document.getElementById('zoom-left');
    zoom1.style.display = "none";
    var zoom2 = document.getElementById('zoom-right');
    zoom2.style.display = "none";
}

function is_inside(el, x, y) {
    var rect = el.getBoundingClientRect();
    return x > rect.left && x < rect.right && y > rect.top && y < rect.bottom;
}

function zoom_listener(e) {
    var img1 = document.getElementById("img-left");
    var img2 = document.getElementById("img-right");
    
    if (is_inside(img1, e.clientX, e.clientY)) {
        var x = e.clientX - img1.getBoundingClientRect().left;
        var y = e.clientY - img1.getBoundingClientRect().top;
        show_zoom(x, y);
        down = true;
        e.preventDefault();
    } else if (is_inside(img2, e.clientX, e.clientY)) {
        var x = e.clientX - img2.getBoundingClientRect().left;
        var y = e.clientY - img2.getBoundingClientRect().top;
        show_zoom(x, y);
        down = true;
        e.preventDefault();
    }
    
}

function load_zoom() {
    down = false;
    document.addEventListener("mousedown", zoom_listener);
    document.addEventListener('mousemove', function (e) {
        if (down == false) return;
        zoom_listener(e);
    });
    document.addEventListener("mouseup", function(e) {
        hide_zoom();
        down = false;
    });
}

document.addEventListener("DOMContentLoaded", load_zoom);