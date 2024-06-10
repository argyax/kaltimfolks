/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["lh3.googleusercontent.com", "firebasestorage.googleapis.com", "i.imgur.com"]
    },
    compiler: {
        removeConsole: true,
    },
    experimental: {
        serverActions: true,
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            // Exclude handlebars from client-side bundling
            config.resolve.alias['handlebars'] = false;
        }
        return config;
    },
};

module.exports = nextConfig;
