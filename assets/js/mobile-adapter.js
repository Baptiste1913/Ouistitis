document.addEventListener('DOMContentLoaded', function () {
    function isMobileDevice() {
        return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    }

    if (isMobileDevice()) {
        replaceHoverWithClick();

        adaptClickInteractions();
		
		disableShadowsOnMobile();
    }

    function replaceHoverWithClick() {
        const hoverElements = document.querySelectorAll('[data-hover]');
        
        hoverElements.forEach(element => {
            const hoverFunction = element.getAttribute('data-hover');

            element.removeEventListener('mouseover', hoverFunction);

            const triggerHover = function(event) {
                event.preventDefault();
                eval(hoverFunction);
            };

            element.addEventListener('click', triggerHover);
            element.addEventListener('touchstart', triggerHover);
        });
    }
	
    function disableShadowsOnMobile() {
        if (isMobileDevice()) {
            const elementsWithShadows = document.querySelectorAll('*');

            elementsWithShadows.forEach(element => {
                element.style.filter = 'none'; 
            });
        }
    }

    function adaptClickInteractions() {
        const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
        
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function() {
                const menu = document.querySelector(toggle.getAttribute('data-target'));
                menu.classList.toggle('show');

                document.addEventListener('click', function(event) {
                    if (!menu.contains(event.target) && !toggle.contains(event.target)) {
                        menu.classList.remove('show');
                    }
                }, { once: true });
            });

            toggle.addEventListener('touchstart', function() {
                const menu = document.querySelector(toggle.getAttribute('data-target'));
                menu.classList.toggle('show');

                document.addEventListener('touchstart', function(event) {
                    if (!menu.contains(event.target) && !toggle.contains(event.target)) {
                        menu.classList.remove('show');
                    }
                }, { once: true });
            });
        });
    }
});
