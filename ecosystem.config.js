module.exports = {
  apps : [{
    name: 'node',
    script: './bin/www',
    env: {
      "NODE_ENV": "dev"
    },
    watch: true
  }],
};