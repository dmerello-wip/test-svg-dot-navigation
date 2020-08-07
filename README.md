# Webpack Starter Kit with Chunks Code Splitting


## Webpack config:

- scss management (starts from src/scss/main.scss)
- moving fonts and static images from src to public folder
- optimize code and split code in chunks with Dynamic Asyncronous Imports
- maps and dev utilities
- **serve** script to run in local static environment
- **watch** and **prod** script to run in dev or prod environments

test service worker locally:
Service Worker runs only with official https certificats, in the scope of their path.
Use this terminal command to open a chrome instance without security checks:

``` 
  /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --disable-web-security --ignore-certificate-errors --user-data-dir=/tmp/ https://test.com
```
---

## Scss config:

- commented main.scss file with detailed guided organization and naming convenction of styles
- commented suggestions to include (if needed) the bootstrap scss main utilities (no dependency of bootstrap is imported by package json)
- scaffolding for abstract / components / layout / utils resources

---

## JS structure:

#### TL; DR;

 - name your Page Controler in html data-controller attribute (e.g. 'YourController').
 - create a js file as the examples in src/js/controllers/[YourController]
 - import and use your common components in src/js/controllers/Controller with the 'importComponent' method.
 - import and use your page specific components in src/js/controllers/[YourController] with the 'importComponent' method.

Here is the way it works:

#### Pages and Page Controllers:

the main script(src/index.js) takes from the html tag the data-controller name to be imported. ie:

```html
<html data-controller="HomeController"></html>
```

Under this path: **src/controllers/[controllerName].js**

you will create a Page Controller with the same name (ie: src/controllers/HomeController.js).

In this way the index script will import the correct controller for any page.


#### Page Controllers and Components:


the class into [controllerName].js will extend the Default Controller Class: **src/controllers/Controller.js**
 
The Default Controller Class has an importComponent method to manage the webpack Dynamic Import and load asincronously the components.
The Default Controller Class imports and instanciate common components for every page (e.g header).
Every Page Controller can use the same method to import and instanciate the specific page Components.

```js

    import Controller from './Controller';
    export default class MyPageController extends Controller {
      constructor() {
        super();
        this.importComponents(`TestComponent`).then(({default: comp}) => {
          let firstTestInited = new comp('first test instance');
          let secondTestInited = new comp('second test instance');
        });
      }
    }

```

---

### CSS structure:

Everything starts in  **src/scss/main.scss**

In that file  you will find commented guidelines to manage the imports of your scss files. We recommend to use that structure.

There's no framework imported, in the comments you will find some suggestions if you will use bootstrap.

