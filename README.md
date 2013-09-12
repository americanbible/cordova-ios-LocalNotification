Cordova Local Notification Plugin
=================================

A Cordova 2.3.0+ plugin to create local notifications on iOs.

Originally by Olivier Lesnicki.

Installing the plugin
---------------------

1. Place `LocalNotification.m` and LocalNotification.h in your `Plugins` folder
2. Place `cordova.localNotification.js` in your `www` folder
3. Link your index page to `cordova.localNotification.js`
4. In `config.xml` add the following within the `<plugins>` tag

    	<plugin name="LocalNotification" value="LocalNotification" />

In order to enable the notification listener we need to uncomment a number of lines in `CDVPlugin.m` and `CDVPlugin.h

5. In `CordovaLib/Classes/CDVPlugin.m` uncomment the following line in `initWithWebView`

		[[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(didReceiveLocalNotification:) name:CDVLocalNotification object:nil];

6. In `CordovaLib/Classes/CDVPlugin.m` uncomment the following lines at the end of the file

		- (void)didReceiveLocalNotification:(NSNotification *)notification {}

7. In `CordovaLib/Classes/CDVPlugin.h` uncomment the following line

		 - (void)didReceiveLocalNotification:(NSNotification *)notification;

8. Place your `.caf sound in your App `Resources` folder (not the `www` folder)
