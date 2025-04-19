# Prop.ie Platform Deployment Guide for Vercel

This guide provides step-by-step instructions for deploying the Prop.ie platform to Vercel.

## Prerequisites

- A Vercel account (free tier is sufficient)
- Git repository with your Prop.ie platform code (or you can upload directly)

## Deployment Steps

### Option 1: Deploy from Git Repository

1. **Create a Git Repository**
   - Push your Prop.ie platform code to GitHub, GitLab, or Bitbucket
   - Make sure your repository includes the `vercel.json` configuration file

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "Add New" → "Project"
   - Select your Git provider and authorize Vercel to access your repositories
   - Select the Prop.ie platform repository

3. **Configure Project**
   - Vercel will automatically detect the Next.js project
   - The settings should be pre-configured by the `vercel.json` file:
     - Framework Preset: Next.js
     - Build Command: `cd frontend && npm install && npm run build`
     - Output Directory: `frontend/.next`
   - Click "Deploy"

### Option 2: Deploy via Direct Upload

1. **Prepare Your Project**
   - Ensure your project includes the `vercel.json` configuration file
   - Zip the entire `prop-ie-platform` directory

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "Add New" → "Project"
   - At the bottom of the import page, click "Upload"
   - Select your zipped project file
   - Vercel will automatically detect the configuration
   - Click "Deploy"

## After Deployment

- Vercel will provide you with a unique URL (e.g., `prop-ie-platform.vercel.app`)
- You can configure a custom domain in the Vercel project settings
- The platform will be automatically updated when you push changes to your repository (if using Git deployment)

## Troubleshooting

If you encounter any issues during deployment:

1. Check the build logs in Vercel for specific error messages
2. Ensure all dependencies are correctly listed in `package.json`
3. Verify that the `vercel.json` configuration is correct
4. Make sure the project structure matches what's expected in the build command

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
