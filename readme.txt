# Install EAS CLI if you haven't already
npm install -g eas-cli

# Login to your Expo account
eas login

# Initialize EAS configuration
eas build:configure

# Create a build for iOS/Android
eas build --platform ios  # For iOS
eas build --platform android  # For Android

# Submit to stores
eas submit --platform ios  # For iOS
eas submit --platform android  # For Android