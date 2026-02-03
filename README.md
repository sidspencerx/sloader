# sloader

A cross-platform AI ingestion layer for extracting full text from modern web pages
(JS-heavy, lazy-loaded, CORS-blocked) so apps can feed that text to AI models.

This monorepo contains:

- sloader-core: shared DOM extraction logic
- sloader-android: Capacitor plugin for Android WebView extraction
- sloader-ios: Capacitor plugin for iOS WKWebView extraction
- sloader-web: browser extension + fallback implementation
- sbud: reference app demonstrating sloader
