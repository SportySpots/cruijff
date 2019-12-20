/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"
#import <CodePush/CodePush.h>
#import <AppCenterReactNativeCrashes/AppCenterReactNativeCrashes.h>
#import <AppCenterReactNativeAnalytics/AppCenterReactNativeAnalytics.h>
#import <AppCenterReactNative/AppCenterReactNative.h>
#import <UserNotifications/UserNotifications.h>

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "ReactNativeConfig.h"

#import "RCTLinkingManager.h"

#import <Firebase.h>
#import "RNFirebaseNotifications.h"
#import "RNFirebaseMessaging.h"
#import "RNFirebaseLinks.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [AppCenterReactNative register];  // Initialize AppCenter
  [AppCenterReactNativeCrashes register];  // Initialize AppCenter crashes
  [AppCenterReactNativeAnalytics registerWithInitiallyEnabled:false];  // Initialize AppCenter analytics
  [AppCenterReactNative register];  // Initialize AppCenter

  [FIROptions defaultOptions].deepLinkURLScheme = @"com.sportyspots.ios";
  [FIRApp configure];

  [RNFirebaseNotifications configure];

  // Additional setup for push notifications
  // https://github.com/invertase/react-native-firebase/issues/1203
  if ([UNUserNotificationCenter class] != nil) {
    // iOS 10 or later
    // For iOS 10 display notification (sent via APNS)
    [UNUserNotificationCenter currentNotificationCenter].delegate = self;
    UNAuthorizationOptions authOptions = UNAuthorizationOptionAlert |
    UNAuthorizationOptionSound | UNAuthorizationOptionBadge;
    [FIRMessaging messaging].delegate = self;
    [[UNUserNotificationCenter currentNotificationCenter]
     requestAuthorizationWithOptions:authOptions
     completionHandler:^(BOOL granted, NSError * _Nullable error) {
      if (error) { NSLog(@"%@", error); }
    }];
  } else {
    // iOS 10 notifications aren't available; fall back to iOS 8-9 notifications.
    UIUserNotificationType allNotificationTypes =
    (UIUserNotificationTypeSound | UIUserNotificationTypeAlert | UIUserNotificationTypeBadge);
    UIUserNotificationSettings *settings =
    [UIUserNotificationSettings settingsForTypes:allNotificationTypes categories:nil];
    [application registerUserNotificationSettings:settings];
  }
  [application registerForRemoteNotifications];

  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"SportySpots"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [CodePush bundleURL];
#endif
}

// https://rnfirebase.io/docs/v5.x.x/links/ios
- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
            options:(NSDictionary<NSString *, id> *)options {
  return [[RNFirebaseLinks instance] application:application openURL:url options:options];
}

- (BOOL)application:(UIApplication *)application
continueUserActivity:(NSUserActivity *)userActivity
 restorationHandler:(void (^)(NSArray *))restorationHandler {
  return [[RNFirebaseLinks instance] application:application continueUserActivity:userActivity restorationHandler:restorationHandler];
}

// https://rnfirebase.io/docs/v5.x.x/notifications/ios
- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification {
  [[RNFirebaseNotifications instance] didReceiveLocalNotification:notification];
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(nonnull NSDictionary *)userInfo
fetchCompletionHandler:(nonnull void (^)(UIBackgroundFetchResult))completionHandler{
  [[RNFirebaseNotifications instance] didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}

- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings {
  [[RNFirebaseMessaging instance] didRegisterUserNotificationSettings:notificationSettings];
}

@end
