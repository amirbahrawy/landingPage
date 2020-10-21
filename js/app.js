/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/*
 *This repo helped me thinking for the task
  Github repo : https://github.com/conordewey3/Udacity-FED-Landing-Page
*/


/**
 * Define Global Variables
 *
*/
  let num=1;


  const sections = document.querySelectorAll('section');
  const navBar = document.querySelector('#navbar__list');

/**
 * End Global Variables
 * Start Helper Functions
 *
*/

// selecting the active Element from the page
  function selectActiveElemement() {
      maximumSec = sections[0];
      minVal = 1000000;
      for (item of sections) {
          let bounding = item.getBoundingClientRect();
          if (bounding.top > -300 & bounding.top < minVal) {
              minVal = bounding.top;
              maximumSec = item;
          };
      };
      return maximumSec;
  };

  /**
   * End Helper Functions
   * Begin Main Functions
   *
  */

  // build the nav
  function setNavElemnts (){
    for (let iterator of sections){
        const li = document.createElement('li');
        li.textContent = iterator.dataset.nav;
        li.dataset.nav = iterator.id;
        li.id="s"+num;
        li.className = 'menu__link';
        navBar.appendChild(li);
        num++;
    };
  };

// Add class 'active' to section when near top of viewport
  function activeSection(event){
    let activeSec = selectActiveElemement();
    // to break from the loop when we found the unselected section 
    let foundsec = false ;
    let foundbar =false;

    activeSec.classList.add='your-active-class';

    for(let iterator of sections ){
      if(iterator.id != activeSec.id && iterator.classList.contains('your-active-class') && !foundsec){
        iterator.classList.remove('your-active-class');
        foundsec=true;
      }
      if(foundsec){
        foundsec=false;
        break;
      }
    }

    let id_active = activeSec.id;
    const activeBar = document.getElementById('s'+id_active[id_active.length-1]);
    activeBar.classList.add('active__link');
    // select all the nav bar to delete active link class from non active one
    const barElemnts = document.querySelectorAll('.menu__link');

    for(let iterator of barElemnts){
      if(iterator.id !=activeBar.id && iterator.classList.contains('active__link') && !foundbar){
          iterator.classList.remove('active__link');
          foundbar=true;
      }
      if(foundbar){
        foundbar=false;
        break;
      }
    }
  };


// Scroll to anchor ID using scrollTO event
function targetSection(event){
  const ID = event.target.dataset.nav;
  const target = document.querySelector('#'+ID);
  target.scrollIntoView();
}


// Build menu
setNavElemnts();
// Scroll to section on link click
navBar.addEventListener('click',targetSection);
// Set sections as active
window.addEventListener('scroll',activeSection);