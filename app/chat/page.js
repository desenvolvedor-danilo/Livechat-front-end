import { Suspense } from "react";
import ChatContent from "../componentes/ui/chatContent";

export default function Chat() {
  return (
    <Suspense>
      <ChatContent />
    </Suspense>
  )
}
