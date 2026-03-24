# Rapidoo Superapp — CLAUDE.md

## Project Overview

**Rapidoo Superapp** is a React Native mobile application (Android & iOS) providing multi-service capabilities: parcel delivery, wallet/payments, activity tracking, and user profile management.

## Tech Stack

- **Framework:** React Native 0.81.1, React 19.1.0, TypeScript 5.8.3
- **State:** Redux Toolkit 2.8.2 + react-redux 9.2.0
- **Navigation:** @react-navigation (native-stack, bottom-tabs)
- **Local DB:** WatermelonDB 0.28.0 (SQLite, schema v16)
- **HTTP:** Axios 1.11.0
- **UI:** React Native Paper 5.14.5, @rneui/themed, Lottie, Reanimated 4
- **Maps:** react-native-maps, react-native-maps-directions, Nominatim (reverse geocoding)
- **Auth:** Google Sign-In, OTP, react-native-keychain
- **Firebase:** app, messaging, crashlytics, analytics, in-app-messaging
- **Notifications:** @notifee/react-native + FCM + WebSocket
- **Build:** Metro bundler, Babel, Azure Pipelines CI/CD
- **Node:** >= 20 required

## Commands

```bash
npm run android          # Run on Android
npm run ios              # Run on iOS
npm run start            # Start Metro bundler
npm run lint             # ESLint
npm test                 # Jest tests
npx react-native run-android --deviceId emulator-5556   # Run on specific emulator
```

## Project Structure

```
/
├── App.tsx                          # Root component (Redux provider + navigation)
├── index.js                         # Entry point
├── src/
│   ├── Config.js                    # Environment variables & API base URLs
│   ├── app/
│   │   ├── redux/
│   │   │   ├── store.ts             # Redux store
│   │   │   ├── reducers/            # Redux slices
│   │   │   │   ├── registrationSlice.ts
│   │   │   │   ├── signInSlice.ts
│   │   │   │   ├── sendOTPSlice.ts
│   │   │   │   ├── otpEntrySlice.ts
│   │   │   │   ├── maplocation.ts
│   │   │   │   ├── appInfoSlice.ts
│   │   │   │   ├── transactionOrder.ts
│   │   │   │   ├── historySlice.ts
│   │   │   │   └── walletSlice.ts
│   │   │   └── hooks/
│   │   ├── watermelonDB/
│   │   │   ├── model/               # Schema, migrations, query functions
│   │   │   ├── db/                  # DB models (Registration, Parcel_Transaction, etc.)
│   │   │   └── index.ts
│   │   ├── assets/                  # Images, SVGs, fonts, Lottie animations
│   │   └── constants/
│   ├── apis/
│   │   ├── client/                  # Axios clients per service
│   │   │   ├── axiosClient.ts
│   │   │   ├── clientIAM.ts
│   │   │   ├── clientAdmin.ts
│   │   │   ├── clientParcel.ts
│   │   │   ├── clientWallet.ts
│   │   │   └── clientActivity.ts
│   │   ├── endpoints/endpoints.ts   # All API endpoint definitions
│   │   ├── services/
│   │   ├── utils/handleApiError.ts
│   │   └── baseRequests.ts
│   ├── components/
│   │   ├── screens/                 # Screen components
│   │   │   ├── Home.tsx
│   │   │   ├── Parcel.tsx
│   │   │   ├── Profile.tsx
│   │   │   ├── Wallet/
│   │   │   ├── Transaction/
│   │   │   ├── SignUp/
│   │   │   ├── Pin/
│   │   │   ├── Parcel/
│   │   │   └── Profile/
│   │   ├── navigations/             # Navigation setup
│   │   │   ├── Navigation.tsx
│   │   │   ├── HomeNavigation.tsx
│   │   │   ├── SignupNavigation.tsx
│   │   │   ├── HistoryNavigation.tsx
│   │   │   ├── WalletNavigation.tsx
│   │   │   └── LinkingNavigation.tsx
│   │   ├── common/
│   │   ├── modal/
│   │   ├── notification/
│   │   ├── map/
│   │   └── WebsocketInit.tsx/
│   ├── services/
│   │   ├── websocket/
│   │   ├── API/
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

## Environment Variables

Create `.env.staging` or `.env.production`:

```
GOOGLE_API_KEY=
GOOGLE_AUTOCOMPLETE_URL=
GOOGLE_DETAILS_URL=
SIGN_APP_KEY=
SIGN_APP_SECRET=
COUPON_SECRET=
VARIANT=STAGING  # or PRODUCTION
LOCAL_BASE_URL=
autorization=
z_app=customer
z_app_type=mobile
z_app_version=
z_app_code=
```

## Local Database (WatermelonDB)

Schema version: **16**. Tables: `registration`, `parcel_transaction`, `services`, `app_info`, `app_updates`, `report_issues`, `booking`, `booking_details`, `update_config`.

Migrations are defined in `src/app/watermelonDB/model/migrations.ts`. Always increment schema version when adding tables or columns.

## Redux State Slices

| Slice | Purpose |
|-------|---------|
| `registrationCounter` | Registration form state |
| `maplocation` | Map & location state |
| `appInfo` | App metadata |
| `sendOTP` | OTP sending |
| `otpEntry` | OTP entry |
| `signIn` | Sign-in state |
| `transactionOrder` | Active transaction |
| `history` | Transaction history |
| `wallet` | Wallet state |

## Code Style

- **Formatter:** Prettier — 2-space indentation, single quotes, trailing commas
- **Linter:** ESLint extending `@react-native`
- **Language:** TypeScript (strict mode via `@react-native/typescript-config`)
- Run `npm run lint` before committing

## Key Patterns

- Screens live in `src/components/screens/`
- API calls go through the client modules in `src/apis/client/`
- All endpoints are centralized in `src/apis/endpoints/endpoints.ts`
- Secure storage (tokens, credentials) via `react-native-keychain` in `src/utils/KeyChain/`
- Error tracking via Firebase Crashlytics in `src/utils/Crashlytics/`
- Date formatting via `date-fns` utilities in `src/utils/DateFormats/`
