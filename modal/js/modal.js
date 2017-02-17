var modal = (function() {

    var plugin = {
        open: function(modal) {
            modal.style.display = "block";
            document.body.style.overflow = "hidden";
        },
        close: function(modal) {
            modal.style.display = "none";
            document.body.style.overflow = "";
        },
        init: function(container, btn) {
            var cont = document.querySelector(container),
                actionBtn = document.querySelector(btn),
                closeBtn = cont.querySelector('.close');

            // When the user clicks the button, open the modal 
            actionBtn.onclick = function() {
                plugin.open(cont);
            }

            // When the user clicks on <span> (x), close the modal
            closeBtn.onclick = function() {
                plugin.close(cont)
            };

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
                if (event.target == cont) {
                    plugin.close(cont);
                }
            }
        }
    };

    return {
        init: plugin.init
    }

}());
