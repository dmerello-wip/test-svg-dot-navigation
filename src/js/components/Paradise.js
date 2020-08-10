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
      this.initCursorInteraction();
    });

    this.menuItems.forEach((el, index)=>{
      el.addEventListener('click', (e)=>{
        this.setPositionOnClick(e);
      });
    });

  }

  setPosition(position){
    let p = this.curve.getPointAtLength( position *  this.totalLength);
    this.dot.setAttribute("transform", `translate(${p.x}, ${p.y})`);
  }

  initCursorInteraction(e){
    let toScroll = (this.scroller.offsetHeight - this.wrapper.offsetHeight) ;
    let scrolled = this.wrapper.scrollTop;
    let perc = (scrolled * 100) / toScroll ;
    let position = perc/100;
    this.setPosition(position);
  }

  setPositionOnClick(e){
    e.preventDefault();
    let position = e.target.dataset.position;
    let p = this.curve.getPointAtLength( position *  this.totalLength);
    console.log(p);
    this.animation = TweenMax.to(this.dot, 1, {
      transform: `translate(${p.x}, ${p.y})`,
      ease:Strong.easeOut
    });
  }
}


