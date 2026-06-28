"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function NotificationRouteHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const user = searchParams.get("user");

    if (!user) return;

    router.replace(`/chat?user=${encodeURIComponent(user)}`);
  }, [searchParams, router]);

  return null;
}
