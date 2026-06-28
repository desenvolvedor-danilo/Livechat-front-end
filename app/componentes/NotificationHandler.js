"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function NotificationRouteHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const user = searchParams.get("user");

    if (!user) return;

    router.push(`/chat?user=${user}&redirect=true`);
  }, [searchParams, router]);

  return null;
}
