const discord = require('discord.js');
const client = new discord.Client({
    partials: ['MESSAGE', 'REACTION']
});
const { token } = require("./config.json");

client.login(token);

client.on("ready", () => {
  console.log(`[${client.readyAt.toString().split(' GMT')[0]}] Logged in as ${client.user.tag} in index script!`);
});

// You can also try to upgrade partials to full instances:
client.on('messageReactionAdd', async (reaction, user) => {
    console.log(`[${client.readyAt.toString().split(' GMT')[0]}] channel name: ${reaction.message.channel.name} with id ${reaction.message.channel.id}`);

    async function roleControl(roleName, member, action) {
        let role = reaction.message.guild.roles.cache.find(role => role.name.toLowerCase() === roleName.toLowerCase());
        console.log(role.name, 'role section');
        try {
            if(role && member) {
                await member.roles.add(role);
                console.log(role.name, "role added to member", member.user.tag);
            }
        }
        catch(err) {
            console.log(err);
        }
    }

    if (reaction.message.channel.id === '694624619436572672') {
        console.log(`[${client.readyAt.toString().split(' GMT')[0]}] in role channel`);
        let applyRole = async () => {
            let emojiName = reaction.emoji.name;
            console.log('emojiName = ', emojiName);
            let member = reaction.message.guild.members.cache.find(member => member.id === user.id);
            if (emojiName === '🇨🇳') {
                roleControl('CN', member);
            }
            else if (emojiName === '🇺🇸') {
                roleControl('NA', member);
            }
            else if (emojiName === '🇪🇺') {
                roleControl('EU', member);
            }
        }
        if(reaction.message.partial)
        {
            try {
                let msg = await reaction.message.fetch(); 
                console.log(msg.id);
                if(msg.id === '694753512973664297')
                {
                    console.log("Cached")
                    applyRole();
                }
            }
            catch(err) {
                console.log(err);
            }
        }
        else 
        {
            console.log("Not a partial.");
            if(reaction.message.id === '694753512973664297') {
                console.log(true);
                applyRole();
            }
        }
    }
  });

  client.on('messageReactionRemove', async (reaction, user) => {
    console.log(`[${client.readyAt.toString().split(' GMT')[0]}] channel name: ${reaction.message.channel.name} with id ${reaction.message.channel.id}`);

    async function roleControl(roleName, member) {
        let role = reaction.message.guild.roles.cache.find(role => role.name.toLowerCase() === roleName.toLowerCase());
        console.log(role.name, 'role section');
        try {
            if(role && member) {
                await member.roles.remove(role);
                console.log(role.name, "role removed from member", member.user.tag);
            }
        }
        catch(err) {
            console.log(err);
        }
    }

    if (reaction.message.channel.id === '694624619436572672') {
        let removeRole = async () => {
            let emojiName = reaction.emoji.name;
            console.log('emojiName = ', emojiName);
            let member = reaction.message.guild.members.cache.find(member => member.id === user.id);
            if (emojiName === '🇨🇳') {
                roleControl('CN', member);
            }
            else if (emojiName === '🇺🇸') {
                roleControl('NA', member);
            }
            else if (emojiName === '🇪🇺') {
                roleControl('EU', member);
            }
        }
        if(reaction.message.partial)
        {
            try {
                let msg = await reaction.message.fetch(); 
                console.log(msg.id);
                if(msg.id === '694753512973664297')
                {
                    console.log("Cached")
                    removeRole();
                }
            }
            catch(err) {
                console.log(err);
            }
        }
        else 
        {
            console.log("Not a partial.");
            if(reaction.message.id === '694753512973664297') {
                console.log(true);
                removeRole();
            }
        }
    }
})