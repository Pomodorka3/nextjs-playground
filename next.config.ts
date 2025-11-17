import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    /* config options here */
    reactCompiler: true,
    rewrites: async () => [
        {
            source: '/api/v1/:path*',
            destination: 'http://localhost:5000/api/v1/:path*',
        },
    ],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname: '/**',
            }
        ]
    }

}
;

export default nextConfig;
