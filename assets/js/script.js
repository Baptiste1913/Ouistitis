'use strict';

/**
 * Add event on element
 */
const addEventOnElem = function (elems, type, callback) {
  if (elems) {
    if (NodeList.prototype.isPrototypeOf(elems) || HTMLCollection.prototype.isPrototypeOf(elems)) {
      elems.forEach(elem => {
        if (elem instanceof Element) {
          elem.addEventListener(type, callback);
        }
      });
    } else if (elems instanceof Element) {
      elems.addEventListener(type, callback);
    }
  }
}

/**
 * Navbar toggle
 */
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navTogglersDash = document.querySelectorAll("[data-nav-toggler-dash]");
const navTogglersLogged = document.querySelectorAll("[data-nav-toggler-logged]");
const dropdownMenuDash = document.getElementById("dropdownMenuDash");
const dropdownMenuLogged = document.getElementById("dropdownMenuLogged");
const serverIcon = document.getElementById("serverIcon");

let isAnimating = false;  // Variable to prevent overlapping animations

// Function to close a specific dropdown menu
const closeDropdownMenu = function (menu, icon) {
  if (menu) {
    menu.classList.remove("show");
    menu.classList.add("hide");
    if (icon) icon.classList.remove("rotate-up");
    setTimeout(() => {
      menu.style.display = 'none';
      isAnimating = false; // Allow new animations
    }, 200); // Delay to match the transition duration
  }
}

const toggleNavbar = function () {
  window.location.href = 'https://ouistitis.online/login';
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const toggleDropdownMenuDash = function () {
  if (isAnimating) return;
  isAnimating = true;
  const icon = this.querySelector(".chevron.down");
  if (dropdownMenuDash && dropdownMenuDash.classList.contains("show")) {
    closeDropdownMenu(dropdownMenuDash, icon);
  } else {
    if (dropdownMenuDash) {
      dropdownMenuDash.style.display = 'block';
      dropdownMenuDash.offsetHeight; // Force reflow
      dropdownMenuDash.classList.remove("hide");
      dropdownMenuDash.classList.add("show");
      if (icon) icon.classList.add("rotate-up");
      closeDropdownMenu(dropdownMenuLogged, document.querySelector("#navContainerLoggedIn .chevron.down"));
    }
    setTimeout(() => { isAnimating = false; }, 200); // Allow new animations after duration
  }
}

const toggleDropdownMenuLogged = function () {
  if (isAnimating) return;
  isAnimating = true;
  const icon = this.querySelector(".chevron.down");
  if (dropdownMenuLogged && dropdownMenuLogged.classList.contains("show")) {
    closeDropdownMenu(dropdownMenuLogged, icon);
  } else {
    if (dropdownMenuLogged) {
      dropdownMenuLogged.style.display = 'block';
      dropdownMenuLogged.offsetHeight; // Force reflow
      dropdownMenuLogged.classList.remove("hide");
      dropdownMenuLogged.classList.add("show");
      if (icon) icon.classList.add("rotate-up");
      closeDropdownMenu(dropdownMenuDash, document.querySelector("#navContainerNotLoggedIn .chevron.down"));
    }
    setTimeout(() => { isAnimating = false; }, 200); // Allow new animations after duration
  }
}

addEventOnElem(navTogglersDash, "click", toggleDropdownMenuDash);
addEventOnElem(navTogglersLogged, "click", toggleDropdownMenuLogged);

// Prevent closing when clicking inside the menu
if (dropdownMenuDash) {
  dropdownMenuDash.addEventListener('click', function(event) {
    event.stopPropagation();
  });
}

if (dropdownMenuLogged) {
  dropdownMenuLogged.addEventListener('click', function(event) {
    event.stopPropagation();
  });
}

// Close dropdown menu if clicked outside
window.addEventListener('click', function(e) {
  if (!e.target.closest('.nav-container')) {
    if (dropdownMenuDash && dropdownMenuDash.classList.contains("show")) {
      closeDropdownMenu(dropdownMenuDash, document.querySelector("#navContainerNotLoggedIn .chevron.down"));
    }
    if (dropdownMenuLogged && dropdownMenuLogged.classList.contains("show")) {
      closeDropdownMenu(dropdownMenuLogged, document.querySelector("#navContainerLoggedIn .chevron.down"));
    }
  }
});

// Add event listeners to close the menu when clicking on links inside it
const menuLinksDash = dropdownMenuDash ? dropdownMenuDash.querySelectorAll('a') : [];
addEventOnElem(menuLinksDash, 'click', function() {
  closeDropdownMenu(dropdownMenuDash, document.querySelector("#navContainerNotLoggedIn .chevron.down"));
});

const menuLinksLogged = dropdownMenuLogged ? dropdownMenuLogged.querySelectorAll('a') : [];
addEventOnElem(menuLinksLogged, 'click', function() {
  closeDropdownMenu(dropdownMenuLogged, document.querySelector("#navContainerLoggedIn .chevron.down"));
});

/**
 * Active header when window scroll down to 100px
 */
 
 window.addEventListener("scroll", function() {
  const header = document.querySelector("[data-header]");
  if (window.scrollY > 100) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});

/**
 * Handle page load and authentication state
 */
document.addEventListener('DOMContentLoaded', () => {
  // Add hidden class initially to both dropdown menus and icons
  if (dropdownMenuDash) {
    dropdownMenuDash.classList.remove("hidden");
  }
  if (dropdownMenuLogged) {
    dropdownMenuLogged.classList.remove("hidden");
  }
  if (serverIcon) {
    serverIcon.classList.remove("hidden");
  }

  // Display the correct dropdown menu based on authentication state
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  if (isAuthenticated) {
    document.getElementById('navContainerLoggedIn').style.display = 'block';
    document.getElementById('navContainerNotLoggedIn').style.display = 'none';
  } else {
    document.getElementById('navContainerLoggedIn').style.display = 'none';
    document.getElementById('navContainerNotLoggedIn').style.display = 'block';
  }
});

  // Save URL
  
  function redirectToLogin() {
    localStorage.setItem('returnUrl', window.location.href);
    window.location.href = './login';
  }