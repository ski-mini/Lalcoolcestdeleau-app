App.info({
  name: 'LalcoolCestDeLeau',
  description: 'LalcoolCestDeLeau',
  author: 'Fbr',
  email: '',
  website: 'http://mathieuskimani.me',
  version: '0.0.1'
});

App.icons({

  // Android
  'android_mdpi': 'resources/icons/48x48.png',
  'android_hdpi': 'resources/icons/72x72.png',
  'android_xhdpi': 'resources/icons/96x96.png'
});

App.launchScreens({

  // Android
  'android_mdpi_landscape': 'resources/launchscreen/480x320.png',
  'android_hdpi_landscape': 'resources/launchscreen/800x480.png',
  'android_xhdpi_landscape': 'resources/launchscreen/1280x720.png'
});

App.setPreference('Orientation', 'portrait');
App.setPreference('StatusBarOverlaysWebView', 'false');
App.setPreference('StatusBarBackgroundColor', '#000000');