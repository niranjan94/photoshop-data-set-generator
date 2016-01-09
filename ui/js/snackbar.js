var createSnackbar = (function() {
    var previous = null;

    return function(message, actionText, action, delay) {
        if (previous) {
            previous.dismiss();
        }

        if(typeof actionText === 'undefined' || actionText == null){
            actionText = "Dismiss";
        }

        if(typeof delay === 'undefined' || delay == null){
            delay = 5000;
        }
        var snackbar = document.createElement('div');
        snackbar.className = 'paper-snackbar';
        snackbar.dismiss = function() {
            this.style.opacity = 0;
        };
        var text = document.createTextNode(message);
        snackbar.appendChild(text);
        if (actionText) {
            var hasAction = true;
            if (!action) {
                action = snackbar.dismiss.bind(snackbar);
                hasAction = false;
            }
            var actionButton = document.createElement('button');
            actionButton.className = 'action';
            actionButton.innerHTML = actionText;
            if(hasAction){
                actionButton.addEventListener('click', function () {
                    action();
                    snackbar.dismiss.bind(snackbar);
                });
            } else {
                actionButton.addEventListener('click', action);
            }

            snackbar.appendChild(actionButton);
        }
        setTimeout(function() {
            if (previous === this) {
                previous.dismiss();
            }
        }.bind(snackbar), delay);

        snackbar.addEventListener('transitionend', function(event, elapsed) {
            if (event.propertyName === 'opacity' && this.style.opacity == 0) {
                this.parentElement.removeChild(this);
                if (previous === this) {
                    previous = null;
                }
            }
        }.bind(snackbar));



        previous = snackbar;
        document.body.appendChild(snackbar);
        getComputedStyle(snackbar).bottom;
        snackbar.style.bottom = '0px';
        snackbar.style.left = '0px';
        snackbar.style.opacity = 1;
    };
})();