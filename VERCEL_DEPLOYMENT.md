# 🚀 Vercel Deployment Guide

## Prerequisites

Before deploying to Vercel, ensure you have:

- ✅ GitHub repository with your code
- ✅ Vercel account (free tier available)
- ✅ Environment variables ready
- ✅ Smart contract deployed to testnet

## Step-by-Step Deployment

### 1. Connect to Vercel

1. Visit [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project"
4. Import your GitHub repository: `coinpilot33/vault-art-private`

### 2. Configure Build Settings

**Framework Preset**: Vite
**Root Directory**: `./` (default)
**Build Command**: `npm run build`
**Output Directory**: `dist`
**Install Command**: `npm install`

### 3. Environment Variables

Add the following environment variables in Vercel dashboard:

```env
# Blockchain Configuration
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY

# Wallet Connect
VITE_WALLET_CONNECT_PROJECT_ID=your_walletconnect_project_id

# Contract Address
VITE_VAULT_CONTRACT_ADDRESS=your_deployed_contract_address

# Optional: Infura API Key
VITE_INFURA_API_KEY=your_infura_api_key
```

### 4. Domain Configuration

**Custom Domain** (Optional):
- Add your custom domain in Vercel dashboard
- Update DNS records as instructed
- SSL certificate will be automatically provisioned

**Default Domain**:
- Vercel will provide: `your-project-name.vercel.app`
- This domain is immediately available after deployment

### 5. Deploy

1. Click "Deploy" button
2. Wait for build process to complete
3. Your application will be live at the provided URL

## Post-Deployment Checklist

### ✅ Verify Deployment
- [ ] Application loads without errors
- [ ] Wallet connection works
- [ ] Smart contract interactions function
- [ ] All environment variables are set correctly

### ✅ Test Functionality
- [ ] Connect wallet (MetaMask, WalletConnect)
- [ ] Browse artwork gallery
- [ ] Test bidding functionality
- [ ] Verify investment features

### ✅ Security Check
- [ ] No sensitive data in client-side code
- [ ] Environment variables properly configured
- [ ] HTTPS enabled (automatic with Vercel)

## Troubleshooting

### Common Issues

**Build Failures**:
- Check Node.js version compatibility
- Verify all dependencies are installed
- Review build logs for specific errors

**Environment Variables**:
- Ensure all required variables are set
- Check variable names match exactly
- Redeploy after adding new variables

**Wallet Connection Issues**:
- Verify WalletConnect project ID
- Check RPC URL configuration
- Ensure contract address is correct

### Support Resources

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Project Issues**: [GitHub Issues](https://github.com/coinpilot33/vault-art-private/issues)
- **Community Support**: [Discord](https://discord.gg/vaultartprivate)

## Advanced Configuration

### Custom Build Settings

If you need custom build settings, create `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "framework": "vite"
}
```

### Performance Optimization

- Enable Vercel Analytics for performance monitoring
- Configure caching headers for static assets
- Use Vercel Edge Functions for serverless logic

## Monitoring & Analytics

### Vercel Analytics
- Real-time performance metrics
- User behavior tracking
- Error monitoring and alerting

### Custom Monitoring
- Set up uptime monitoring
- Configure error tracking (Sentry, LogRocket)
- Monitor smart contract interactions

---

**Deployment completed successfully! 🎉**

Your Vault Art Private application is now live and ready for users.