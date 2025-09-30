# Figma Integration with Claude Code

## Method 1: Figma API Setup

### Step 1: Get Figma Personal Access Token
1. Go to Figma.com → Account Settings → Personal Access Tokens
2. Generate a new token
3. Copy the token (keep it secure)

### Step 2: Install Figma API Client
```bash
npm install figma-api
```

### Step 3: Extract File ID from Figma URL
Your URL: https://www.figma.com/design/01KU24CtuhQtZbScfyxy2P/Employee-Directory--Community-
File ID: `01KU24CtuhQtZbScfyxy2P`

### Step 4: Use API to Fetch Design Data
```javascript
const Figma = require('figma-api');
const api = new Figma.Api({
  personalAccessToken: 'YOUR_TOKEN_HERE',
});

// Fetch file data
api.getFile('01KU24CtuhQtZbScfyxy2P').then(fileData => {
  console.log(fileData);
});
```

## Method 2: Export Assets from Figma Desktop

### Direct Export Approach:
1. Open your Figma file in desktop app
2. Select frames/components you want
3. Export as PNG/SVG to project directory
4. Use File → Export → Export as...

## Method 3: Figma Dev Mode (If Available)

### Copy CSS/Tokens:
1. Enable Dev Mode in Figma
2. Select components
3. Copy CSS properties
4. Paste specifications here

## Method 4: Manual Screenshot Method

### Quick Implementation:
1. Take screenshots of key screens
2. Save to project directory
3. Claude can read and implement design