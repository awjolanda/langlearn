import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ionic.langlearn',
  appName: 'langlearn',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
