module.exports = {
  apps: [
    {
      name: 'portfolio',
      script: 'serve',
      env: {
        PM2_SERVE_PATH: './dist/developer-portfolio/browser',
        PM2_SERVE_PORT: 4200,
        PM2_SERVE_SPA: 'true',
        PM2_SERVE_HOMEPAGE: '/index.html'
      }
    }
  ]
};
