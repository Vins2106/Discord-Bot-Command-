//npm install discord.js (d.js v12)
//npm install quick.db (q.db v7.1.1)

client.on("message", async message => {
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
  
  if (cmd === "autorole") {
    const role = message.mentions.roles.first()
    if (!role) return message.reply("Mentions Roles First!")
    
    db.set(`role.${message.guild.id}`, role.id)
    
    message.channel.send(`set autorole to ${role}`)
  }
});

client.on("guildMemberAdd", async member => {
  const chx = db.get(`role.${member.guild.id}`)
  
  member.addRole(chx)
})
