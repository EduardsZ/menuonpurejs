"use strict"

const isMobile = {
  Android: function() {
    return navigator.userAgent.match(/Android/i)
  },
  BlackBerry: function() {
    return navigator.userAgent.match(/BlackBerry/i)
  },
  iOS: function() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i)
  },
  Opera: function() {
    return navigator.userAgent.match(/Opera Mini/i)
  },
  Windows: function() {
    return navigator.userAgent.match(/IEMobile/i)
  },
  any: function() {
    return (
    this.Android() ||
    this.BlackBerry() ||
    this.iOS() ||
    this.Opera() ||
    this.Windows()
    )
  }
}

if(isMobile.any()) {
  document.body.classList.add('_touch')

  const menuAarrows = document.getElementsByClassName('menu__arrow')
  if(menuAarrows.length) {
    const maLength = menuAarrows.length
    for(let i = 0; i < maLength; i++) {
      const menuArrow = menuAarrows[i]
      menuArrow.addEventListener('click', event => {
        menuArrow.parentElement.classList.toggle('_active')
      })
    }
    
  }
} else {
  document.body.classList.add('_pc')
}

// Burger menu
const menuBody = document.querySelector('.menu__body')
const iconMenu = document.querySelector('.menu__icon')
if(iconMenu) {
  iconMenu.addEventListener('click', event => {
    iconMenu.classList.toggle('_active')
    if (iconMenu.classList.contains('_active')) {
      menuBody.classList.add('_active')
      document.body.classList.add('_lock')
    } else {
      menuBody.classList.remove('_active')
      document.body.classList.remove('_lock')
    }
    
  })
}

// Scroll on click
const menuLinks = document.querySelectorAll('.menu__link[data-goto_section]')
if(menuLinks.length) {
  menuLinks.forEach(menuLink => {
    menuLink.addEventListener('click', onMenuLinkClick)
  })
}

function onMenuLinkClick(event) {
  event.preventDefault()
  const menuLink = event.target
  if (menuLink.dataset.goto_section
    && document.getElementsByClassName(menuLink.dataset.goto_section)) {
      const goToBlock = document.querySelector(menuLink.dataset.goto_section)
      const goToBlockValue = goToBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight  // pageYoffset is deprecated and replaced by scrollY...

      if(iconMenu.classList.contains('_active')) {
        console.log('hide menu');
        iconMenu.classList.remove('_active')
        menuBody.classList.remove('_active')
        document.body.classList.remove('_lock')
      }

      window.scrollTo({
        top: goToBlockValue,
        behavior: 'smooth'
      })
    }
}