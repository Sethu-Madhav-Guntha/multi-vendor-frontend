import { setupListeners } from "@reduxjs/toolkit/query";

import { multiVendorStore } from "./store";

setupListeners(multiVendorStore.dispatch);