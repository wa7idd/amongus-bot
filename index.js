const Discord = require('discord.js');
const client = new Discord.Client({ 
    intents: [
        32767, // All Intents
        "GuildMessages", 
        "MessageContent", 
        "GuildVoiceStates"
    ] 
});

// السطر هذا باش Render ما يطفيش البوت
require('http').createServer((req, res) => res.end('Bot is alive!')).listen(3000);

// حط الـ ID تاع الـ Role اللي بعثتهولي هنا
const ROLE_ID = '783769017742917683'; 

client.on('ready', () => {
    console.log('Logged in as ' + client.user.tag);
});

client.on('messageCreate', async (message) => {
    // إذا الميساج ما يبداش بـ "." أو اللي بعثو بوت، ما ندير والو
    if (!message.content.startsWith('.') || message.author.bot) return;

    // التأكد من أن اللي بعث الأمر عندو رتبة النقطة "."
    if (!message.member.roles.cache.has(ROLE_ID)) {
        return; // إذا ما عندوش الرتبة، البوت يتجاهل الأمر تماماً
    }

    const command = message.content.toLowerCase();

    // أمر الميوت (يسكت قاع الناس اللي في الفويس)
    if (command === '.m') {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.reply('ادخل للفويس قبل!');
        
        voiceChannel.members.forEach(member => {
            member.voice.setMute(true).catch(err => console.log('Error Muting'));
        });
        message.channel.send('🤫 قاع سكات! (Among Us Mode)');
    }

    // أمر فك الميوت
    if (command === '.u') {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.reply('ادخل للفويس قبل!');
        
        voiceChannel.members.forEach(member => {
            member.voice.setMute(false).catch(err => console.log('Error Unmuting'));
        });
        message.channel.send('🎙️ اهدروا درك!');
    }
});

// استدعاء التوكن من Environment Variables في Render
client.login(process.env.TOKEN);