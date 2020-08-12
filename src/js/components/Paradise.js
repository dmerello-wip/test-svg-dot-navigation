import { TweenMax, Strong, CSSPlugin } from "gsap";

export default class Paradise {
  constructor(wrapperId){
    this.wrapper = document.getElementById(wrapperId);
    this.dot = this.wrapper.querySelector(`.paradise__cursor`);
    this.curve = this.wrapper.querySelector(`.paradise__path`);
    this.scroller = this.wrapper.querySelector(`.paradise__scroller`);
    this.menuItems = document.querySelectorAll(`.primary-menu a`);

    this.totalLength = this.curve.getTotalLength();
    this.startingPosition = 0;
    this.setPosition(this.startingPosition);

    this.wrapper.addEventListener('scroll', ()=>{
      this.setPositionOnScroll();
    });

    this.menuItems.forEach((el, index)=>{
      el.addEventListener('click', (e)=>{
        this.setPositionOnClick(e);
      });
    });

  }

  setPositionOnScroll(e){
    let toScroll = (this.scroller.offsetHeight - this.wrapper.offsetHeight) ;
    let scrolled = this.wrapper.scrollTop;
    let perc = (scrolled * 100) / toScroll ;
    let position = perc/100;
    this.setPosition(position);
  }

  setPositionOnClick(e){
    e.preventDefault();
    let targetPosition = e.target.dataset.position;
    let p = this.curve.getPointAtLength( targetPosition *  this.totalLength);
    var currentPosition = {value:0};
    TweenMax.to(currentPosition, 2, {
      value: targetPosition,
      ease:Strong.easeInOut,
      onUpdate:()=>{
        this.setPosition(currentPosition.value);
      }
    });
  }

  setPosition(position){
    let p = this.curve.getPointAtLength( position *  this.totalLength);
    this.dot.setAttribute("transform", `translate(${p.x}, ${p.y})`);
  }
}


