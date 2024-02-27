/** @type {import('next').NextConfig} */

const {withContentlayer} = require("next-contentlayer")

const nextConfig = {
    images:{
        domains:["lh3.googleusercontent.com", "firebasestorage.googleapis.com"]
    },
    compiler:{
        removeConsole: true,
    },
    experimental: {
        serverActions: true,
      },

}

module.exports = nextConfig;
