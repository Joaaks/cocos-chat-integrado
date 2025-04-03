
@echo off
REM Script to build the Casino Chat Widget

REM Set environment variable to indicate we're building the widget
set WIDGET=true

REM Run the Vite build command
npx vite build

echo Widget built successfully!
echo Files are available in the widget-dist directory
echo You can test the widget using public/widget-demo.html
