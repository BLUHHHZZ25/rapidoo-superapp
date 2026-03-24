import History from "../screens/Transaction/History";
import HistoryNavigation from "./HistoryNavigation";

const config = {
  screens: {
    HomeNavigation: {
      screens: {
        Home: {
          path: "home",
        }
      }
    },
    HistoryNavigation: {
      screens: {
        History: {
          path: "history",
        }
      }
    },
    Profile: {
      path: "profile",
    },
    Login: {
      path: "login",
    },
    Transaction: {
      path: "transaction",
    },
  },
};

const linkingURL = {
  prefixes: ["rapidoo://superapp"],
  config,
};

export default linkingURL;
