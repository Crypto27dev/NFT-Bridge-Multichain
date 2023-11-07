import { createAction as action } from "typesafe-actions"

/// Global
export const Wallet = action("global/SET_WALLET")();
export const Collection = action("global/SET_COLLECTION")();
export const Chain = action("global/SET_CHAIN")();


