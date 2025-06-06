"use client";

import { useUser } from "@clerk/nextjs";

export default function IfLoggedInElse({ ifUser, ifNot }) {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>; // Or a proper loading state
  }

  return isSignedIn ? ifUser : ifNot;
}
