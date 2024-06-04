require('dotenv').config(); 

const { Client, Intents, WebhookClient, MessageEmbed } = require('discord.js');
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS 
    ]
});

const weburl = 'https://discord.com/api/webhooks/1247291645100167319/mEhxijjkubluB6ZbnR1Z0eaIqQKXw8LBNfW0gDbq37Wm81t_pc3_heHywOai8rmJSg-P';
const webhookClient = new WebhookClient({ url: weburl });

const sunucuid = '1222306865602498631'; 
const selfid = '1127020031969071124'; 

client.on('guildUpdate', async (oldGuild, newGuild) => {
    if (newGuild.id === sunucuid) {
        const oldVanityURL = oldGuild.vanityURLCode || '';
        const newVanityURL = newGuild.vanityURLCode || '';

        if (oldVanityURL !== newVanityURL) {
            try {
                const member = await newGuild.members.fetch(selfid);
                await member.kick('cekemeyen varsa gitsin evde asilsin');
                console.log(`${selfid} atıldı`);
            } catch (error) {
                console.error(`kick atilmadi aq: ${error}`);
            }

            const embed = new MessageEmbed()
                .setTitle('Vanity URL Claimed')
                .setDescription(`**[ ✯ ] New: discord.gg/${newVanityURL} **\n**[ ✯ ] Old: discord.gg/${oldVanityURL} **`)
                .setColor(null)
                .setFooter('We are always the fastest', 'https://cdn.discordapp.com/avatars/1162845606230884434/a_2d2e3eb756ee67063ab8ba38fabfe722.gif?size=1024&width=0&height=256')
                .setTimestamp()
                .setThumbnail('https://i.gifer.com/IbwU.gif');

            await sendWebhookMessage('@everyone', embed);
        }
    }
});

async function sendWebhookMessage(content, embed) {
    try {
        await webhookClient.send({
            content: content,
            embeds: [embed]
        });
        console.log('sending successful');
    } catch (error) {
        console.error(`webhook gonderilmedi: ${error}`);
    }
}

client.login(process.env.DISCORD_TOKEN)
    .then(() => console.log('santolar baslatildi...'))
    .catch(err => console.error(`santolar baslatilamadi: ${err}`));
