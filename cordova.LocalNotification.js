/*!
 * Cordova 2.3.0+ LocalNotification plugin
 * Original author: Olivier Lesnicki
 *
 * Forked: American Bible Society
 */
(function(cordovaRef) {

  var LocalNotification = function() {};

  /** --------------------------------------------------------------------------
   * Schedules a host iOS UILocalNotification.
   *
   * @param {Object} options Hash of options for the notication.
   *
   * Supported options:
   *
   *    @option {Date} fireDate - When to fire the first alert.
   *    @option {String} alertBody - Contents of the badge message.
   *    @option {String} repeatInterval - Schedule a repeating alert: daily|weekly|monthly|hourly
   *    @option {String} soundName - Named resource for optional notification sound.
   *    @option {Number} notificationId - Identifier for the notification.
   *    @option {Function} foreground - Callback function if the notification is fired in the foreground.
   *    @option {Function} background - Callback function if the notification is fired in the background.
   */
  LocalNotification.prototype.schedule = function(options) {
    var defaults = {
      fireDate : new Date(new Date().getTime() + 10000),   // 10 seconds from now
      alertBody : "This is a local notification.",
      repeatInterval : "" ,
      soundName : "" ,
      notificationId : 1 ,
      background : function(notificationId) {
        console.log(" -- LocalNotification.background("+notificationId+") -- ");
      },
      foreground : function(notificationId) {
        console.log(" -- LocalNotification.foreground("+notificationId+") -- ");
      }
    };

    // Combine incoming options with the default set.
    options = options || {};
    for (var key in defaults) {
      if (typeof options[key] === "undefined") {
        options[key] = defaults[key];
      }
    }

    // Converts JS Date (millisecond based) to NSDate (second based)
    if (typeof options.fireDate === "object") {
      options.fireDate = Math.round(options.fireDate.getTime()/1000);
    }
   
    cordovaRef.exec (
      function (params) {
        window.setTimeout (function() {
          if (typeof options.foreground === "function") {
            if (params.appState == "active") {
              options.foreground(params.notificationId);
              return;
            }
          }
          if (typeof options.background === "function") {
            if (params.appState != "active") {
              options.background(params.notificationId);
              return;
            }
          }
        }, 1);
      },
      null,
      "LocalNotification",
      "addNotification",
      [options.fireDate, options.alertBody, options.repeatInterval, options.soundName, options.notificationId]
    );
  };

  /** --------------------------------------------------------------------------
   * Cancels a specific iOS UILocalNotification.
   *
   * @param {Number} id - id of the notification to cancel.
   * @param {Function} callback - callback handler
   */
  LocalNotification.prototype.cancel = function(id) {
    cordovaRef.exec(null, null, "LocalNotification", "cancelNotification", [id]);
  };

  /** --------------------------------------------------------------------------
   * Cancels all iOS UILocalNotifications.
   *
   * @param {Function} callback - callback handler
   */
  LocalNotification.prototype.cancelAll = function() {
    cordovaRef.exec(null, null, "LocalNotification", "cancelAllNotifications", []);
  };

  /** --------------------------------------------------------------------------
   * Install as a plugin. 
   */
  cordovaRef.addConstructor(function () {
    if (cordovaRef.addPlugin) {
      cordovaRef.addPlugin("localNotification", LocalNotification);
    } else {
      if (!window.plugins) {
        window.plugins = {};
      }
      window.plugins.localNotification = new LocalNotification();
    }
  });

})(window.PhoneGap || window.Cordova || window.cordova);
