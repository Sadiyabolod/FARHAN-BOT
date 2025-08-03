const { performance } = require('perf_hooks');

module.exports = {
    config: {
        name: "FARHAN",
        version: "1.1",
        author: "FARHAN",
        category: "SYSTEM",
        permission: "ADMIN ONLY",
        description: "Checks the bot's ping and response speed with visual design"
    },
    
    onStart: async function({ api, event, args, threadsData, usersData, dashBoardData, globalData, threadModel, userModel, dashBoardModel, globalModel, role, command }) {
        // Only allow specific admin ID (100000448596616) to use this command
        const BOT_ADMIN_ID = "100000448596616";
        
        if (event.senderID !== BOT_ADMIN_ID) {
            const deniedMsg = `╭───────────────╮
│  ⚠️ 𝗪𝗔𝗥𝗡𝗜𝗡𝗚  ⚠️  │
╰───────────────╯
│
│ ✖ You don't have permission 
│   to use this command.
│
│ 🔒 BOT ADMIN ONLY ACCESS
│
╰───────────────────────•`;
            return api.sendMessage(deniedMsg, event.threadID, event.messageID);
        }

        try {
            const startTime = performance.now();
            
            // Send initial message with design
            const checkingMsg = `╭───────────────────╮
│  📡 𝗖𝗛𝗘𝗖𝗞𝗜𝗡𝗚...  │
╰───────────────────╯
│
│ ⏳ Measuring Melissa's 
│   response speed...
│
╰──────────────────────•`;
            const pingMessage = await api.sendMessage(checkingMsg, event.threadID);
            
            const endTime = performance.now();
            const ping = Math.floor(endTime - startTime);
            
            // Delete the initial checking message
            api.unsendMessage(pingMessage.messageID);
            
            // Determine ping status with beautiful design
            let responseMessage;
            if (ping < 300) {
                responseMessage = `╭───────────────────╮
│  🚀 𝗣𝗘𝗥𝗙𝗢𝗥𝗠𝗔𝗡𝗖𝗘  │
╰───────────────────╯
│
│ ✅ Ping: ${ping}ms
│
│ 💫 Bot is very smooth 
│    like butter 😗🫶
│
│ 🌟 Excellent performance!
│
╰──────────────────────•`;
            } else if (ping < 600) {
                responseMessage = `╭───────────────────╮
│  ⚠️ 𝗡𝗢𝗧𝗜𝗖𝗘  ⚠️  │
╰───────────────────╯
│
│ 🕒 Ping: ${ping}ms
│
│ ⚡ Response is a bit 
│   slow but manageable
│
│ 🔧 Might need tuning
│
╰──────────────────────•`;
            } else {
                responseMessage = `╭───────────────────╮
│  🚨 𝗖𝗥𝗜𝗧𝗜𝗖𝗔𝗟  🚨  │
╰───────────────────╯
│
│ ❌ Ping: ${ping}ms
│
│ 🐢 Bot will lag badly!
│
│ 🔥 Immediate attention
│    required!
│
╰──────────────────────•`;
            }
            
            api.sendMessage(responseMessage, event.threadID);
            
        } catch (error) {
            console.error("Ping command error:", error);
            const errorMsg = `╭───────────────────╮
│  ❌ 𝗘𝗥𝗥𝗢𝗥  ❌  │
╰───────────────────╯
│
│ 🔧 Failed to check ping
│
│ ⚠️ Please try again later
│
╰──────────────────────•`;
            api.sendMessage(errorMsg, event.threadID);
        }
    }
};
