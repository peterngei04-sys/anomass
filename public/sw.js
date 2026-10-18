self.addEventListener("push", (event) => {
  let payload = {};
  try {
    payload = event.data ? event.data.json() : {};
  } catch {
    payload = { body: "Someone left you a message on Anomass." };
  }

  const title = "New anonymous message 💌";
  const options = {
    body: "Someone left you a message on Anomass.",
    icon: "/icon.svg",
    badge: "/icon.svg",
    tag: "anomass-new-message",
    renotify: true,
    data: { url: "/inbox" },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const target = new URL("/inbox", self.location.origin).href;

  event.waitUntil((async () => {
    const windows = await self.clients.matchAll({
      type: "window",
      includeUncontrolled: true,
    });

    for (const client of windows) {
      if ("focus" in client) {
        await client.focus();
        if ("navigate" in client) await client.navigate(target);
        return;
      }
    }

    await self.clients.openWindow(target);
  })());
});
