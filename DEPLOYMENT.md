# Hot Wings Deployment Guide

This document outlines the steps to deploy the Hot Wings application to Vercel.

## Prerequisites

- A Vercel account (https://vercel.com)
- A MongoDB Atlas account for the database (https://www.mongodb.com/cloud/atlas)
- Node.js and npm installed locally

## Frontend Deployment (Client)

1. **Install Vercel CLI**:
   ```
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```
   vercel login
   ```

3. **Deploy from the client directory**:
   ```
   cd client
   vercel
   ```

4. **For production deployment**:
   ```
   vercel --prod
   ```

## Backend Deployment (Server)

1. **Setup Environment Variables on Vercel**:
   - Go to your Vercel dashboard
   - Select your project
   - Go to Settings → Environment Variables
   - Add the following variables:
     - `MONGO_URI`: Your MongoDB connection string
     - `JWT_SECRET`: A secure random string for JWT signing
     - `JWT_EXPIRE`: Token expiration (e.g., "30d")

2. **Deploy from the server directory**:
   ```
   cd server
   vercel
   ```

3. **For production deployment**:
   ```
   vercel --prod
   ```

## Connecting Frontend and Backend

1. After deploying both services, update the frontend's API configuration:
   - Get the deployment URL for your backend API
   - Update the `API_URL` in `client/src/api/config.ts` if needed
   - Redeploy the frontend

2. Test the complete application flow

## Continuous Deployment

Vercel automatically deploys changes when you push to your GitHub repository. To set this up:

1. Link your GitHub repository to Vercel
2. Configure build settings for both frontend and backend
3. Set up environment variables in the Vercel dashboard

## Monitoring

- Use Vercel's built-in analytics and logs to monitor application performance
- Set up logging services like Sentry for error tracking
- Configure MongoDB Atlas monitoring for database performance

## Production Checklist

- ✅ Environment variables are set correctly
- ✅ Database connection is secure (IP whitelist if needed)
- ✅ API endpoints are working
- ✅ Authentication flow works end-to-end
- ✅ Static assets are loading correctly
- ✅ Error tracking is in place 