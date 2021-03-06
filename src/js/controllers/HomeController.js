import Controller from './Controller';

export default class Home extends Controller {

  /* ------------------------------------------------------- */
  /* Here you can import specific components                 */
  /* And do your stuffs for this specific page               */
  /* ------------------------------------------------------- */

  constructor() {
    super();

    this.importComponents(`Paradise`).then(({default: comp}) => {
      window.onload = () => { new comp('navigation'); }
    });

  }

}

