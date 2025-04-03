
#!/bin/bash
# Script to build the Casino Chat Widget

# Set environment variable to indicate we're building the widget
export WIDGET=true

# Run the Vite build command
npx vite build

echo "Widget built successfully!"
echo "Files are available in the widget-dist directory"
echo "You can test the widget using public/widget-demo.html"
