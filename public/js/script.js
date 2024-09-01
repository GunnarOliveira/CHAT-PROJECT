// login elements
const login = document.querySelector(".login");
const loginForm = login.querySelector(".login__form");
const loginInput = login.querySelector(".login__input");

// chat elements
const chat = document.querySelector(".chat");
const chatForm = chat.querySelector(".chat__form");
const chatInput = chat.querySelector(".chat__input");
const chatMessages = chat.querySelector(".chat__messages");
const emojiButton = chat.querySelector(".chat__emoji-button");
const emojiPicker = chat.querySelector(".chat__emoji-picker");

// Colors and user data
const colors = [
  "cadetblue",
  "darkgoldenrod",
  "cornflowerblue",
  "darkkhaki",
  "hotpink",
  "gold",
];

const user = { id: "", name: "", color: "" };
let websocket;

// Regex to detect URLs
const urlRegex = /\b(?:https?:\/\/|www\.)\S+\b/g;

// Function to process URLs in messages
const processMessageContent = (content) => {
  return content.replace(
    urlRegex,
    (url) => `<a href="${url}" target="_blank">${url}</a>`
  );
};

// Function to send a message
const sendMessage = () => {
  const content = processMessageContent(chatInput.value);

  const message = {
    userId: user.id,
    userName: user.name,
    userColor: user.color,
    content: content,
  };

  websocket.send(JSON.stringify(message));
  chatInput.value = "";
};

// Create message element for self
const createMessageSelfElement = (content) => {
  const div = document.createElement("div");
  div.classList.add("message--self");
  div.innerHTML = content;
  return div;
};

// Create message element for others
const createMessageOtherElement = (content, sender, senderColor) => {
  const div = document.createElement("div");
  const span = document.createElement("span");

  div.classList.add("message--other");

  span.classList.add("message--sender");
  span.style.color = senderColor;

  div.appendChild(span);
  span.innerHTML = sender;
  div.innerHTML += content;

  return div;
};

// Function to scroll to the bottom of the chat
const scrollScreen = () => {
  // Ajusta o scroll do body para o final
  document.body.scrollTop = document.body.scrollHeight; // Para navegadores antigos
  document.documentElement.scrollTop = document.documentElement.scrollHeight; // Para navegadores modernos
};

// Function to process incoming messages
const processMessage = ({ data }) => {
  const { userId, userName, userColor, content } = JSON.parse(data);

  const message =
    userId === user.id
      ? createMessageSelfElement(content)
      : createMessageOtherElement(content, userName, userColor);

  chatMessages.appendChild(message);
  scrollScreen();
};

// Generate a UUID
const generateUUID = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
};

// Handle user login
const handleLogin = (event) => {
  event.preventDefault();

  user.id = generateUUID();
  user.name = loginInput.value;
  user.color = getRandomColor();

  login.style.display = "none";
  chat.style.display = "flex";

  websocket = new WebSocket("ws://192.168.100.6:3000");
  websocket.onmessage = processMessage;
};

loginForm.addEventListener("submit", handleLogin);

