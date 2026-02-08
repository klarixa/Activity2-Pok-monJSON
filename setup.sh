#!/bin/bash

# Pokemon JSON Parser - Discovery Challenge Setup
# Activity 02: API Integration Mastery

echo "🎯 Setting up Pokemon JSON Parser Discovery Challenge..."
echo ""

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ Error: Please run this script from the activity-02-pokemon-json directory"
    echo "   Make sure you have index.html in the current directory"
    exit 1
fi

echo "📋 Checking required files..."

# Check for required files
required_files=("index.html" "script.js" "styles.css" "README.md" "package.json")
missing_files=()

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "   ✅ $file"
    else
        echo "   ❌ $file (missing)"
        missing_files+=("$file")
    fi
done

if [ ${#missing_files[@]} -ne 0 ]; then
    echo ""
    echo "❌ Missing required files. Please ensure all template files are present."
    exit 1
fi

echo ""
echo "🌐 Testing internet connectivity..."

# Test API connectivity
if curl -s --head https://pokeapi.co/api/v2/pokemon/pikachu | head -n 1 | grep -q "200 OK"; then
    echo "   ✅ Pokemon API is accessible"
else
    echo "   ⚠️  Pokemon API may be temporarily unavailable"
    echo "   💡 You can still practice with the included sample data"
fi

echo ""
echo "📚 Discovery Challenge Overview:"
echo "   🎯 8 Progressive Challenges"
echo "   📊 Focus: JSON parsing, API integration, async programming"
echo "   🔬 Method: Research-driven discovery learning"
echo ""

echo "🚀 Starting local development server..."
echo ""

# Check if Python is available
if command -v python3 &> /dev/null; then
    echo "   📡 Server will start at: http://localhost:8000"
    echo "   🛑 Press Ctrl+C to stop the server"
    echo ""
    echo "🎓 DISCOVERY LEARNING TIPS:"
    echo "   1. Open browser DevTools (F12) to inspect network requests"
    echo "   2. Use console.log() liberally to understand data structures"
    echo "   3. Start with Challenge 1 and work sequentially"
    echo "   4. Each challenge builds on previous knowledge"
    echo "   5. Focus on understanding WHY, not just WHAT"
    echo ""
    echo "📖 Learning Objectives:"
    echo "   • Master fetch() API and async/await patterns"
    echo "   • Navigate complex JSON data structures"
    echo "   • Process arrays and objects efficiently"
    echo "   • Handle concurrent API requests"
    echo "   • Build professional error handling"
    echo ""
    echo "🔥 Starting development server..."
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "   📡 Server will start at: http://localhost:8000"
    echo "   🛑 Press Ctrl+C to stop the server"
    echo ""
    python -m SimpleHTTPServer 8000
else
    echo "   ❌ Python not found. Please install Python or use an alternative server."
    echo ""
    echo "🔧 Alternative options:"
    echo "   • Use Live Server extension in VS Code"
    echo "   • Use 'npx serve .' if you have Node.js"
    echo "   • Upload to StackBlitz or CodePen"
    echo ""
fi

echo ""
echo "✨ Happy discovering! Master JSON parsing through hands-on exploration! 🎯"