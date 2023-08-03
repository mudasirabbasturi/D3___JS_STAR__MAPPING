const bodyEle = document.getElementsByTagName('body')[0];
const toggleEle = document.querySelector('.list_menu');
const liEle = document.getElementsByClassName('nav-item');

function addOffcanvasActiveClass() {
  bodyEle.classList.add('offcanvas-active');
  if (!toggleEle.classList.contains('rotate')) {
    toggleEle.classList.add('rotate');
  }
}

function removeOffcanvasActiveClass() {
  bodyEle.classList.remove('offcanvas-active');
  toggleEle.classList.remove('rotate');
}

function handleMediaQueryChange(mediaQuery) {
  if (mediaQuery.matches) {
    // Add event listeners and classes when the media query is matched (viewport width < 820)
    for (let i = 0; i < liEle.length; i++) {
      const clicked = liEle[i];
      if (i !== liEle.length - 1) {
        clicked.addEventListener('click', addOffcanvasActiveClass);
      }
    }
  } else {
    // Remove event listeners and classes when the media query is not matched (viewport width >= 820)
    for (let i = 0; i < liEle.length; i++) {
      const clicked = liEle[i];
      clicked.removeEventListener('click', addOffcanvasActiveClass);
      removeOffcanvasActiveClass();
    }
  }
}

const mediaQuery = window.matchMedia('(max-width: 819px)');

// Initial check when the page loads
handleMediaQueryChange(mediaQuery);

// Listen for changes to the media query and update the event listeners accordingly
mediaQuery.addEventListener('change', handleMediaQueryChange);
