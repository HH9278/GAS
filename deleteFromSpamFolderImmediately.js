function deleteFromSpamFolderImmediately() {
  // ここに即削除したい送信元メールアドレスを指定
  const targetEmails = [
    "test@test.com",
    "test@test.co.jp"
  ];

  // スパムフォルダ内の直近7日分を検索
  const threads = GmailApp.search("in:spam newer_than:7d");

  for (const thread of threads) {
    const messages = thread.getMessages();

    // スレッド内に対象メアドからのメールが1件でもあれば削除
    const shouldDelete = messages.some(msg => {
      const from = msg.getFrom(); 
      return targetEmails.some(email => from.includes(email));
    });

    if (shouldDelete) {
      thread.moveToTrash();
      Logger.log(`Moved to trash: ${thread.getFirstMessageSubject()}`);
    }
  }
}
