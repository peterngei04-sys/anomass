import { Suspense } from "react";
import MessageDetailClient from "./MessageDetailClient";

export default function MessageDetailPage() {
  return (
    <Suspense
      fallback={
        <main className="inbox-page">
          <div className="inbox-shell">
            <div className="inbox-loading">
              <div className="inbox-loader" />
              <p>Opening your message...</p>
            </div>
          </div>
        </main>
      }
    >
      <MessageDetailClient />
    </Suspense>
  );
}
