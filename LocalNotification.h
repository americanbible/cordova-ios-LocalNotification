/*!
 * Cordova 2.3.0+ LocalNotification plugin
 * Original author: Olivier Lesnicki
 * 
 * Fork: American Bible Society
 */

#import <Cordova/CDV.h>

@interface LocalNotification : CDVPlugin

- (void)addNotification:(CDVInvokedUrlCommand*)command;
- (void)cancelNotification:(CDVInvokedUrlCommand*)command;
- (void)cancelAllNotifications:(CDVInvokedUrlCommand*)command;

@end
