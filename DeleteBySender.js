function deleteFromSpamFolder() {
  const spreadsheetId = "SSID";
  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  const sheet = spreadsheet.getSheetByName("blockedSenders");

  if (!sheet) {
    throw new Error('シート "blockedSenders" が見つかりません。');
  }

  const lastRow = sheet.getLastRow();

  const blockedSenders = sheet
    .getRange(2, 1, Math.max(lastRow - 1, 0), 1)
    .getValues()
    .flat()
    .filter(String);

  Logger.log(blockedSenders);
  
  const threads = GmailApp.search('in:spam newer_than:7d');

  const now = new Date();
  const oneDayMs = 24 * 60 * 60 * 1000;

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
