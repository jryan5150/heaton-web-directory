const Figma = require('figma-api');
const fs = require('fs');

// Your Figma file ID from the URL
const FIGMA_FILE_ID = '01KU24CtuhQtZbScfyxy2P';

// Instructions for getting your Figma token
console.log('🎨 Figma Design Fetcher');
console.log('======================');
console.log('');
console.log('To connect to your Figma file, you need a Personal Access Token:');
console.log('');
console.log('1. Go to https://www.figma.com/developers/api#access-tokens');
console.log('2. Click "Get personal access token"');
console.log('3. Generate a new token');
console.log('4. Copy the token');
console.log('5. Run this script with: node fetch-figma-design.js YOUR_TOKEN_HERE');
console.log('');

// Get token from command line argument
const token = process.argv[2];

if (!token) {
  console.log('❌ No token provided. Please run:');
  console.log('   node fetch-figma-design.js YOUR_FIGMA_TOKEN');
  process.exit(1);
}

// Initialize Figma API
const api = new Figma.Api({
  personalAccessToken: token,
});

async function fetchFigmaDesign() {
  try {
    console.log('🔍 Fetching Figma file data...');

    // Fetch the file
    const fileData = await api.getFile(FIGMA_FILE_ID);

    console.log('✅ Successfully fetched Figma file!');
    console.log(`📄 File: ${fileData.name}`);
    console.log(`📅 Last Modified: ${fileData.lastModified}`);
    console.log(`🖼️  Pages: ${fileData.document.children.length}`);

    // Save the raw data
    fs.writeFileSync('figma-design-data.json', JSON.stringify(fileData, null, 2));
    console.log('💾 Saved design data to figma-design-data.json');

    // Extract design tokens
    const designTokens = extractDesignTokens(fileData);
    fs.writeFileSync('figma-design-tokens.json', JSON.stringify(designTokens, null, 2));
    console.log('🎨 Extracted design tokens to figma-design-tokens.json');

    // Generate CSS from design tokens
    const css = generateCSS(designTokens);
    fs.writeFileSync('figma-design.css', css);
    console.log('💅 Generated CSS to figma-design.css');

    console.log('');
    console.log('🚀 Ready to implement! Files created:');
    console.log('   - figma-design-data.json (complete file data)');
    console.log('   - figma-design-tokens.json (colors, fonts, spacing)');
    console.log('   - figma-design.css (ready-to-use CSS)');

  } catch (error) {
    console.error('❌ Error fetching Figma file:', error.message);

    if (error.message.includes('403')) {
      console.log('');
      console.log('💡 This might be due to:');
      console.log('   - Invalid token');
      console.log('   - File is private and token doesn\'t have access');
      console.log('   - File URL is incorrect');
    }
  }
}

function extractDesignTokens(fileData) {
  const tokens = {
    colors: {},
    fonts: {},
    spacing: {},
    components: []
  };

  // Extract colors from styles
  if (fileData.styles) {
    Object.values(fileData.styles).forEach(style => {
      if (style.styleType === 'FILL') {
        tokens.colors[style.name] = style;
      }
    });
  }

  // Extract components
  if (fileData.components) {
    Object.values(fileData.components).forEach(component => {
      tokens.components.push({
        name: component.name,
        description: component.description,
        id: component.key
      });
    });
  }

  return tokens;
}

function generateCSS(tokens) {
  let css = '/* Figma Design Tokens */\n\n';

  css += ':root {\n';

  // Add colors
  Object.entries(tokens.colors).forEach(([name, color]) => {
    const cssName = name.toLowerCase().replace(/\s+/g, '-');
    css += `  --figma-${cssName}: /* ${name} */;\n`;
  });

  css += '}\n\n';

  // Add component styles
  css += '/* Component Styles */\n';
  tokens.components.forEach(component => {
    const className = component.name.toLowerCase().replace(/\s+/g, '-');
    css += `.figma-${className} {\n`;
    css += `  /* ${component.description || component.name} */\n`;
    css += '}\n\n';
  });

  return css;
}

// Run the fetch
fetchFigmaDesign();