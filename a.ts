// ... (在文件顶部添加转义函数)
function escapeUnderscore(text: string): string {
    // 仅转义下划线
    return text.replace(/_/g, '\\_');
}
// ...

// ------------------------------------------
// B. 普通用户消息处理 (转发给管理员，并添加键盘)
// ------------------------------------------
if (userId !== ADMIN_ID_NUMBER) {
    
    // ... (构造 replyKeyboard 保持不变)

    // 1. 转义用户名和用户消息文本 (仅转义下划线)
    const escapedUsername = escapeUnderscore(username || '未知用户');
    // 如果用户消息可能包含下划线（例如代码或文件名），也需要转义
    const escapedUserText = escapeUnderscore(ctx.message.text || ''); 

    // 2. 构造消息附加文本，说明来源
    // 注意：在这里，** 和 ` ` 仍然可以用于格式化，因为我们只转义了 _
    const sourceText = `\n\n---\n🔔 **新消息**来自 @${escapedUsername} (ID: \`${userId}\`)`;
    
    try {
        if (ctx.message.text) {
            // 如果是纯文本，使用 sendMessage
            const fullText = escapedUserText + sourceText; 
            
             await bot.api.sendMessage(ADMIN_ID_NUMBER, fullText, {
                parse_mode: "Markdown", 
                reply_markup: replyKeyboard
            });
        } else if (ctx.message.photo || ctx.message.video || ctx.message.document) {
             // 如果是带媒体的消息，使用 copyMessage
             const escapedCaption = escapeUnderscore(ctx.message.caption || "");
             
             await bot.api.copyMessage(
                ADMIN_ID_NUMBER, 
                chatId, 
                messageId, 
                {
                    caption: escapedCaption + sourceText, 
                    parse_mode: "Markdown",
                    reply_markup: replyKeyboard
                }
            );
        } else {
            // 其他类型（如贴纸、语音等）直接转发... (保持不变)
            await ctx.forwardMessage(ADMIN_ID_NUMBER);
            
            // 发送附加的回复按钮提示
            await bot.api.sendMessage(
                ADMIN_ID_NUMBER,
                `用户发送了特殊内容（例如贴纸），请点击下方按钮回复用户 ID: \`${userId}\``,
                { parse_mode: "Markdown", reply_markup: replyKeyboard }
            );
        }

        // 3. 给出用户默认回复 (保持不变)
        await ctx.reply("您的消息已收到，我们已通知客服人员，请耐心等待回复。", {reply_markup: services});
        
    } catch (e) {
        console.error("消息转发/复制给管理员失败:", e);
        // ... (错误处理)
    }
}
// ...