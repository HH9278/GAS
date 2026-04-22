function deleteFromSpamFolder() {
  const blockedSenders = [
    "test1@test1.ne.jp",
    "test2@test2.co.jp"
  ];

  const threads = GmailApp.search('in:spam newer_than:7d');

  const now = new Date();
  const oneDayMs = 24 * 60 * 60 * 1000; // 1日（ミリ秒）

  for (const thread of threads) {
    const messages = thread.getMessages();

    for (const msg of messages) {
      const from = msg.getFrom();
      const receivedDate = msg.getDate();

      const isOlderThanOneDay = (now - receivedDate) >= oneDayMs;

      for (const sender of blockedSenders) {
        if (from.includes(sender) && isOlderThanOneDay) {
          thread.moveToTrash();
          break;
        }
      }
    }
  }
}
