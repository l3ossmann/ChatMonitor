const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3000;

const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1402179664369287218/ictAf1zZus-PwgZmALoQ2snGnqemOnJP7HKalAw8tpVe4EcQIZZEi3iZZyHzNFUSp-HH"; // Your webhook

app.use(express.json());

app.post("/api/report", async (req, res) => {
  const { username, userId, message, serverId, time } = req.body;

  const embed = {
    title: "🚨 Chat Bypass Detected",
    color: 16711680,
    fields: [
      { name: "Player", value: `[${username}](https://www.roblox.com/users/${userId}/profile)`, inline: true },
      { name: "User ID", value: userId.toString(), inline: true },
      { name: "Server ID", value: serverId, inline: true },
      { name: "Time (UTC)", value: time },
      { name: "Message", value: `\`\`\`${message}\`\`\`` }
    ]
  };

  try {
    await axios.post(DISCORD_WEBHOOK, {
      username: "Roblox Monitor",
      embeds: [embed]
    });
    res.sendStatus(200);
  } catch (e) {
    console.error("Discord Error", e);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
