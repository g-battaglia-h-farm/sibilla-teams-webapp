// document.addEventListener("DOMContentLoaded", () => {
//   let chatCounter = 0;
//   const newChatBtn = document.getElementById("newChatBtn");
//   const chatList = document.getElementById("chatList");
//   const chatWindow = document.querySelector(".chat-window iframe");

//   newChatBtn.addEventListener("click", () => {
//       chatCounter++;
//       const newChatItem = document.createElement("div");
//       newChatItem.className = "chat-item";
//       newChatItem.innerText = `Chat ${chatCounter}`;
//       newChatItem.dataset.chatId = chatCounter;

//       newChatItem.addEventListener("click", () => {
//           openChat(newChatItem.dataset.chatId);
//       });

//       chatList.appendChild(newChatItem);
//   });

//   function openChat(chatId) {
//       // Here you would set the iframe's src attribute to load the specific chat.
//       // For example, you could pass the chatId to your bot URL like this:
//       chatWindow.src = `https://europe.webchat.botframework.com/embed/sibilla-bot?s=-y4zYgzySyQ.mI95uwEU3mELuz4-DA7tSt7cE2Z0Y0TNZAn3X3IdCgU`;
//   }
// });

document.addEventListener("DOMContentLoaded", () => {
  let chatCounter = 0;
  const newChatBtn = document.getElementById("newChatBtn");
  const chatWindow = document.querySelector(".chat-window iframe");

  newChatBtn.addEventListener("click", () => {
      chatCounter++;
      const newChatItem = document.createElement("div");
      newChatItem.className = "chat-item";
      newChatItem.innerText = `Chat ${chatCounter}`;
      newChatItem.dataset.chatId = chatCounter;

      newChatItem.addEventListener("click", () => {
          openChat(newChatItem.dataset.chatId);
      });

  });

  function openChat(id) {
      // Here you would set the iframe's src attribute to load the specific chat.
      // For example, you could pass the chatId to your bot URL like this:
      chatWindow.src = `$https://europe.webchat.botframework.com/embed/sibilla-bot?s=-y4zYgzySyQ.mI95uwEU3mELuz4-DA7tSt7cE2Z0Y0TNZAn3X3IdCgU`;
  }
});