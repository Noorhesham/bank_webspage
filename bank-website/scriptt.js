//OPEN CLOSE MODAL
//we need to have 2 classes first is for the button i will open the model and i will associate the open modal function on it
//second is the class that i will associate to close modal button and i will call the close modal function on clicking on it
//sure we have the modal and overlay added the hidden class to them which we will add or remove according to the click event
//VARAIBLES
const btnopenmodal = document.querySelectorAll('.btn--show-modal');
const btnclosemodal = document.querySelector('.btn--close-modal');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const links = document.querySelector('.nav__links');

const tabs = document.querySelectorAll('.operations__tab');
const tabcontainer = document.querySelector('.operations__tab-container');
const tabscontent = document.querySelectorAll('.operations__content');

const nav = document.querySelector('.nav');
//FUNCTIONS
const openmodal = e => {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const closemodal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
//_____________________________________________________________
//OPEN CLOSE MODAL
btnopenmodal.forEach(btn => btn.addEventListener('click', openmodal));
btnclosemodal.addEventListener('click', closemodal);
overlay.addEventListener('click', closemodal);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) closemodal();
});
//____________________________________________

//BUTTON SCROLLING
btnScrollTo.addEventListener('click', e => {
  // const s1coords = section1.getBoundingClientRect();
  //   window.scrollTo({
  //     left: s1coords.left + window.pageXOffset,
  //     top: s1coords.top + window.pageYOffset,
  //     behavior: 'smooth',
  //   });
  section1.scrollIntoView({ behavior: 'smooth' });
});
//LINKS SCROLLING
links.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//SWITCH TABS
/*we need 2 compnents buttons and tabs and we need to associate them using data tab with numbers
so we have an active class for both of them but the content has different classes associated with the button datatab
when we click at bytton we add active class remove all active classes from other buttons 
then we add active class to the content tab that has the data tap associated with clicked button */

tabcontainer.addEventListener('click', function (e) {
  //EVENT DELEGATION TO GET THE BUTTON with closest class with name that applied to all buttons
  //USE OPTIONAL chaining to check if we got the button
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;

  //REMOVE ACTIVE CLASS FROM OTHER ELEMENTS
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabscontent.forEach(c => c.classList.remove('operations__content--active'));

  //ADD ACTIVE CLASS TO CURRENT ELEMENTS(buttons and tabs)
  //we wont use optional chaining cause if clicked is null we will keep excutong the code and the tab will be empty
  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//FADE ANIMATION on navigation bar
//mouseenter does not bubble
//PASS ARGUMENT TO CALLBACK FUNCTION OF EVENTLISTENR
/*there are 3 ways to do this 
1.the first way is to put the hover function inside of normal call back of the event listener
so after we call it inside it will excute inside the function 
nav.addEventListner("click",e=>hover(1))

2.the second way is to use the bind method to generate a new function which is set arguments automatically 
the bind will set hover's function this to the opacity so we will make the opacity in the hover function equals to this 

3.last and best way is to make the hover function returned inside outer function that takes the opacity argument 
and add it to the hover function with closure principle and make the argument of hover function only the event 
the returned function is a function with event argument and the opacity is dropped inside the function cause
the outter function excuted totallly destroyed leaving its ve in the inner function 
so the outter function only recieves the value and leaves it to the inner function so that the inner function can revieve it 
*/
const hover = function (opacity) {
  return function (e) {
    if (e.target.classList.contains('nav__link')) {
      const link = e.target;
      const siblings = link.closest('.nav').querySelectorAll('.nav__link');
      const logo = link.closest('.nav').querySelector('img');
      siblings.forEach(s => {
        if (s != link) s.style.opacity = opacity;
      });
      logo.style.opacity = opacity;
    }
  };
};
nav.addEventListener('mouseover', hover(0.5));
nav.addEventListener('mouseout', hover(1));

// window.addEventListener('scroll',function () {
//   if(window.scrollY>section1.getBoundingClientRect().top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// })

const navheight = nav.getBoundingClientRect().height;

const observeCallBack = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const observer = new IntersectionObserver(observeCallBack, {
  root: null,
  threshold: 0,
  rootMargin: -navheight + 'px',
});
observer.observe(document.querySelector('header'));

const allsections = document.querySelectorAll('.section');
const revelSection = function (entries, observe) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observe;
};
const sectionObserver = new IntersectionObserver(revelSection, {
  root: null,
  threshold: 0.15,
});
allsections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});
