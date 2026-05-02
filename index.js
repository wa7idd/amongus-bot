// سطر مهم لـ Render باش يحسب البوت موقع ويب وما يطفيش عليه السيرفر
require('http').createServer((req, res) => res.end('Bot is alive!')).listen(3000);

const { Client, GatewayIntentBits } = require('discord.js');

// إعداد الصلاحيات (Intents) - لازم تكون مفعلة في Discord Developer Portal برك
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
    console.log('✅ Logged in as ' + client.user.tag + '!');
    console.log('🚀 البوت راهو واجد.. روح العب Among Us!');
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

        try {
            voiceChannel.members.forEach(member => {
                // الميوت يطبق على قاع الناس لي في الفويس
                member.voice.setMute(true).catch(err => console.log('Error muting: ' + member.user.tag));
            });
            message.channel.send('🤫 سكات! بدات اللعبة.');
        } catch (error) {
            console.error(error);
            message.reply('صرات مشكلة في الميوت، تأكد بلي عندي صلاحية Mute Members.');
        }
    }

    // أمر إلغاء الميوت: .u
    if (command === 'u') {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.reply('لازم تكون في الفويس باش تفتح المايكات!');

        try {
            voiceChannel.members.forEach(member => {
                member.voice.setMute(false).catch(err => console.log('Error unmuting: ' + member.user.tag));
            });
            message.channel.send('🎙️ اهدروا كما تحبو! خلصت اللعبة.');
        } catch (error) {
            console.error(error);
            message.reply('ما قدرتش نفتح المايكات، كاين مشكلة في الصلاحيات.');
        }
    }
});

// السطر الأخير والمهم: يقرأ التوكن من إعدادات Render
client.login(process.env.TOKEN);