
function toggle_visible(el) {
    el.classList.toggle('show');
    el.classList.toggle('hide');
}

function load_help() {
    var help_icon = document.getElementById("help-icon");
    var help_dialog = document.getElementById("help-dialog");
    var close_dialog = document.getElementById("close-button");
    
    help_icon.addEventListener("click", function() {
        toggle_visible(help_dialog);
    });
    
    close_dialog.addEventListener("click", function() {
        toggle_visible(help_dialog);
    });
}

document.addEventListener("DOMContentLoaded", load_help);