// Emoji picker functionality
document.addEventListener("DOMContentLoaded", () => {
  if (!emojiButton || !emojiPicker) {
    console.error("Erro ao encontrar elementos para emojis.");
    return;
  }

  const emojis = [
    // Adicione aqui todos os emojis que deseja usar
    "😀",
    "😃",
    "😄",
    "😁",
    "😆",
    "😅",
    "😂",
    "🤣",
    "😊",
    "😇",
    "🙂",
    "🙃",
    "😉",
    "😌",
    "😍",
    "🥰",
    "😘",
    "😗",
    "😙",
    "😚",
    "😋",
    "😛",
    "😝",
    "😜",
    "🤪",
    "🤨",
    "🧐",
    "🤓",
    "😎",
    "🤩",
    "🥳",
    "😏",
    "😒",
    "😞",
    "😔",
    "😟",
    "😕",
    "🙁",
    "😣",
    "😖",
    "😫",
    "😩",
    "🥺",
    "😢",
    "😭",
    "😤",
    "😠",
    "😡",
    "🤬",
    "🤯",
    "😳",
    "🥵",
    "🥶",
    "😱",
    "😨",
    "😰",
    "😥",
    "😓",
    "🤗",
    "🙄",
    "😯",
    "😦",
    "😧",
    "😮",
    "😲",
    "🥱",
    "😴",
    "🤤",
    "😪",
    "😵",
    "🤐",
    "🥴",
    "🤢",
    "🤮",
    "🤧",
    "😷",
    "🤒",
    "🤕",
    "🤑",
    "🤠",
    "😈",
    "👿",
    "👹",
    "👺",
    "🤡",
    "💩",
    "👻",
    "💀",
    "☠️",
    "👽",
    "👾",
    "🤖",
    "🎃",
    "😺",
    "😸",
    "😹",
    "😻",
    "😼",
    "😽",
    "🙀",
    "😿",
    "😾",
    "🐱",
    "🐶",
    "🐭",
    "🐹",
    "🐰",
    "🦊",
    "🐻",
    "🐼",
    "🐨",
    "🐯",
    "🦁",
    "🐮",
    "🐷",
    "🐽",
    "🐸",
    "🐵",
    "🙈",
    "🙉",
    "🙊",
    "🐒",
    "🐔",
    "🐧",
    "🐦",
    "🐤",
    "🐣",
    "🐥",
    "🦆",
    "🦅",
    "🦉",
    "🦇",
    "🐺",
    "🐗",
    "🐴",
    "🦄",
    "🐝",
    "🐛",
    "🦋",
    "🐌",
    "🐞",
    "🐜",
    "🦟",
    "🦗",
    "🕷",
    "🕸",
    "🦂",
    "🐢",
    "🐍",
    "🦎",
    "🦖",
    "🦕",
    "🐙",
    "🦑",
    "🦐",
    "🦞",
    "🦀",
    "🐡",
    "🐠",
    "🐟",
    "🐬",
    "🐳",
    "🐋",
    "🦈",
    "🐊",
    "🐅",
    "🐆",
    "🦓",
    "🦍",
    "🦧",
    "🐘",
    "🦛",
    "🦏",
    "🐪",
    "🐫",
    "🦒",
    "🦘",
    "🐃",
    "🐂",
    "🐄",
    "🐎",
    "🐖",
    "🐏",
    "🐑",
    "🦙",
    "🐐",
    "🦌",
    "🐕",
    "🐩",
    "🦮",
    "🐕‍🦺",
    "🐈",
    "🐓",
    "🦃",
    "🦚",
    "🦜",
    "🦢",
    "🦩",
    "🕊",
    "🐇",
    "🦝",
    "🦨",
    "🦡",
    "🦦",
    "🦥",
    "🐁",
    "🐀",
    "🐿",
    "🦔",
    "🐾",
    "🐉",
    "🐲",
    // ... (restante dos emojis)
  ];

  emojis.forEach((emoji) => {
    const emojiButton = document.createElement("button");
    emojiButton.classList.add("emoji");
    emojiButton.textContent = emoji;
    emojiButton.type = "button";
    emojiButton.addEventListener("click", () => {
      chatInput.value += emoji;
    });
    emojiPicker.appendChild(emojiButton);
  });

  emojiButton.addEventListener("click", () => {
    emojiPicker.style.display =
      emojiPicker.style.display === "none" ? "grid" : "none";
  });

  document.addEventListener("click", (event) => {
    if (
      !emojiButton.contains(event.target) &&
      !emojiPicker.contains(event.target)
    ) {
      emojiPicker.style.display = "none";
    }
  });

  chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    sendMessage();
  });
});

// Get a random color from predefined colors
const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};
