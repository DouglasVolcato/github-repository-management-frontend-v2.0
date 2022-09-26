import { RepositoryInterface } from "./Repository.interface";
import { SecurityKeyInterface } from "./SecurityKeys.interface";

export interface UserInterface {
  value: {
    id: string;
    name: string;
    email: string;
    photo: string;
    repositories: RepositoryInterface[];
    securityKeys: SecurityKeyInterface[];
  };
}
