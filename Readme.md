````markdown
![NearBy App Cover](https://github.com/rafaelhbarreto/nearby/blob/main/app/assets/cover-app.png?raw=true)

# NearBy App

NearBy is a React Native application developed during Rocketseat's NLW event. The app allows users to locate nearby markets categorized by type and redeem discount coupons via QR codes.

---

## Features

- Display nearby markets based on user location.
- Filter markets by categories.
- Redeem discount coupons using QR codes.
- User-friendly interface with seamless navigation.

---

## Prerequisites

To set up and run the NearBy app locally, ensure you have the following installed:

- **Node.js** (version 16 or higher)
- **Expo CLI**
- **Git**
- A package manager: `npm` or `yarn`

---

## Installation Instructions

### Running the API

1. Clone the repository:
   ```bash
   git clone https://github.com/rafaelhbarreto/nearby
   ```
````

2. Navigate to the API folder:

   ```bash
   cd nearby/api
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Seed the database using Prisma:

   ```bash
   npm run prisma
   ```

5. Start the API:
   ```bash
   npm run start
   ```

---

### Running the App

1. Clone the repository (if not done already):

   ```bash
   git clone https://github.com/rafaelhbarreto/nearby
   ```

2. Navigate to the app folder:

   ```bash
   cd nearby/app
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the Expo development server:

   ```bash
   expo start
   ```

5. Open the Expo Go app on your physical device (available on the [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) and [Apple App Store](https://apps.apple.com/app/expo-go/id982107779)) and scan the QR code displayed in your terminal or browser.
