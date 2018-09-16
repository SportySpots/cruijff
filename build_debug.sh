yarn android:build
keytool -genkey -v -keystore test-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000 -noprompt -storepass 123456 -keypass 123456 -dname "CN=sportyspots.com, OU=ID, O=SPORTYSPOTS, L=Foo, S=Bar, C=NL"
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore test-key.keystore ./android/app/build/outputs/apk/release/app-release-unsigned.apk alias_name -storepass 123456
#yarn jest appium.test.js
