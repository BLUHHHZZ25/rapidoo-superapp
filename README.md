# Rapidoo Superapp

A React Native mobile application (Android & iOS) providing multi-service capabilities: parcel delivery, wallet/payments, activity tracking, and user profile management.

## Requirements

- Node >= 20
- React Native development environment set up ([guide](https://reactnative.dev/docs/set-up-your-environment))
- Android Studio (for Android) / Xcode (for iOS)

## Getting Started

```bash
# 1. Clone the repository
git clone <repository-url>
cd rapidoo-superapp

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.staging .env  # or .env.production

# 4. Run the app
npm run android   # Android
npm run ios       # iOS
```

## Environment Variables

Create `.env.staging` or `.env.production` at the project root:

```env
GOOGLE_API_KEY=
GOOGLE_AUTOCOMPLETE_URL=
GOOGLE_DETAILS_URL=
SIGN_APP_KEY=
SIGN_APP_SECRET=
COUPON_SECRET=
VARIANT=STAGING        # or PRODUCTION
LOCAL_BASE_URL=
autorization=
z_app=customer
z_app_type=mobile
z_app_version=
z_app_code=
```

## Scripts

```bash
npm run android          # Run on Android
npm run ios              # Run on iOS
npm run start            # Start Metro bundler
npm run lint             # ESLint
npm test                 # Jest tests

# Run on a specific emulator
npx react-native run-android --deviceId emulator-5556
```

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React Native 0.81.1, React 19.1.0, TypeScript 5.8.3 |
| State | Redux Toolkit 2.8.2 + react-redux 9.2.0 |
| Navigation | @react-navigation (native-stack, bottom-tabs) |
| Local DB | WatermelonDB 0.28.0 (SQLite, schema v16) |
| HTTP | Axios 1.11.0 |
| UI | React Native Paper 5.14.5, @rneui/themed, Lottie, Reanimated 4 |
| Maps | react-native-maps, Nominatim (reverse geocoding) |
| Auth | Google Sign-In, OTP, react-native-keychain |
| Firebase | app, messaging, crashlytics, analytics, in-app-messaging |
| Notifications | @notifee/react-native + FCM + WebSocket |
| Build | Metro bundler, Babel, Azure Pipelines CI/CD |

## Project Structure

```
/
├── App.tsx                          # Root component (Redux provider + navigation)
├── index.js                         # Entry point
├── src/
│   ├── Config.js                    # Environment variables & API base URLs
│   ├── app/
│   │   ├── redux/
│   │   │   ├── store.ts
│   │   │   └── reducers/            # Redux slices
│   │   ├── watermelonDB/
│   │   │   ├── model/               # Schema, migrations, query functions
│   │   │   └── db/                  # DB models
│   │   ├── assets/                  # Images, SVGs, fonts, Lottie animations
│   │   └── constants/
│   ├── apis/
│   │   ├── client/                  # Axios clients per service
│   │   ├── endpoints/endpoints.ts   # All API endpoint definitions
│   │   └── baseRequests.ts
│   ├── components/
│   │   ├── screens/                 # Screen components
│   │   ├── navigations/             # Navigation setup
│   │   ├── common/
│   │   ├── modal/
│   │   └── map/
│   ├── services/
│   │   ├── websocket/
│   │   └── notification.tsx
│   ├── utils/                       # Utility functions
│   └── types/                       # TypeScript type definitions
```

## API Microservices

Each service has its own Axios client and base URL configured via `.env`:

| Client | Service |
|--------|---------|
| `clientIAM` | Authentication, user identity, OTP |
| `clientAdmin` | Services list, app updates, payment options, coupons |
| `clientParcel` | Parcel delivery, vehicle, transactions, riders |
| `clientWallet` | Wallet account, cash-in, transactions, payments |
| `clientActivity` | User activity history |

**WebSocket:** `wss://[staging|iam].rapidooph.com/iam/app-service/ws`

## Local Database

WatermelonDB (SQLite), schema version **16**.

Tables: `registration`, `parcel_transaction`, `services`, `app_info`, `app_updates`, `report_issues`, `booking`, `booking_details`, `update_config`

Migrations: `src/app/watermelonDB/model/migrations.ts` — always increment schema version when adding tables or columns.

## Code Style

- **Prettier** — 2-space indentation, single quotes, trailing commas
- **ESLint** — extends `@react-native`
- **TypeScript** — strict mode via `@react-native/typescript-config`

Run `npm run lint` before committing.
