const Discord = require('discord.js');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
//var token = process.env.TOKEN
const adapter = new FileSync('database.json');
const storeadapter = new FileSync('store.json');
const db = low(adapter);
const storedb = low(storeadapter);

db.defaults({ histoires: [], xp: []}).write()
var token = process.env.TOKEN
var bot = new Discord.Client();
var prefix = ("-");
var randnum = 0
var botenabled = true;
var storynumber = db.get('histoires').map('story_value').value();
var dispatcher;
bot.on('ready', () => {
    bot.user.setPresence({ game: { name: '𝓔̂𝓽𝓻𝒆 𝓭𝒆𝓿 𝓹𝓪𝓻 ℒ𝓪𝓻𝓪 ℱ𝒆𝓷𝓻𝓲𝓻 & 𝓢𝓪𝓲𝓴𝓸 [-𝓱𝒆𝓵𝓹]', type: 0}});
    console.log('Bot Ready !');
});

bot.login(token)

bot.on('messageDelete', async (message) => {
    const entry = message.guild.fetchAuditLogs({type: 'MESSAGE_DELETE'}).then(audit => audit.entries.first())
    const logs = message.guild.channels.find('name', 'logs');
    if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
      message.guild.createChannel('logs', 'text'); qsdfgqksdgqzaetoiazeomt
    }
    if (!message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) { 
      console.log(`Y'as pas de channel logs, mais je peux pas le créer, HELP`)
    }
    
    var tag = message.author.tag
    let user = tag  
    logs.send(`Un message à été supprimé dans le salon ${message.channel.name} par mes soins car HRP ou par l'utilisateur l'ayant écris (Ou un staff). Le message était : " ${message} ". Écris par ${user}"`);
    
    
})
bot.on('guildMemberAdd', async member => {
    const channel = member.guild.channels.find('name', 'bienvenue');
    if (!channel) return;
    channel.send(`Bienvenue sur le serveur ${member.guild} ${member} Penses à lire les règles et faire ta fiche ! Tu peux aussi utiliser le -help pour savoir les commandes ! ou le +help pour savoir les commandes du bot musique ! (Pense à avoir tes MP's ouverts ^^")`);
    member.addRole("name", "sans fiche")
    }
    );
  

    bot.on('message', message => {
    var msgauthor = message.author.tag;

    if(message.author.bot)return;

    if(!db.get("xp").find({user: msgauthor}).value()){
        db.get("xp").push({user: msgauthor, xp: 1}).write();
    }else{
        var userxpdb = db.get("xp").filter({user: msgauthor}).find('xp').value();
        console.log(userxpdb);
        var userxp = Object.values(userxpdb)
        console.log(userxp);
        console.log(`Nombre d'xp : ${userxp[1]}`)

        db.get("xp").find({user: msgauthor}).assign({user: msgauthor, xp: userxp[1] += 1}).write();
    }

        
    if (message.content === prefix + "help"){
        var help_embed = new Discord.RichEmbed()
            .setColor('#5A01F4')
            .setThumbnail("https://cdn.discordapp.com/attachments/428932127258705940/435937828036149249/800eadaee2225360f59441cfed424f43b1a1f3aa_hq.jpg")
            .setImage("https://media.giphy.com/media/phJ6eMRFYI6CQ/giphy.gif")
            .addField("Commandes du bot ! Tout fonctionne avec le préfixe -", " -help: Affiche les commandes du bot\n-présentation: Vous présente le serveur ^^\n-fiche: Vous donne le modèle de fiche\n-playlist: Vous donne une playlist qui seras mise à jour toutes les semaines !\n-xpstat: Affche l'xp accumulée sur le serveur (En fonction des messages écris)")
            .addField("Interactions", "-ping : Commande pour le lolz, le bot répond pong")
            .addField("Commandes staffs. (Toujours mentionner la personne que vous souhaitez sanctionner.)", "-Ban\n-Kick")
            .setFooter("D'autres commandes sont à venir, soit patient jeune Padawan")
        message.author.sendEmbed(help_embed);
        console.log("Commande help demandée !")
    }
    
    if(message.content === prefix + "xpstat"){
        var xp = db.get("xp").filter({user: msgauthor}).find('xp').value()
        var xpfinal = Object.values(xp);
        var xp_embed = new Discord.RichEmbed()
            .setColor('#F72BB0')
            .setTitle(`Xp de ${message.author.username}`)
            .setDescription("Voilà toute l'xp accumulée !")
            .addField("XP :", `${xpfinal[1]} xp`)
        message.channel.send({embed: xp_embed});
    
    
    }
    if(message.content === '-roll') {
        message.delete(10000)
        var coin = Math.floor(Math.random() * 2);
        if(coin === 0) {
            coin = 'pile'
        };
        if(coin === 1) {
            coin = 'face'
        };
        message.channel.send(`${message.author.username}La pièce tourne...  Et elle tombe coté **`+coin+`**.\nSi pile, tu a réussis, si face tu échoue.`).then(msg => {
            msg.delete(25000)
          })
          
    }
    if(message.content.startsWith("(")) {
        bot.message 
        message.delete(25000)
        console.log("Un message HRP de + delet.")
        message.author.send("Pas de message HRP dans les channels RP")
       
        }

          
        
    
    
    if (!message.content.startsWith(prefix)) return;
    var args = message.content.substring(prefix.length).split(" ");
    
    switch (args[0].toLowerCase()){

        case "newstory":
        var value = message.content.substr(10);
        var author = message.author.toString();
        var number = db.get('histoires').map('id').value();
        //var storyid = number + 1;
        console.log(value);
        message.reply("Ajout de l'histoire à la base de données")

        db.get('histoires')
            .push({ id: number + 1, story_value: value, story_author: author})
            .write();
        
        break;

        case "tellstory":
        
        story_random();
        console.log(randnum);

        var story = db.get(`histoires[${randnum}].story_value`).toString().value();
        var author_story = db.get(`histoires[${randnum}].story_author`).toString().value();
        console.log(story);
        
        message.channel.send(`Voici l'histoire : ${story} (Histoire de ${author_story})`)
        
        break;
       
        case "présentation":
        var présentation = new Discord.RichEmbed()
            .setTitle("Sword Art Online")
            .setColor("#0AAFD8")
            .setImage("https://cdn.discordapp.com/attachments/378626295808131072/500114617461243905/ef77562b.png")
            .setThumbnail("https://cdn.discordapp.com/attachments/378626295808131072/500105782239428608/671a349765e550e88886f937c1221245.png")
            .setDescription("Un serveur RP basé sur le jeu Sword Art Online")
            .addField("Présentation des staffs:", "-ℒ𝓪𝓻𝓪 ℱ𝒆𝓷𝓻𝓲𝓻 Développeur & Fondateur\n-𝓢𝓪𝓲𝓴𝓸 Développeur & Fondateur")
            .addField("Règles", "-Respectez le Fear & Pain RP\n-RPQ certes autorisé, mais fortement controlé.\n-Pas d'actions improbables (Si vous avez une épée et un pistolet, me sortez pas un lance roquettes.)\n-Vous pouvez mentionner le staff, mais si vous le faites pour rien, des sanctions serront appliquées.\n-Respect des autres membres, ainsi que du staff, on est pas des robots, on vous respecte, on attend de même de votre part.\n-Ne pas tuer une personne pour le fun, car c'est juste votre perso qui va mourir (Si vous souhaitez mort RP quelqu'un, contactez un staff, qui discuteras avec vous et la personne concernée pour trouver une solution).\n-Règle ultime, AMUSEZ-VOUS !")
            .addField("Concernant le bot", "Il est en constant développement, pensez a tcheck les news dans le channel prévu à cet effet.")
        console.log("Présentation du serveur demandée")
        message.channel.send({embed: présentation})
        break;
        
        case "fiche":
        var fiche = new Discord.RichEmbed()
            .setTitle("Voici les fiches que nous attendons de votre part:")
            .setColor("#D80A29")
            .addField("Voilà les catégories:", "**Nom:**\n**Prénom:**\n**Âge:**\n**Sexe:**\n**Histoire (4 lignes PC):**\n**Caractère:**\n**Taille:**\n**Signes discinsctifs:**\n**Armes (Si votre perso en possède):**\n**Pouvoirs:**\n**Faiblesses (En rapport avec le pouvoir):**\n**Autres trucs a dire sur le perso:**\n**Image(s):**")
        console.log("Help fiche demandée")
        message.channel.send({embed: fiche})
        break;

        case "kick":   
        if (!message.channel.permissionsFor(message.member).hasPermission("KICK_MEMBERS")){
            message.reply("Wesh ! t'as cru tu pouvais kick ? t'es un gangster toi ! https://media1.tenor.com/images/6a3308e1dc31e5e846608ee80b382968/tenor.gif?itemid=5960585")
        }else{
            var member = message.mentions.members.first();
            if(!member){
                message.reply("Y'as pas de gars avec ce nom là sur le serv t'es con ou quoi ?");
            }else{
                member.kick().then((member) => {
                message.channel.send(`${member.displayName} à été kick ! Dans sa gueule ! GET KICKED !!!!!!! https://media.giphy.com/media/s2p6iXjWv1CHm/giphy.gif`);
            }).catch(() => {
                message.channel.send("Wesh ! t'as cru tu pouvais kick ? t'es un gangster toi ! https://media1.tenor.com/images/6a3308e1dc31e5e846608ee80b382968/tenor.gif?itemid=5960585")
            })
        } 
        }
        break;
        
        case "playlist":
        var playlist = new Discord.RichEmbed()
            .setTitle("Petite playlist ou musiques pour RP tranquillou ^^")
            .setAuthor("Hartanoce RP")
            .setThumbnail("https://media.giphy.com/media/cgW5iwX0e37qg/giphy.gif")
            .setImage("https://media.giphy.com/media/wsWcsrfMXjJgk/giphy.gif")
            .addField("Voilà les musiques, elles serons mise à jour souvent ! Enjoy", "<https://www.youtube.com/watch?v=-kBhum7f4rI> **(Musique chill, posée)**\n<https://www.youtube.com/watch?v=htCcgpisgtk> **(Du hard metal)**\n <https://www.youtube.com/playlist?list=UUqXzaPAOef97erJRijURPrQ> **(Playlist de tout genre, mais la particularitée, c'est que le son est en 3d ! Si tu connais pas, va jetter un oeil, ca vaux le détour ;))**")
            .addField("Comme précisé plus haut, elle serras mise à jour souvent ! Tennez vous au courant ! :p", "Vous pouvez aussi me faire vos propositions ! go me MP #SCP_One_Zero_Six.")    
        console.log("La playlist a été demandée !")
        message.channel.send({embed: playlist})    
        break;

        case "ban":

        if (!message.channel.permissionsFor(message.member).hasPermission("BAN_MEMBERS")){
            message.reply("De 1, j'ai la flèmme, de 2 t'as pas les perms et de 3 t'es un fdp à vouloir ban https://media.tenor.com/images/af630f8d408127ba0a0e96a62bfb4e4c/tenor.gif")
        }else{
            var banmember = message.mentions.members.first();
            if(!banmember){
                message.reply("Y'as pas de gars avec ce nom là sur le serv t'es con ou quoi ?");
            }else{
                banmember.ban().then((member) => {
                message.channel.send(`${member.displayName} à été ban ! En même temps, il était pas trés utile.. https://i.imgur.com/O3DHIA5.gif`);
            }).catch(() => {
                message.channel.send("De 1, j'ai la flèmme, de 2 t'as pas les perms et de 3 t'es un fdp à vouloir ban https://media.tenor.com/images/af630f8d408127ba0a0e96a62bfb4e4c/tenor.gif ")
            })
        }
        }
            
}})
