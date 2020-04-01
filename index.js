const discord = require('discord.js');
const client = new discord.Client({
    partials: ['MESSAGE', 'REACTION']
});
const { token } = require("./config.json");

client.login(token);

client.on("ready", () => {
  console.log(`[${client.readyAt.toString().split(' GMT')[0]}] Logged in as ${client.user.tag} in test script!`);
});

client.on("message", msg => {
    console.log(`[${client.readyAt.toString().split(' GMT')[0]}] channel name: ${msg.channel.name} with id ${msg.channel.id}`);
  
    function generateEmbed(title, color, description, fields) {
      const successEmbed = new RichEmbed();
  
      if (!!title) {
        successEmbed.setTitle(title);
      }
  
      if (!!color) {
        successEmbed.setColor(color);
      }
  
      if (!!description) {
        successEmbed.setDescription(description);
      }
  
      if (!!fields) {
        fields.forEach(function (field) {
          successEmbed.addField(field[0], field[1], field[2]);
        });
      }
  
      return successEmbed;
    }

    if (msg.author.bot) {
        return;
    }

    if (msg.channel.id === '694624619436572672') {
        if (msg.content.toLowerCase() === '?regionroles') {
            console.log('in region roles');
            const regionRoleEmbed = new discord.MessageEmbed()
                .setTitle('Region Roles')
                .setColor(0x5CC85F)
                .addField("Peoples' Republic of China (CN)", ':flag_cn:', true)
                .addField("North America (NA)", ':flag_us:', true)
                .addField("European Union (EU)", ':flag_eu:')
                .addField("Japan (JP)", ':flag_jp:', true)
                .addField("Korea (KR)", ':flag_kr:', true);
            msg.channel.send({embed: regionRoleEmbed});
        }
    }
})

// You can also try to upgrade partials to full instances:
client.on('messageReactionAdd', async (reaction, user) => {
    console.log(`[${client.readyAt.toString().split(' GMT')[0]}] channel name: ${reaction.message.channel.name} with id ${reaction.message.channel.id}`);

    async function roleControl(roleName, member, action) {
        console.log('emoji id = ', reaction.emoji);
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
        console.log(`[${client.readyAt.toString().split(' GMT')[0]}] in add role channel with message `, reaction.message.id);
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
            else if (emojiName === '🇯🇵') {
                roleControl('JP', member);
            }
            else if (emojiName === '🇰🇷') {
                roleControl('KR', member);
            }
        }
        if(reaction.message.partial)
        {
            try {
                let msg = await reaction.message.fetch(); 
                console.log(msg.id);
                if(msg.id === '694801099059888149')
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
            if(reaction.message.id === '694801099059888149') {
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
        console.log(`[${client.readyAt.toString().split(' GMT')[0]}] in remove role channel with message `, reaction.message.id);
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
            else if (emojiName === '🇯🇵') {
                roleControl('JP', member);
            }
            else if (emojiName === '🇰🇷') {
                roleControl('KR', member);
            }
        }
        if(reaction.message.partial)
        {
            try {
                let msg = await reaction.message.fetch(); 
                console.log(msg.id);
                if(msg.id === '694801099059888149')
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
            if(reaction.message.id === '694801099059888149') {
                console.log(true);
                removeRole();
            }
        }
    }
})