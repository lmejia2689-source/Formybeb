// --- Optional update check (keep if you want) ---
(async function checkForUpdates() {
    const currentVersion = "1.0";
    const versionUrl =
      "https://raw.githubusercontent.com/ivysone/Will-you-be-my-Valentine-/main/version.json";
  
    try {
      const response = await fetch(versionUrl);
      if (!response.ok) return;
      const data = await response.json();
      if (currentVersion !== data.version) alert(data.updateMessage);
    } catch (e) {}
  })();
  
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const hint = document.getElementById("hint");
  const mainGif = document.getElementById("mainGif"); // add id="mainGif" in index.html
  
  const messages = [
    "Are you sure beb?",
    "Really sure??",
    "Are you positive?",
    "Bebs please...",
    "Just think about it!",
    "If you say no, I will be really sad...",
    "I will be very sad...",
    "I will be very very very depresso...",
    "Ok fine, I will stop asking...",
    "Just kidding, say yes please! ❤️",
  ];

  function resetNoLabelSoon() {
  setTimeout(() => {
    if (!unlocked && messageIndex < messages.length - 1) {
      noBtn.textContent = "No";
    }
  }, 900); // how long the message stays (ms) — change if you want
}

  const replacementGifUrl =
    "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2I5dDlyeHZrd2I5ZWoyMjJhcDhicjBkdDMweGdvOTJqa203d2NuayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ROp9DLlKBVmlet2ocr/giphy.gif";
  
  let messageIndex = 0;
  let unlocked = false;
  let warnedOnce = false;
  
  // OG-ish growth (fast + big, but not unclickable)
  const baseSizePx = parseFloat(getComputedStyle(yesBtn).fontSize) || 24;
  const maxSizePx = baseSizePx * 3.5;
  const growthFactor = 1.35;
  
  function showHintOnce() {
    if (warnedOnce || unlocked) return;
    warnedOnce = true;
    hint.textContent = "follow along for the bit";
    setTimeout(() => {
      if (!unlocked) hint.textContent = "";
    }, 1600);
  }
  
  function ensureYesIsFixedAtCurrentSpot() {
    if (yesBtn.style.position === "fixed") return;
  
    const r = yesBtn.getBoundingClientRect();
    yesBtn.style.position = "fixed";
    yesBtn.style.left = r.left + "px";
    yesBtn.style.top = r.top + "px";
    yesBtn.style.transform = "none";
    yesBtn.style.zIndex = "9999";
  }
  
  function moveYesAnywhere() {
    if (unlocked) return;
  
    ensureYesIsFixedAtCurrentSpot();
  
    const rect = yesBtn.getBoundingClientRect();
    const pad = 12;
  
    const maxX = Math.max(pad, window.innerWidth - rect.width - pad);
    const maxY = Math.max(pad, window.innerHeight - rect.height - pad);
  
    const x = Math.floor(Math.random() * (maxX - pad + 1)) + pad;
    const y = Math.floor(Math.random() * (maxY - pad + 1)) + pad;
  
    yesBtn.style.left = x + "px";
    yesBtn.style.top = y + "px";
  }
  
  function growYes() {
    const current = parseFloat(getComputedStyle(yesBtn).fontSize) || baseSizePx;
    const next = Math.min(current * growthFactor, maxSizePx);
    yesBtn.style.fontSize = next + "px";
  }
  
  function unlockYes() {
    unlocked = true;
  
    // Put Yes back into the normal button row (so it doesn't float on top)
    yesBtn.style.position = "";
    yesBtn.style.left = "";
    yesBtn.style.top = "";
    yesBtn.style.transform = "";
    yesBtn.style.zIndex = "";
  
    // Disable No after final message (and keep last text)
    noBtn.disabled = true;
    noBtn.style.opacity = "0.7";
    noBtn.style.cursor = "not-allowed";
  
    hint.textContent = "";
  }
  
  // Yes dodges on hover while locked
  yesBtn.addEventListener("mouseenter", () => {
    if (!unlocked) moveYesAnywhere();
  });
  
  // Global functions for your inline onclick=""
  window.handleNoClick = function () {
    if (unlocked) return;
  
    // Show next message (and do NOT loop back to "No")
    const msg = messages[messageIndex];
    noBtn.textContent = msg;
  
    // Replace gif ONLY on the last message
    if (msg === "Just kidding, say yes please! ❤️") {
      if (mainGif) mainGif.src = replacementGifUrl;
    }
  
    growYes();
  
    // If this was the last message, unlock and stop No forever
    if (messageIndex === messages.length - 1) {
      unlockYes();
      return;
    }
  
    // Otherwise go to next message and keep running
    messageIndex += 1;
    moveYesAnywhere();
  };
  
  window.handleYesClick = function () {
    if (!unlocked) {
      showHintOnce();
      moveYesAnywhere();
      return;
    }
    window.location.href = "yes_page.html";
  };
  
