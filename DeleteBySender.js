function deleteSpamSenderMail() {
  const blockedSenders = [
    "spam@example.com",
    "noreply@annoyingmail.com"
  ];

  const threads = GmailApp.search('is:inbox newer_than:1d');

  for (const thread of threads) {
    const messages = thread.getMessages();

    for (const msg of messages) {
      const from = msg.getFrom();

      for (const sender of blockedSenders) {
        if (from.includes(sender)) {
          thread.moveToTrash();
          break;
        }
      }
    }
  }
}
