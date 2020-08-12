import { TweenMax, Strong, CSSPlugin } from "gsap";

export default class Paradise {

  constructor(wrapperId){

    // dom elements selectors
    this.wrapper = document.getElementById(wrapperId);
    this.dot = this.wrapper.querySelector(`.paradise__cursor`);
    this.curve = this.wrapper.querySelector(`.paradise__path`);
    this.scroller = this.wrapper.querySelector(`.paradise__scroller`);
    this.menuItems = document.querySelectorAll(`.primary-menu a`);
    this.viewbox = {
      w : this.wrapper.querySelector('svg').getAttribute('viewBox').split(' ')[2],
      h : this.wrapper.querySelector('svg').getAttribute('viewBox').split(' ')[3]
    }


    // curve size
    this.totalLength = this.curve.getTotalLength();

    // first position set from 0 to 1
    this.partial = 0;
    this.moveCursor();

    // init interactions
    this.menuItems.forEach((el, index)=>{
      el.addEventListener('click', (e)=>{
        this.setPositionOnClick(e);
      });
    });
  }


  setPositionOnClick(e){
    e.preventDefault();
    let toPartial = e.target.dataset.partial;
    let currentPartial = { value : this.partial };
    TweenMax.to(currentPartial, 2, {
      value: toPartial,
      ease: Strong.easeOut,
      onUpdate: () => {
        this.partial = currentPartial.value;
        this.moveCursor();
      }
    });
  }

  moveCursor(){
    // get the coords in viewbox for the point in the partial value
    let p = this.curve.getPointAtLength( this.partial *  this.totalLength);
    // move the cursor in those coords
    this.dot.setAttribute("transform", `translate(${p.x}, ${p.y})`);

    // shift wrapper in window as cursor in svg viewbox
    let shiftX =  - ((this.wrapper.offsetWidth * p.x) / this.viewbox.w ) / 2;
    let shiftY =  - ((this.wrapper.offsetHeight * p.y) / this.viewbox.h ) / 2;
    this.wrapper.style.top = `${shiftY}px`;
    this.wrapper.style.left = `${shiftX}px`;
  }
}



