import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'AI Diet',
  slug: 'ai-diet',
  scheme: 'ai-diet',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  userInterfaceStyle: 'dark',
  splash: {
    image: './assets/images/icon.png',
    resizeMode: 'contain',
    backgroundColor: '#121212'
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.aidiet.app'
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/icon.png',
      backgroundColor: '#121212'
    },
    package: 'com.aidiet.app'
  },
  web: {
    favicon: './assets/images/favicon.png'
  },
  plugins: [
    'expo-router'
  ],
  extra: {
    router: {
      origin: false
    },
    eas: {
      projectId: 'your-project-id'
    }
  },
  owner: 'your-expo-username'
});