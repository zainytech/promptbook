/** @type {import('next').NextConfig} */
const nextConfig = {
    // images: {
    //     domains: ['avatars.githubusercontent.com'],
    //   }
    //this is depracated for above next14..use remotepatterns instead of domains
    
    images: {
      remotePatterns: [
        {
          // protocol: 'https',
          hostname: 'avatars.githubusercontent.com',
          // pathname: '**',
        },
      ],
    },
};

export default nextConfig;
