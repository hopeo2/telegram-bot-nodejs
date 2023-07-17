const Telegraf = require("telegraf");

const bot = new Telegraf("6396317255:AAH__QJfjGpQDrjm5n_fZhqRXYZwWJq4dxk");

//---------------------------start**
const helpMessage = `
Say somthing to me
/start - start the bot
/my_profile - show your last profile pic
/userid - show your user id
/echo <message> - echo a message
/arsenal - Arsenal
`;

bot.use((ctx, next) => {
    if (ctx.updateSubTypes[0] == "text") {
        bot.telegram.sendMessage(
            -946477626,
            ctx.from.username + " touch: " + ctx.message.text
        );
    } else {
        bot.telegram.sendMessage(
            -946477626,
            ctx.from.username + " send: " + ctx.updateSubTypes[0]
        );
    }
    next();
});

bot.start((ctx) => {
    ctx.reply("فعلا yoo");
    ctx.reply(helpMessage);
});
bot.help((ctx) => {
    ctx.reply("what need help stupid!");
});
bot.command("my_profile", async (ctx) => {
    const user = await ctx.telegram.getChat(ctx.from.id);
    ctx.telegram.getUserProfilePhotos(user.id, 0, 1).then(function (data) {
        bot.telegram.sendPhoto(ctx.chat.id, data.photos[0][0].file_id, {
            caption: "It's your profile!",
        });
    });
});
bot.command("userid", function onMessage(msg) {
    var chatId = msg.chat.id;
    var userId = msg.from.id;
    bot.telegram.sendMessage(chatId, `your user-id is ${userId}`);
});
bot.command("arsenal", function onMessage(msg) {
    var chatId = msg.chat.id;
    var userId = msg.from.id;
    bot.telegram.sendMessage(
        chatId,
        `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxwpAGi5_mCFviJ6Ed849fiP9Jx4G0Aa1yiaJSc-wAI_25i5tiZEcB60_RxitJPbEQrfc&usqp=CAU`
    );
});
bot.command("echo", (ctx) => {
    let input = ctx.message.text;
    let inputArray = input.split(" ");
    let message = "";

    if (inputArray.length == 1) {
        message = "you type nothing!!";
    } else {
        inputArray.shift();
        message = inputArray.join(" ");
    }
    ctx.reply(message);
});

bot.hears("cat", (ctx) => {
    ctx.reply("mew");
});

bot.launch();
