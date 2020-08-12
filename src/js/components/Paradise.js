import { TweenMax, Strong, CSSPlugin } from "gsap";

export default class Paradise {

  constructor(wrapperId){

    // dom elements selectors
    this.wrapper = document.getElementById(wrapperId);
    this.track = this.wrapper.querySelector(`.paradise__track`);
    this.dot = this.wrapper.querySelector(`.paradise__cursor`);
    this.curve = this.wrapper.querySelector(`.paradise__path`);
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

    //TODO: calculate difference in position: speed is to set proportional to distance

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

    // shift track in window as cursor in svg viewbox
    let shiftX =  - ((this.track.offsetWidth * p.x) / this.viewbox.w ) + (window.innerWidth / 2);
    let shiftY =  - ((this.track.offsetHeight * p.y) / this.viewbox.h ) + (window.innerHeight / 2);
    this.track.style.transform = `translate(${shiftX}px, ${shiftY}px)`;
  }
}



