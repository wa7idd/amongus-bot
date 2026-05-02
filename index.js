require('http').createServer((req, res) => res.end('Bot is alive!')).listen(3000);

const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ]
});

const PREFIX = '.';

client.on('ready', () => {
    console.log('Logged in as ' + client.user.tag + '!');
    console.log('البوت راهو واجد.. روح العب Among Us!');
});

client.on('messageCreate', async (message) => {
    // إذا الميساج ما يبداش بـ . ولا لي بعثو بوت، ما نديرو والو
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // أمر الميوت: .m
    if (command === 'm') {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.reply('يا خويا ادخل للفويس قبل ما تعيطلي!');

        voiceChannel.members.forEach(member => {
            // نموتيو قاع الغاشي إلا أنت (باش تقدر تهدر) ولا قاع الناس (نحي الشرط إذا حبيت)
            member.voice.setMute(true).catch(err => console.log('Error muting: ' + member.user.tag));
        });
        message.channel.send('  سكات! بدات اللعبة.');
    }

    // أمر إلغاء الميوت: .u
    if (command === 'u') {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.reply('لازم تكون في الفويس باش تفتح المايكات!');

        voiceChannel.members.forEach(member => {
            member.voice.setMute(false).catch(err => console.log('Error unmuting: ' + member.user.tag));
        });
        message.channel.send('🎙️ اهدروا كما تحبو!');
    }
});

