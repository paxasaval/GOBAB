// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'iso18091storage',
    appId: '1:399872374285:web:53e4126985bd18e3578744',
    storageBucket: 'iso18091storage.appspot.com',
    apiKey: 'AIzaSyC-fiAAIOnYBaDjZfBHb9iyqYVYSEeQ9L0',
    authDomain: 'iso18091storage.firebaseapp.com',
    messagingSenderId: '399872374285',
  },
  production: false,
  //API_URL:'http://localhost:3001',
  ROL_ADMIN:'Administrador',
  ROL_RESPONSIBLE:'Responsable',
  TENATID:'64616f718e118fb22d4059e3',

  //API_URL:'https://iso-18091-backend-production.up.railway.app'
  API_URL:'https://iso-18091-backend-test-production.up.railway.app'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
