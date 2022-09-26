import { SecurityKeyInterface } from "./SecurityKeys.interface";

export interface SecurityKeysCreation {
  email: string;
  keys: SecurityKeyInterface[];
}
