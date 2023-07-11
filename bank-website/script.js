//VARIABLES
const buttonOpen = document.querySelectorAll('.btn--show-modal');
const buttonClose = document.querySelector('.btn--close-modal');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const links = document.querySelector('.nav__links');
const siblings = links.querySelectorAll('.nav__link');
const logo = document.getElementById('logo');
const section1 = document.getElementById('section--1');
const loadMoreButton = document.querySelector('.btn--scroll-to');
const imgs = document.querySelectorAll('img[data-src]');
const allsections=document.querySelectorAll('.section');
const tabs = document.querySelectorAll('.operations__tab');
const tabcontainer = document.querySelector('.operations__tab-container');
const tabscontent = document.querySelectorAll('.operations__content');
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const btnright = document.querySelector('.slider__btn--right');
const btnleft = document.querySelector('.slider__btn--left');
const dotcontainer = document.querySelector('.dots');

//MODAL OPEN AND CLOSE 
const openModal = () => {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const closemodal = e => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
document.addEventListener('keydown', e => {
  if (!overlay.classList.contains('hidden') && e.key === 'Escape') closemodal();
});
overlay.addEventListener('click', closemodal);
buttonOpen.forEach(button => button.addEventListener('click', openModal));
buttonClose.addEventListener('click', closemodal);

//SMOOTH scrolling
loadMoreButton.addEventListener('click', function (e) {
  e.preventDefault();
  section1.scrollIntoView({ behavior: 'smooth' });
});

links.addEventListener('click', function (e) {
  e.preventDefault();
  const id = e.target.getAttribute('href');
  document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
});

//Hoover effect
//(mouseover is implemented on father and children) USING CLOSURE.. we can use bind passing the opacity as 'this'
const hover = function (opacity) {
  return function (e) {
    const target = e.target;
    logo.style.opacity = opacity;
    siblings.forEach(sibling => {
      if (sibling != target) sibling.style.opacity = opacity;
    });
  };
};
links.addEventListener('mouseover', hover(0.5));
links.addEventListener('mouseout', hover(1));

//NAV SCROLL
let lastscroll=window.pageYOffset;
const scroll=function(){
  const curScroll=window.pageYOffset;
  if(curScroll>nav.getBoundingClientRect().height) 
  nav.classList.add('sticky')
  if(curScroll<=lastscroll) nav.classList.remove('sticky'); 
  lastscroll=curScroll
}
window.addEventListener('scroll',scroll)
const span=document.createElement('span');
siblings.forEach(sibling=>sibling.appendChild(span))
//ACTIVE NAVIGATION
const activeSection=(entries)=>{
  entries.forEach(entry=>{
  if (!entry.isIntersecting) return;
  else{
    const id=entry.target.getAttribute('id');
    const active=document.querySelector(`.nav__link[href="#${id}"]`);
  siblings.forEach(sibling=>{
    if(sibling!=active) sibling.classList.remove('active-nav');
  })
  active?.classList.add('active-nav');
}
})
}
const sectionactive = new IntersectionObserver(activeSection, {root: null,threshold:0.12,rootMargin:'10px'});
allsections.forEach(section => sectionactive.observe(section));

//LOAD SECTIONS
const loadSections = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  });
};
const sectionObserver = new IntersectionObserver(loadSections, {root: null,threshold: 0.2,});
allsections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});
//LOAD IMAGES
const loadimg = function (entries, observe) {
  entries.forEach(entry => {
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', function () {
      this.classList.remove('lazy-img');
    });
    observe.unobserve(entry.target);
  });
};
const imgobserver = new IntersectionObserver(loadimg, {root: null,threshold: 0.1,rootMargin: 200 + 'px',});
imgs.forEach(img => imgobserver.observe(img));
//TAB MENU
tabcontainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabscontent.forEach(c => c.classList.remove('operations__content--active'));

  clicked.classList.add('operations__tab--active');
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});
//SLIDE
const sliderFunction=function(){
let currentslide=0;
const moveSlider=curslide=>slides.forEach((slide,i)=>slide.style.transform=`translateX(${(i-curslide)*100}%)`);
const creatDots = function () {
  slides.forEach((_, i) => {
    dotcontainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
const activeDots = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};
const moveRight=()=>{
  if(currentslide===slides.length-1) currentslide=0;
  else currentslide++;
  moveSlider(currentslide);
  activeDots(currentslide)
}
const moveLeft=()=>{
  if(currentslide===0) currentslide=slides.length-1;
  else currentslide--;
  moveSlider(currentslide);
  activeDots(currentslide);
}
  moveSlider(0);
  creatDots();
  activeDots(0);
  dotcontainer.addEventListener('click',(e)=>{
    if(e.target.classList.contains('dots__dot')) currentslide= +e.target.dataset.slide;
    moveSlider(currentslide);
    activeDots(currentslide);
  })
btnright.addEventListener('click',moveRight);
btnleft.addEventListener('click',moveLeft);
document.addEventListener('keydown',(e)=>{
  if(e.key==='ArrowRight') moveRight();
  if(e.key==='ArrowLeft') moveLeft();
})
}

sliderFunction();