# Manual Upload Guide to GitHub

## 📋 Prerequisites

Before uploading your project to GitHub, ensure you have:
- A GitHub account (create one at [github.com](https://github.com) if needed)
- Git installed on your computer
- Your project files ready in a local directory

## 🚀 Method 1: Using GitHub Web Interface (Easiest)

### Step 1: Create a New Repository
1. Go to [github.com](https://github.com) and sign in
2. Click the **"+"** button in the top right corner
3. Select **"New repository"**
4. Fill in repository details:
   - **Repository name**: `heaton-web-directory`
   - **Description**: `Modern employee directory for Heaton organization`
   - **Visibility**: Choose Public or Private
   - **Initialize**: Leave unchecked (we'll upload existing files)
5. Click **"Create repository"**

### Step 2: Prepare Your Files
1. **Compress your project folder**:
   - On Windows: Right-click → "Send to" → "Compressed folder"
   - On Mac: Right-click → "Compress"
   - On Linux: `tar -czf heaton-directory.tar.gz /path/to/project`

### Step 3: Upload Files
1. On your new repository page, click **"uploading an existing file"**
2. **Drag and drop** your compressed file or click **"choose your files"**
3. **Extract if needed**: GitHub can handle zip files automatically
4. Add a commit message: `Initial commit: Heaton Web Directory`
5. Click **"Commit changes"**

## 🔧 Method 2: Using Git Command Line

### Step 1: Initialize Local Repository
```bash
# Navigate to your project directory
cd "/home/jryan/Projects/Heaton Web Directory"

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Heaton Web Directory with modern design enhancements"
```

### Step 2: Connect to GitHub
```bash
# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/heaton-web-directory.git

# Push to GitHub
git push -u origin main
```

### Step 3: Handle Authentication
If you encounter authentication issues:

**Option A: Personal Access Token (Recommended)**
1. Go to GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token with `repo` permissions
3. Use token as password when prompted

**Option B: GitHub CLI**
```bash
# Install GitHub CLI and authenticate
gh auth login
git push -u origin main
```

## 📁 Method 3: GitHub Desktop (User-Friendly)

### Step 1: Download GitHub Desktop
1. Go to [desktop.github.com](https://desktop.github.com)
2. Download and install GitHub Desktop
3. Sign in with your GitHub account

### Step 2: Add Your Project
1. Click **"Add an Existing Repository from your Hard Drive"**
2. Choose your project folder
3. Click **"create a repository"** if not already a git repo

### Step 3: Publish to GitHub
1. Click **"Publish repository"**
2. Name: `heaton-web-directory`
3. Description: `Modern employee directory for Heaton organization`
4. Choose public/private
5. Click **"Publish Repository"**

## 🎯 Method 4: Visual Studio Code Integration

### Step 1: Open in VS Code
1. Open VS Code
2. File → Open Folder → Select your project
3. Open the integrated terminal (Ctrl/Cmd + `)

### Step 2: Initialize and Push
```bash
# Initialize git
git init

# Add files
git add .

# Commit
git commit -m "Initial commit: Heaton Web Directory"

# Add remote (create repo on GitHub first)
git remote add origin https://github.com/YOUR_USERNAME/heaton-web-directory.git

# Push
git push -u origin main
```

### Step 3: Use VS Code Git Features
- Use the Source Control panel (Ctrl/Cmd + Shift + G)
- Stage changes by clicking "+"
- Commit with messages
- Push/pull using the sync button

## 🔍 Verification Steps

After uploading, verify your repository:

1. **Check Files**: Ensure all files are present
2. **Test Deployment**:
   - Go to repository Settings → Pages
   - Select "Deploy from branch" → main
   - Or connect to Vercel for automatic deployment
3. **Clone Test**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/heaton-web-directory.git
   cd heaton-web-directory
   npm install
   npm run dev
   ```

## 📝 Important Files to Include

Make sure these files are uploaded:
- ✅ `package.json` and `package-lock.json`
- ✅ `next.config.js`
- ✅ `tailwind.config.js`
- ✅ `tsconfig.json`
- ✅ All `/src` directory contents
- ✅ `.env.local` (create from `.env.example`)
- ✅ `README.md`
- ✅ `DEPLOYMENT.md`
- ✅ `FIGMA-WORKFLOW.md`

## 🚫 Files to Exclude

Create a `.gitignore` file with:
```
# Dependencies
node_modules/
.npm

# Production builds
.next/
out/
dist/

# Environment variables
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db
```

## 🎯 Quick Deploy to Vercel After Upload

1. **Connect Repository**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import from GitHub
   - Select your repository

2. **Configure Environment**:
   - Add environment variables:
     - `NEXTAUTH_URL`: Auto-detected
     - `NEXTAUTH_SECRET`: Generate new secret

3. **Deploy**:
   - Click "Deploy"
   - Get your live URL in ~30 seconds

## 🆘 Troubleshooting

### Common Issues:

**File Too Large Error**:
- Remove `node_modules/` and `.next/` folders
- Add them to `.gitignore`

**Authentication Failed**:
- Use Personal Access Token instead of password
- Enable 2FA on GitHub account

**Permission Denied**:
- Check repository visibility settings
- Ensure you have write access

**Empty Repository**:
- Make sure files were actually uploaded
- Check file size limits (100MB per file)

## 🎉 Success!

Once uploaded successfully:
- ✅ Your code is safely backed up
- ✅ Ready for team collaboration
- ✅ Can be deployed to Vercel instantly
- ✅ Version control is enabled
- ✅ Issue tracking available

Your repository URL will be:
`https://github.com/YOUR_USERNAME/heaton-web-directory`

## 📞 Need Help?

If you encounter issues:
1. Check GitHub's [documentation](https://docs.github.com)
2. Try the [GitHub Community](https://github.community)
3. Use GitHub's built-in help features
4. Contact your technical team for assistance

---

**Next Steps**: After successful upload, proceed with deployment to Vercel using the instructions in `DEPLOYMENT.md`