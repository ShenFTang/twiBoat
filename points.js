var points = require('./points.json');
var twitterids = require('./twitterids.json');
const fs = require('fs');

const Discord = require("discord.js");
const { Client, RichEmbed } = require('discord.js');
const { token, group_name } = require("./config.json");
const client = new Discord.Client();

client.on("ready", () => {
  console.log(`[${client.readyAt.toString().split(' GMT')[0]}] Logged in as ${client.user.tag} in points script!`);
});

client.on("message", msg => {
  // if (msg.content === "ping") {
  //   msg.reply("pong");
  // }

  console.log(`[${client.readyAt.toString().split(' GMT')[0]}] channel id: ${msg.channel.id}`);
  if (msg.author.id !== '674484991744278528' && msg.channel.id === '609235514058604565') {
    console.log(`[${client.readyAt.toString().split(' GMT')[0]}] in success channel`);
    point = points[msg.author.id] ? points[msg.author.id] : 0;
    if (msg.content && msg.content.includes('https://twitter.com/')) {
      if (!twitterids[msg.author.id]) {
        newPoint = point + 1;
        const successEmbed = new RichEmbed()
          .setTitle('Thanks for posting success!')
          .setColor(0xFF0000)
          .setDescription('Automatically added twitter ['+msg.content.split('/')[3]+'] to your account.\nBestAIO point increases 1.')
          .addField('Your username', msg.author.tag, true)
          .addField('Linked Twitter', msg.content.split('/')[3], true)
          .addField('Current Points', newPoint, true)
          .addField('Your userID', msg.author.id, true);
        msg.channel.send({embed: successEmbed});

        points[msg.author.id] = newPoint;
        var pointsData = JSON.stringify( points );
        fs.writeFileSync( 'points.json', pointsData );

        twitterids[msg.author.id] = msg.content.split('/')[3];
        var twitteridsData = JSON.stringify( twitterids );
        fs.writeFileSync( 'twitterids.json', twitteridsData );
      }
      else if (msg.content.includes('https://twitter.com/'+twitterids[msg.author.id]+'/status')) {
        newPoint = point + 1;
        const successEmbed = new RichEmbed()
          .setTitle('Thanks for posting success!')
          .setColor(0xFF0000)
          .setDescription('BestAIO point increases 1.')
          .addField('Your username', msg.author.tag, true)
          .addField('Linked Twitter', msg.content.split('/')[3], true)
          .addField('Current Points', newPoint, true)
          .addField('Your userID', msg.author.id, true);
        msg.channel.send({embed: successEmbed});

        points[msg.author.id] = newPoint;
        var pointsData = JSON.stringify( points );
        fs.writeFileSync( 'points.json', pointsData );
      }
      else if (twitterids[msg.author.id] !== msg.content.split('/')[3]) {
        const successEmbed = new RichEmbed()
          .setTitle('You already linked another twitter to you discord account.')
          .setColor(0xFF0000)
          .setDescription('The current twitter link user does not match what we have in our record.\nPlease contact admin to update your new twitter account.')
          .addField('Your username', msg.author.tag, true)
          .addField('Linked Twitter', msg.content.split('/')[3], true)
          .addField('Current Points', point, true)
          .addField('Your userID', msg.author.id, true);
        msg.channel.send({embed: successEmbed})
          .then(message => message.delete(20000));
      }
    }
    else {
      const successEmbed = new RichEmbed()
        .setTitle('Please provide a valid twitter link.')
        .setColor(0xFF0000);
      msg.channel.send({embed: successEmbed})
        .then(message => message.delete(20000));
    }
  }
  else if (msg.author.id !== '674484991744278528' && msg.channel.id === '682045090327298258') {
    console.log(`[${client.readyAt.toString().split(' GMT')[0]}] in points channel`);
    point = points[msg.author.id] ? points[msg.author.id] : 0;
    if (msg.content.split(' ')[0] === '!points') {
      const successEmbed = new RichEmbed()
        .setTitle('Your current point is '+point+'.')
        .setColor(0xFF0000)
        .addField('Your username', msg.author.tag, true)
        .addField('Linked Twitter', twitterids[msg.author.id], true)
        .addField('Current Points', point, true)
        .addField('Your userID', msg.author.id, true);
      msg.channel.send({embed: successEmbed});
    }
    else {
      const successEmbed = new RichEmbed()
        .setTitle('Please use [!points] to check your points. Thank you!')
        .setColor(0xFF0000)
        .addField('Your username', msg.author.tag, true)
        .addField('Linked Twitter', twitterids[msg.author.id], true)
        .addField('Current Points', point, true)
        .addField('Your userID', msg.author.id, true);
      msg.channel.send({embed: successEmbed})
        .then(message => message.delete(20000));
    }
  }
  else if (msg.author.id !== '674484991744278528' && msg.channel.id === '682111669299576902') {
    console.log(`[${client.readyAt.toString().split(' GMT')[0]}] in admin channel`);
    if (msg.content.split(' ')[0] === '!userid') {
      msg.guild.members.forEach(member => {
        if (member.user.tag === msg.content.split(' ')[1]) {
          targetUser = member.user;
        }
      });
      point = points[targetUser.id] ? points[targetUser.id] : 0;

      const successEmbed = new RichEmbed()
        .setTitle('User '+ targetUser.tag+' current point is '+point+'.')
        .setColor(0xFF0000)
        .addField('Username', targetUser.tag, true)
        .addField('Linked Twitter', twitterids[targetUser.id], true)
        .addField('Current Points', point, true)
        .addField('userID', targetUser.id, true);
      msg.channel.send({embed: successEmbed});
    }
    else if (msg.content.split(' ')[0] === '!pointscheck') {
      userTag = msg.guild.member(msg.content.split(' ')[1]).user.tag;
      point = points[msg.content.split(' ')[1]] ? points[msg.content.split(' ')[1]] : 0;

      const successEmbed = new RichEmbed()
        .setTitle('User '+ userTag+' current point is '+point+'.')
        .setColor(0xFF0000)
        .addField('Username', userTag, true)
        .addField('Linked Twitter', twitterids[msg.content.split(' ')[1]], true)
        .addField('Current Points', point, true)
        .addField('userID', msg.content.split(' ')[1], true);
      msg.channel.send({embed: successEmbed});
    }
    else if (msg.content.split(' ')[0] === '!reward') {
      userTag = msg.guild.member(msg.content.split(' ')[1]).user.tag;
      point = points[msg.content.split(' ')[1]] ? points[msg.content.split(' ')[1]] : 0;
      newPoint = point - msg.content.split(' ')[2];

      const successEmbed = new RichEmbed()
        .setTitle('Rewarded '+msg.content.split(' ')[2]+' points for user '+userTag+'.')
        .setColor(0xFF0000)
        .addField('Username', userTag, true)
        .addField('Linked Twitter', twitterids[msg.content.split(' ')[1]], true)
        .addField('Current Points', newPoint, true)
        .addField('userID', msg.content.split(' ')[1], true);
      msg.channel.send({embed: successEmbed});

      points[msg.content.split(' ')[1]] = newPoint;
      var pointsData = JSON.stringify( points );
      fs.writeFileSync( 'points.json', pointsData );
    }
  }
  else if (msg.author.id !== '674484991744278528' && msg.channel.id === '663290992488873984') {
    console.log(`[${client.readyAt.toString().split(' GMT')[0]}] in test channel`);
    point = points[msg.author.id] ? points[msg.author.id] : 0;

    // Success API
    if (msg.content && msg.content.includes('https://twitter.com/')) {
      console.log('in Success API');
      if (!twitterids[msg.author.id]) {
        newPoint = point + 1;

        twitterids[msg.author.id] = msg.content.split('/')[3];
        var twitteridsData = JSON.stringify( twitterids );
        fs.writeFileSync( 'twitterids.json', twitteridsData );

        const successEmbed = new RichEmbed()
          .setTitle('Thanks for posting success!')
          .setColor(0xFF0000)
          .setDescription('Automatically added twitter ['+msg.content.split('/')[3]+'] to your account.\nBestAIO point increases 1.')
          .addField('Your username', msg.author.tag, true)
          .addField('Linked Twitter', twitterids[msg.author.id], true)
          .addField('Current Points', newPoint, true)
          .addField('Your userID', msg.author.id, true);
        msg.channel.send({embed: successEmbed});

        points[msg.author.id] = newPoint;
        var pointsData = JSON.stringify( points );
        fs.writeFileSync( 'points.json', pointsData );
      }
      else if (msg.content.includes('https://twitter.com/'+twitterids[msg.author.id]+'/status')) {
        newPoint = point + 1;
        const successEmbed = new RichEmbed()
          .setTitle('Thanks for posting success!')
          .setColor(0xFF0000)
          .setDescription('BestAIO point increases 1.')
          .addField('Your username', msg.author.tag, true)
          .addField('Linked Twitter', twitterids[msg.author.id], true)
          .addField('Current Points', newPoint, true)
          .addField('Your userID', msg.author.id, true);
        msg.channel.send({embed: successEmbed});

        points[msg.author.id] = newPoint;
        var pointsData = JSON.stringify( points );
        fs.writeFileSync( 'points.json', pointsData );
      }
      else if (twitterids[msg.author.id] !== msg.content.split('/')[3]) {
        const successEmbed = new RichEmbed()
          .setTitle('You already linked another twitter to you discord account.')
          .setColor(0xFF0000)
          .setDescription('The current twitter link user does not match what we have in our record.\nPlease contact admin to update your new twitter account.')
          .addField('Your username', msg.author.tag, true)
          .addField('Linked Twitter', twitterids[msg.author.id], true)
          .addField('Current Points', point, true)
          .addField('Your userID', msg.author.id, true);
        msg.channel.send({embed: successEmbed})
          .then(message => message.delete(20000));
      }
    }
    else {
      msg.delete(3000);

      const successEmbed = new RichEmbed()
        .setTitle('Please provide a valid twitter link.')
        .setColor(0xFF0000);
      msg.channel.send({embed: successEmbed})
        .then(message => message.delete(20000));
    }

    // Points API
    if (msg.content.split(' ')[0] === '!points') {
      console.log('in Points API');
      point = points[msg.author.id] ? points[msg.author.id] : 0;

      const successEmbed = new RichEmbed()
        .setTitle('Your current point is '+point+'.')
        .setColor(0xFF0000)
        .addField('Your username', msg.author.tag, true)
        .addField('Linked Twitter', twitterids[msg.author.id], true)
        .addField('Current Points', point, true)
        .addField('Your userID', msg.author.id, true);
      msg.channel.send({embed: successEmbed});
    }
    else {
      const successEmbed = new RichEmbed()
        .setTitle('Please use [!points] to check your points. Thank you!')
        .setColor(0xFF0000)
        .addField('Your username', msg.author.tag, true)
        .addField('Linked Twitter', twitterids[msg.author.id], true)
        .addField('Current Points', point, true)
        .addField('Your userID', msg.author.id, true);
      msg.channel.send({embed: successEmbed})
        .then(message => message.delete(20000));
    }

    // Admin API
    if (msg.content.split(' ')[0] === '!userid') {
      msg.guild.members.forEach(member => {
        if (member.user.tag === msg.content.split(' ')[1]) {
          targetUser = member.user;
        }
      });
      point = points[targetUser.id] ? points[targetUser.id] : 0;

      const successEmbed = new RichEmbed()
        .setTitle('User '+ targetUser.tag+' current point is '+point+'.')
        .setColor(0xFF0000)
        .addField('Username', targetUser.tag, true)
        .addField('Linked Twitter', twitterids[targetUser.id], true)
        .addField('Current Points', point, true)
        .addField('userID', targetUser.id, true);
      msg.channel.send({embed: successEmbed});
    }
    else if (msg.content.split(' ')[0] === '!pointscheck') {
      userTag = msg.guild.member(msg.content.split(' ')[1]).user.tag;
      point = points[msg.content.split(' ')[1]] ? points[msg.content.split(' ')[1]] : 0;

      const successEmbed = new RichEmbed()
        .setTitle('User '+ userTag+' current point is '+point+'.')
        .setColor(0xFF0000)
        .addField('Username', userTag, true)
        .addField('Linked Twitter', twitterids[msg.content.split(' ')[1]], true)
        .addField('Current Points', point, true)
        .addField('userID', msg.content.split(' ')[1], true);
      msg.channel.send({embed: successEmbed});
    }
    else if (msg.content.split(' ')[0] === '!reward') {
      userTag = msg.guild.member(msg.content.split(' ')[1]).user.tag;
      point = points[msg.content.split(' ')[1]] ? points[msg.content.split(' ')[1]] : 0;
      newPoint = point - msg.content.split(' ')[2];

      const successEmbed = new RichEmbed()
        .setTitle('Rewarded '+msg.content.split(' ')[2]+' points for user '+userTag+'.')
        .setColor(0xFF0000)
        .addField('Username', userTag, true)
        .addField('Linked Twitter', twitterids[msg.content.split(' ')[1]], true)
        .addField('Current Points', newPoint, true)
        .addField('userID', msg.content.split(' ')[1], true);
      msg.channel.send({embed: successEmbed});

      points[msg.content.split(' ')[1]] = newPoint;
      var pointsData = JSON.stringify( points );
      fs.writeFileSync( 'points.json', pointsData );
    }
  }
});

client.login(token);