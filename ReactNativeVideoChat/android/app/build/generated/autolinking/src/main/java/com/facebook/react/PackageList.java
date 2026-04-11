package com.facebook.react;

import android.app.Application;
import android.content.Context;
import android.content.res.Resources;

import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainPackageConfig;
import com.facebook.react.shell.MainReactPackage;
import java.util.Arrays;
import java.util.ArrayList;

// @invertase/react-native-apple-authentication
import com.RNAppleAuthentication.AppleAuthenticationAndroidPackage;
// @react-native-async-storage/async-storage
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
// @react-native-camera-roll/camera-roll
import com.reactnativecommunity.cameraroll.CameraRollPackage;
// @react-native-community/datetimepicker
import com.reactcommunity.rndatetimepicker.RNDateTimePickerPackage;
// @react-native-community/geolocation
import com.reactnativecommunity.geolocation.GeolocationPackage;
// @react-native-community/masked-view
import org.reactnative.maskedview.RNCMaskedViewPackage;
// @react-native-community/netinfo
import com.reactnativecommunity.netinfo.NetInfoPackage;
// @react-native-community/slider
import com.reactnativecommunity.slider.ReactSliderPackage;
// @react-native-firebase/app
import io.invertase.firebase.app.ReactNativeFirebaseAppPackage;
// @react-native-firebase/auth
import io.invertase.firebase.auth.ReactNativeFirebaseAuthPackage;
// @react-native-firebase/firestore
import io.invertase.firebase.firestore.ReactNativeFirebaseFirestorePackage;
// @react-native-firebase/functions
import io.invertase.firebase.functions.ReactNativeFirebaseFunctionsPackage;
// @react-native-firebase/messaging
import io.invertase.firebase.messaging.ReactNativeFirebaseMessagingPackage;
// @react-native-google-signin/google-signin
import com.reactnativegooglesignin.RNGoogleSigninPackage;
// @react-native-picker/picker
import com.reactnativecommunity.picker.RNCPickerPackage;
// expo
import expo.modules.ExpoModulesPackage;
// react-native-callkeep
import io.wazo.callkeep.RNCallKeepPackage;
// react-native-device-info
import com.learnium.RNDeviceInfo.RNDeviceInfo;
// react-native-fbsdk-next
import com.facebook.reactnative.androidsdk.FBSDKPackage;
// react-native-gesture-handler
import com.swmansion.gesturehandler.RNGestureHandlerPackage;
// react-native-get-random-values
import org.linusu.RNGetRandomValuesPackage;
// react-native-incall-manager
import com.zxcpoiu.incallmanager.InCallManagerPackage;
// react-native-reanimated
import com.swmansion.reanimated.ReanimatedPackage;
// react-native-safe-area-context
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
// react-native-splash-screen
import org.devio.rn.splashscreen.SplashScreenReactPackage;
// react-native-twilio-video-webrtc
import com.twiliorn.library.TwilioPackage;
// react-native-vector-icons
import com.oblador.vectoricons.VectorIconsPackage;
// react-native-webrtc
import com.oney.WebRTCModule.WebRTCModulePackage;
// react-native-webview
import com.reactnativecommunity.webview.RNCWebViewPackage;
// react-native-worklets-core
import com.worklets.WorkletsCorePackage;

@SuppressWarnings("deprecation")
public class PackageList {
  private Application application;
  private ReactNativeHost reactNativeHost;
  private MainPackageConfig mConfig;

  public PackageList(ReactNativeHost reactNativeHost) {
    this(reactNativeHost, null);
  }

  public PackageList(Application application) {
    this(application, null);
  }

  public PackageList(ReactNativeHost reactNativeHost, MainPackageConfig config) {
    this.reactNativeHost = reactNativeHost;
    mConfig = config;
  }

  public PackageList(Application application, MainPackageConfig config) {
    this.reactNativeHost = null;
    this.application = application;
    mConfig = config;
  }

  private ReactNativeHost getReactNativeHost() {
    return this.reactNativeHost;
  }

  private Resources getResources() {
    return this.getApplication().getResources();
  }

  private Application getApplication() {
    if (this.reactNativeHost == null) return this.application;
    return this.reactNativeHost.getApplication();
  }

  private Context getApplicationContext() {
    return this.getApplication().getApplicationContext();
  }

  public ArrayList<ReactPackage> getPackages() {
    return new ArrayList<>(Arrays.<ReactPackage>asList(
      new MainReactPackage(mConfig),
      new AppleAuthenticationAndroidPackage(),
      new AsyncStoragePackage(),
      new CameraRollPackage(),
      new RNDateTimePickerPackage(),
      new GeolocationPackage(),
      new RNCMaskedViewPackage(),
      new NetInfoPackage(),
      new ReactSliderPackage(),
      new ReactNativeFirebaseAppPackage(),
      new ReactNativeFirebaseAuthPackage(),
      new ReactNativeFirebaseFirestorePackage(),
      new ReactNativeFirebaseFunctionsPackage(),
      new ReactNativeFirebaseMessagingPackage(),
      new RNGoogleSigninPackage(),
      new RNCPickerPackage(),
      new ExpoModulesPackage(),
      new RNCallKeepPackage(),
      new RNDeviceInfo(),
      new FBSDKPackage(),
      new RNGestureHandlerPackage(),
      new RNGetRandomValuesPackage(),
      new InCallManagerPackage(),
      new ReanimatedPackage(),
      new SafeAreaContextPackage(),
      new SplashScreenReactPackage(),
      new TwilioPackage(),
      new VectorIconsPackage(),
      new WebRTCModulePackage(),
      new RNCWebViewPackage(),
      new WorkletsCorePackage()
    ));
  }
}