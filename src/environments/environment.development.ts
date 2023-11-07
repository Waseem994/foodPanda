// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // apiUrl: 'http://localhost:5000',
  apiUrl: 'http://165.22.160.143:5000',
  // apiUrl: 'http://10.10.0.8:5000',

  tplMapsApiKey: 'YOUR_TPL_MAPS_API_KEY',
  tplMapsScriptUrl: "https://api1.tplmaps.com/js-api-v2/assets/tplmaps.js?api_key=$2a$10$V2sJDHXK2hiz05b8caFqXOr1ri6DwteSwhUThvbxN6CoDEwIJPTSm",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
