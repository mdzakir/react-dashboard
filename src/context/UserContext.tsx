import React, { createContext, useContext, useMemo } from "react";

const randomId = Math.floor(Math.random() * 10) + 1;

const UserIdContext = createContext<number>(randomId);

export const UserIdProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const userId = useMemo(() => randomId, []);
  return (
    <UserIdContext.Provider value={userId}>{children}</UserIdContext.Provider>
  );
};

export const useRandomUserId = () => useContext(UserIdContext);
