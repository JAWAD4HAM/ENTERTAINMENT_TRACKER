# 🚀 Deployment Guide for Entertainment Tracker

This guide covers multiple deployment options for the Entertainment Tracker application, from simple local hosting to cloud platforms and Docker containers.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start (Local Development)](#quick-start-local-development)
- [Docker Deployment](#docker-deployment)
- [Cloud Platform Deployment](#cloud-platform-deployment)
  - [Render](#render)
  - [Railway](#railway)
  - [Heroku](#heroku)
  - [DigitalOcean App Platform](#digitalocean-app-platform)
- [VPS Deployment (Self-Hosted)](#vps-deployment-self-hosted)
- [Environment Variables](#environment-variables)
- [Post-Deployment Configuration](#post-deployment-configuration)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before deploying, ensure you have:

1. **API Keys** (Required):
   - **TMDB API Key**: Sign up at [themoviedb.org](https://www.themoviedb.org/settings/api)
   - **RAWG API Key**: Sign up at [rawg.io/apidocs](https://rawg.io/apidocs)

2. **JWT Secret**: A strong, random string for securing authentication tokens
   - Generate one using: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

3. **Node.js**: Version 16 or higher (for local/VPS deployment)
4. **Docker**: Optional, for containerized deployment

---

## Quick Start (Local Development)

For running the application on your local machine:

```bash
# 1. Clone the repository
git clone https://github.com/JAWAD4HAM/ENTERTAINMENT_TRACKER.git
cd ENTERTAINMENT_TRACKER

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# Edit .env with your API keys and JWT secret

# 4. Start the server
npm start

# For development with auto-reload:
npm run dev
```

The application will be available at `http://localhost:3000`

---

## Docker Deployment

Docker provides a consistent, isolated environment for running the application.

### Using Docker Compose (Recommended)

```bash
# 1. Clone the repository
git clone https://github.com/JAWAD4HAM/ENTERTAINMENT_TRACKER.git
cd ENTERTAINMENT_TRACKER

# 2. Configure environment variables
cp .env.example .env
# Edit .env with your API keys and JWT secret

# 3. Build and start the container
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the container
docker-compose down
```

### Using Docker directly

```bash
# 1. Build the image
docker build -t entertainment-tracker .

# 2. Run the container
docker run -d \
  --name entertainment-tracker \
  -p 3000:3000 \
  -e JWT_SECRET="your_jwt_secret" \
  -e TMDB_API_KEY="your_tmdb_key" \
  -e RAWG_API_KEY="your_rawg_key" \
  -v $(pwd)/storage:/app/storage \
  entertainment-tracker

# View logs
docker logs -f entertainment-tracker

# Stop the container
docker stop entertainment-tracker
```

---

## Cloud Platform Deployment

### Render

Render offers free tier hosting with automatic deployments from GitHub.

#### Steps:

1. **Fork or push this repository to your GitHub account**

2. **Go to [render.com](https://render.com) and sign up/login**

3. **Create a new Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure the service:
     ```
     Name: entertainment-tracker
     Environment: Node
     Build Command: npm install
     Start Command: npm start
     ```

4. **Add Environment Variables**:
   - Go to "Environment" tab
   - Add:
     ```
     JWT_SECRET=<your_jwt_secret>
     TMDB_API_KEY=<your_tmdb_key>
     RAWG_API_KEY=<your_rawg_key>
     ```

5. **Deploy**: Click "Create Web Service"

6. **Access**: Your app will be available at `https://your-app-name.onrender.com`

**Note**: On Render's free tier, the app will sleep after inactivity. Consider upgrading to a paid plan for always-on hosting.

---

### Railway

Railway provides simple deployment with GitHub integration.

#### Steps:

1. **Go to [railway.app](https://railway.app) and sign up/login**

2. **Create New Project**:
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository

3. **Configure Environment Variables**:
   - Go to your service → "Variables" tab
   - Add:
     ```
     JWT_SECRET=<your_jwt_secret>
     TMDB_API_KEY=<your_tmdb_key>
     RAWG_API_KEY=<your_rawg_key>
     PORT=3000
     ```

4. **Deploy**: Railway will automatically detect it's a Node.js app and deploy

5. **Generate Domain**: Go to "Settings" → "Generate Domain"

6. **Access**: Your app will be available at the generated domain

---

### Heroku

Heroku is a popular PaaS with a free tier option.

#### Steps:

1. **Install Heroku CLI**: [Download here](https://devcenter.heroku.com/articles/heroku-cli)

2. **Login to Heroku**:
   ```bash
   heroku login
   ```

3. **Create a new Heroku app**:
   ```bash
   cd ENTERTAINMENT_TRACKER
   heroku create your-app-name
   ```

4. **Add environment variables**:
   ```bash
   heroku config:set JWT_SECRET="your_jwt_secret"
   heroku config:set TMDB_API_KEY="your_tmdb_key"
   heroku config:set RAWG_API_KEY="your_rawg_key"
   ```

5. **Deploy**:
   ```bash
   git push heroku main
   # Or if you're on a different branch:
   git push heroku your-branch:main
   ```

6. **Open the app**:
   ```bash
   heroku open
   ```

---

### DigitalOcean App Platform

DigitalOcean's App Platform provides simple deployment with automatic scaling.

#### Steps:

1. **Go to [DigitalOcean App Platform](https://cloud.digitalocean.com/apps)**

2. **Create App**:
   - Click "Create App"
   - Choose "GitHub" as source
   - Select your repository
   - Choose branch to deploy

3. **Configure App**:
   - App Type: Web Service
   - Build Command: `npm install`
   - Run Command: `npm start`

4. **Add Environment Variables**:
   - Click "Edit" next to your service
   - Go to "Environment Variables"
   - Add:
     ```
     JWT_SECRET=<your_jwt_secret>
     TMDB_API_KEY=<your_tmdb_key>
     RAWG_API_KEY=<your_rawg_key>
     ```

5. **Deploy**: Click "Create Resources"

---

## VPS Deployment (Self-Hosted)

For full control, deploy on your own Virtual Private Server (VPS) using providers like DigitalOcean, Linode, AWS EC2, or Hetzner.

### Prerequisites:
- Ubuntu 20.04 or later (or any Linux distribution)
- SSH access to your server
- Domain name (optional but recommended)

### Steps:

#### 1. Connect to your VPS
```bash
ssh root@your_server_ip
```

#### 2. Install Node.js and npm
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js (using NodeSource repository)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version
npm --version
```

#### 3. Install Git
```bash
sudo apt install -y git
```

#### 4. Clone and setup the application
```bash
# Navigate to web directory
cd /var/www

# Clone repository
git clone https://github.com/JAWAD4HAM/ENTERTAINMENT_TRACKER.git
cd ENTERTAINMENT_TRACKER

# Install dependencies
npm install --production

# Create environment file
cp .env.example .env
nano .env  # Edit with your API keys and JWT secret
```

#### 5. Install PM2 (Process Manager)
```bash
# Install PM2 globally
sudo npm install -g pm2

# Start the application with PM2
pm2 start server.js --name entertainment-tracker

# Enable PM2 to start on system boot
pm2 startup systemd
pm2 save
```

#### 6. Configure Nginx as reverse proxy (Recommended)
```bash
# Install Nginx
sudo apt install -y nginx

# Create Nginx configuration
sudo nano /etc/nginx/sites-available/entertainment-tracker
```

Add the following configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com;  # Replace with your domain or server IP

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/entertainment-tracker /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

#### 7. Optional: Setup SSL with Let's Encrypt
```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal is configured automatically
```

#### 8. Configure Firewall
```bash
# Allow SSH, HTTP, and HTTPS
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

#### 9. Managing the application
```bash
# View logs
pm2 logs entertainment-tracker

# Restart application
pm2 restart entertainment-tracker

# Stop application
pm2 stop entertainment-tracker

# Update application
cd /var/www/ENTERTAINMENT_TRACKER
git pull
npm install --production
pm2 restart entertainment-tracker
```

---

## Environment Variables

All deployment methods require the following environment variables:

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `PORT` | No | Server port (default: 3000) | `3000` |
| `JWT_SECRET` | **Yes** | Secret key for JWT token generation | `your_random_secret_key` |
| `TMDB_API_KEY` | **Yes** | TMDB API key for movies/TV data | `eyJhbGc...` |
| `RAWG_API_KEY` | **Yes** | RAWG API key for games data | `e1f17f...` |

### Generating a secure JWT_SECRET

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Using OpenSSL
openssl rand -hex 32

# Using Python
python3 -c "import secrets; print(secrets.token_hex(32))"
```

---

## Post-Deployment Configuration

### 1. Create Your First User Account

Navigate to your deployed application and go to the signup page:
- `https://your-domain.com/pages/auth/signup.html`

### 2. Verify API Integration

Test that APIs are working:
- Search for a movie (TMDB integration)
- Search for a game (RAWG integration)
- Search for anime (Jikan - no key required)

### 3. Data Persistence

Your user data and media lists are stored in JSON files in the `storage/` directory:
- `storage/user.json` - User accounts
- `storage/media.json` - Media lists

**Important**: 
- For Docker deployments, ensure the storage volume is properly mounted
- For VPS deployments, consider regular backups of the storage directory
- Consider implementing a proper database for production use (see Future Improvements in README)

---

## Troubleshooting

### Application won't start

**Check logs:**
- Local: Check terminal output
- Docker: `docker logs entertainment-tracker`
- PM2: `pm2 logs entertainment-tracker`
- Cloud platforms: Check platform's log viewer

**Common issues:**
1. **Port already in use**: Change the `PORT` environment variable
2. **Missing environment variables**: Verify all required variables are set
3. **Storage directory permissions**: Ensure the app can write to `storage/`

### API requests failing

1. **Verify API keys are correct**
2. **Check API rate limits**: TMDB and RAWG have rate limits
3. **Network issues**: Ensure the server can reach external APIs
4. **Proxy configuration**: If using a proxy, verify it's configured correctly

### Authentication issues

1. **JWT_SECRET not set**: Ensure it's configured in environment variables
2. **Token expiration**: Tokens expire, user may need to log in again
3. **Browser cache**: Clear cookies and local storage

### Data not persisting

1. **Docker volumes**: Verify volume mounts in docker-compose.yml
2. **File permissions**: Check that the app has write access to `storage/`
3. **Read-only filesystem**: Some platforms may have read-only filesystems

### Performance issues

1. **Free tier limitations**: Consider upgrading to paid tier on cloud platforms
2. **Concurrent users**: This app uses JSON file storage, not optimized for high concurrency
3. **API rate limits**: Too many API calls may slow down the application

---

## Security Best Practices

1. **Never commit `.env` files to version control**
2. **Use strong, unique JWT_SECRET in production**
3. **Keep dependencies updated**: Run `npm audit` and `npm update` regularly
4. **Use HTTPS in production**: Set up SSL/TLS certificates
5. **Implement rate limiting**: Consider adding rate limiting middleware for public deployments
6. **Regular backups**: Back up your `storage/` directory regularly
7. **Use environment-specific configurations**: Different configs for dev/staging/production

---

## Additional Resources

- [Node.js Deployment Best Practices](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
- [Express Production Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/usage/quick-start/)
- [Docker Documentation](https://docs.docker.com/)
- [Nginx Configuration Guide](https://nginx.org/en/docs/)

---

## Need Help?

If you encounter issues not covered in this guide:

1. Check the [GitHub Issues](https://github.com/JAWAD4HAM/ENTERTAINMENT_TRACKER/issues)
2. Open a new issue with:
   - Deployment method used
   - Error messages
   - Steps to reproduce
   - Environment details (OS, Node version, etc.)

---

*Last Updated: January 2026*
