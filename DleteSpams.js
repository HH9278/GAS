function deleteFromSpamFolder() {
  const threads = GmailApp.search("in:spam newer_than:7d");
  const now = new Date();
  const oneDayMs = 24 * 60 * 60 * 1000;

  for (const thread of threads) {
    const messages = thread.getMessages();

    // スレッド内の全メッセージが1日以上経過していたら削除
    const allOlderThanOneDay = messages.every(msg => {
      const receivedDate = msg.getDate();
      return (now.getTime() - receivedDate.getTime()) >= oneDayMs;
    });

    if (allOlderThanOneDay) {
      thread.moveToTrash();
      Logger.log(`Moved to trash: ${thread.getFirstMessageSubject()}`);
    }
  }
}
