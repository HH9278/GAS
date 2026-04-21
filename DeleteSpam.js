function deleteOldSpam() {
  const threads = GmailApp.getSpamThreads(0, 100);
  const now = new Date();
  
  threads.forEach(thread => {
    const lastMsgDate = thread.getLastMessageDate();
    const diffDays = (now - lastMsgDate) / (1000 * 60 * 60 * 24);
    
    if (diffDays >= 3) {
      thread.moveToTrash();
    }
  });
}
