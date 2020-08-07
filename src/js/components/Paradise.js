export default class Paradise {
  constructor(wrapperId){
    this.wrapper = document.getElementById(wrapperId);
    this.dot = this.wrapper.querySelector(`.paradise__cursor`);
    this.curve = this.wrapper.querySelector(`.paradise__path`);
    this.scroller = this.wrapper.querySelector(`.paradise__scroller`);


    this.totalLength = this.curve.getTotalLength();
    this.startingPosition = 0;
    this.setPosition(this.startingPosition);

    this.wrapper.addEventListener('scroll', ()=>{
      this.initInteraction();
    });
  }

  setPosition(position){
    let p = this.curve.getPointAtLength( position *  this.totalLength);
    this.dot.setAttribute("transform", `translate(${p.x}, ${p.y})`);
  }


  initInteraction(e){
    let toScroll = (this.scroller.offsetHeight - this.wrapper.offsetHeight) ;
    let scrolled = this.wrapper.scrollTop;
    console.log(toScroll, scrolled);
    let perc = (scrolled * 100) / toScroll ;
    let position = perc/100;
    this.setPosition(position);
  }
}


