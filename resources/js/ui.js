function add_option(el, opt_text, opt_value) {
    opt = document.createElement('option');
    opt.text = opt_text;
    opt.value = opt_value;
    
    el.add(opt, null);
}

function get_selected(id) {
    var select = document.getElementById(id);
    return select.item(select.selectedIndex).value;
}

function show_image(evt) {
    var left_dataset = get_selected('methods-left');
    var right_dataset = get_selected('methods-right');
    
    var img = evt.target.innerHTML;
    
    var img_left = document.getElementById('img-left');
    img_left.src = left_dataset + "/" + evt.target.innerHTML;
    var img_right = document.getElementById('img-right');
    img_right.src = right_dataset + "/" + evt.target.innerHTML;
    
    var image_list = document.getElementById('image-list');
    for (var i = 0; i < image_list.children.length; i++) {
        var c = image_list.children[i];
        c.classList.remove('selected');
    }

    evt.target.classList.add('selected');
}

function create_image_list() {
    var image_list = document.getElementById('image-list');
    for (var i = 0; i < images.length; i++) {
        var img = images[i];
        var el = document.createElement('div');
        el.innerHTML = img;
        el.addEventListener('click', show_image);
        el.classList.add('image-select-item')
        image_list.appendChild(el);
    }
}

function method_changed() {
    var selected_left = get_selected('methods-left');
    var selected_right = get_selected('methods-right');
    
    var el = document.querySelector('.selected');
    if (el === undefined || el === null) {
        var image_list = document.getElementById('image-list');
        el = image_list.firstChild;
    }
    show_image({target:el});
}

function load() {
    /* load content */
    var methods_left = document.getElementById('methods-left');
    methods_left.addEventListener('change', function() {
        method_changed();
    });
    var methods_right = document.getElementById('methods-right');
    methods_right.addEventListener('change', function() {
        method_changed();
    });
    create_image_list();
    for (k in folders) {
        add_option(methods_left, names[k], folders[k]);
        add_option(methods_right, names[k], folders[k]);
    }
    method_changed();
}
    
document.addEventListener("DOMContentLoaded", load);
