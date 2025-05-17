import { createContext } from "react";

type User = {
    firstName: string;
    lastName: string;
    idNumber: string;
    accountNumber: string;
}

interface UserContextType {
  user?: User;
  setUser: (user: any) => void;
}

export const UserContext = createContext<UserContextType>({
  user: undefined,
  setUser: (user: User) => {}
});

