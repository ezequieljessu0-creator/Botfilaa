const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

let fila = [];

client.on("ready", () => {
  console.log("🤖 Bot online no Fly.io");
});

client.on("messageCreate", (msg) => {
  if (msg.author.bot) return;

  if (msg.content === "!fila") {
    fila = [];
    msg.channel.send("📋 Fila criada!");
  }

  if (msg.content === "!entrar") {
    if (fila.includes(msg.author.id))
      return msg.reply("❌ Você já está na fila.");
    fila.push(msg.author.id);
    msg.reply("✅ Entrou na fila!");
  }

  if (msg.content === "!verfila") {
    if (fila.length === 0)
      return msg.channel.send("Fila vazia.");
    msg.channel.send(
      "**Fila:**\n" + fila.map(id => `<@${id}>`).join("\n")
    );
  }

  if (msg.content === "!sair") {
    fila = fila.filter(id => id !== msg.author.id);
    msg.reply("🚪 Saiu da fila.");
  }
});

client.login(process.env.TOKEN);
