import Controller from './Controller';

export default class Home extends Controller {

  /* ------------------------------------------------------- */
  /* Here you can import specific components                 */
  /* And do your stuffs for this specific page               */
  /* ------------------------------------------------------- */

  constructor() {
    super();
    console.log('Home Page Controller inited');

    // e.g. importing a test component and instancing it 2 times:
    this.importComponents(`TestComponent`).then(({default: comp}) => {
      let firstTestInited = new comp('first test instance');
      let secondTestInited = new comp('second test instance');
    });

  }

}

