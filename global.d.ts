declare module 'next' {
  interface NextConfig {
    reactStrictMode?: boolean;
    output?: 'standalone' | 'export';
    [key: string]: any;
  }
}
