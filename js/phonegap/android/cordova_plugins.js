cordova.define('cordova/plugin_list', function(require, exports, module) {
	module.exports = [
		{
			"file": "plugins/com.phonegap.plugins.barcodescanner/www/barcodescanner.js",
			"id": "com.phonegap.plugins.barcodescanner.BarcodeScanner",
			"clobbers": [
				"cordova.plugins.barcodeScanner"
			]
		},
		{
			"file": "plugins/org.apache.cordova.camera/www/CameraConstants.js",
			"id": "org.apache.cordova.camera.Camera",
			"clobbers": [
				"Camera"
			]
		},
		{
			"file": "plugins/org.apache.cordova.camera/www/CameraPopoverOptions.js",
			"id": "org.apache.cordova.camera.CameraPopoverOptions",
			"clobbers": [
				"CameraPopoverOptions"
			]
		},
		{
			"file": "plugins/org.apache.cordova.camera/www/Camera.js",
			"id": "org.apache.cordova.camera.camera",
			"clobbers": [
				"navigator.camera"
			]
		},
		{
			"file": "plugins/org.apache.cordova.camera/www/CameraPopoverHandle.js",
			"id": "org.apache.cordova.camera.CameraPopoverHandle",
			"clobbers": [
				"CameraPopoverHandle"
			]
		},
		{
			"file": "plugins/de.appplant.cordova.plugin.local-notification/www/local-notification.js",
			"id": "de.appplant.cordova.plugin.local-notification.LocalNotification",
			"clobbers": [
				"plugin.notification.local"
			]
		},
		{
			"file": "plugins/org.apache.cordova.device/www/device.js",
			"id": "org.apache.cordova.device.device",
			"clobbers": [
				"device"
			]
		}
	];
	module.exports.metadata =
// TOP OF METADATA
	{
		"com.phonegap.plugins.barcodescanner": "2.0.0",
		"org.apache.cordova.camera": "0.3.2",
		"de.appplant.cordova.plugin.local-notification": "0.8.0dev",
		"org.apache.cordova.device": "0.2.13-dev"
	}
// BOTTOM OF METADATA
});