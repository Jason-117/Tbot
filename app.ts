import { Bot, InlineKeyboard, webhookCallback } from "https://deno.land/x/grammy@v1.36.1/mod.ts";
import { Menu } from "https://deno.land/x/grammy_menu@v1.3.0/mod.ts";

const BOT_TOKEN = Deno.env.get("BOT_TOKEN");
if (!BOT_TOKEN) {
    throw new Error("BOT_TOKEN 环境变量未设置！");
}
console.log(BOT_TOKEN);
const bot = new Bot(BOT_TOKEN);

const kv = await Deno.openKv();

const handleUpdate = webhookCallback(bot, "std/http");

interface CallbackData {
    action: string;
    messageId?: number;
    chatId?: number;
    product?: string; // 用于标识点击了哪个产品介绍按钮
}

// 发送产品介绍
async function sendProductIntroduction(ctx: any, text: string) {
    await ctx.reply(
        text,
        {
            parse_mode: "Markdown",
            reply_markup: new InlineKeyboard().text("关闭", "delete_message"),
        }
    );
}

//主菜单
const menu = new Menu("root")
  .submenu("官方客服","serviecs").row()
  .submenu("官方频道", "channel").row()
  .submenu("Dolphin产品", "products").row()
  .url("Dolphin出海群", "https://t.me/Dolphinchuhai").row()

//官方客服子菜单
const services = new Menu("serviecs")
    .url("官方客服","https://t.me/Dolphin_guanfang").row()
    .back("返回");

//官方频道子菜单
const channel = new Menu("channel")
    .url("海外社媒营销服务","https://t.me/dolphinMarketing").row()
    .url("多粉筛选中心","https://t.me/Dolphin_Data").row()
    .url("多粉云控官方","https://t.me/dolphincontrol").row()
    .url("SCRM 官方频道","https://t.me/dolphinSCRM").row()
    .back("返回");

//Dolphin产品子菜单
const products = new Menu("products")
    .url("WS营销平台","https://t.me/Dolphin_guanfang")
    .text("介绍",async (ctx) => {
        await sendProductIntroduction(ctx,'WS营销平台\n对在WhatsApp上有营销需求的用户提供快速获客渠道以及账号支持\n协议拉群：支持各国拉群业务，速度稳定，风控响应及时；\n协议群发：支持各国发送业务，多类发送模式，普链、超链、名片精准触达，到达进线稳定；\n平台账号：支持各国频道号、直登号。频道号支持商业号、个人号、快打号、老号，直登号支持商业直登号、个人直登号、老号直登号。');
    }).row()
    .url("TG营销平台","https://t.me/Dolphin_guanfang")
    .text("介绍",async (ctx) => {
        await sendProductIntroduction(ctx,'TG营销平台\n对在Telegram上有营销需求的用户提供快速获客渠道以及账号支持\n协议拉群：支持各国拉群业务，速度稳定，风控响应及时；\n协议群发：支持各国发送业务，多类发送模式，普通私信、普通图文、名片私信、PostBot私信精准触达，进线稳定；\n平台账号：支持各国协议号、直登号、Tdata。协议号支持各类工具以及云控登录使用，直登号支持各类设备手动登录，Tdata支持PC端多登以及部分云控登录使用。');
    }).row()
    .url("Dolphin筛选中心","https://www.duofendata.com/login/")
    .text("介绍",async (ctx) => {
        await sendProductIntroduction(ctx,'筛选中心\nDolphin筛选中心提供40+数据筛选服务，支持众多海外主流社交平台，独立平台，确保用户数据安全，新用户限时赠送免费测试，量大可优，特殊需求及业务可及时联系，支持专人专项服务\n号码生成：支持全球号码生成以及自定义号码生成，一键生成目标地区号码；\n号码筛选：支持筛选开通、活跃、性别年龄、头像、IOS、空号、RCS、蓝号等；\n综合筛选：独家首发，一键筛选单平台所有业务，对单个平台上的所有类型业务进行有序筛选，为用户提供强大的数据处理和业务管理能力，极大地提升工作效率和决策水平；\n融合筛选：独家首发，一键筛选多平台有效手机号，高效整合和处理来自不同平台的数据，检查数据的有效情况，并支持用户自定义导出所需数据，极大地提升数据管理和分析的效率。');
    }).row()
    .url("WhatsApp云控","https://t.me/Dolphin_guanfang")
    .text("介绍",async (ctx) => {
        await sendProductIntroduction(ctx,'WhatsApp云控\nDolphin WS云控是一款基于WhatsApp开发的快速获客+客服营销工具，实现客户流量快速增长\n获客功能：接粉、打粉、客服坐席、群组聊天室；\n营销功能：一键群发群呼、暴力群发、拉群炒群、聊天监控、双向实时翻译、自动回复；\n账号管理：批量上号、全自动养号、账号资料继承；\n粉丝管理：营销数据汇总、席位计数工单、分流链接、聊天实时监控。');
    }).row()
    .url("Telegram云控","https://t.me/Dolphin_guanfang")
    .text("介绍",async (ctx) => {
        await sendProductIntroduction(ctx,'Telegram云控\nDolphin TG云控是一款基于Telegram开发的快速获客+客服营销工具，实现客户流量快速增长\n获客功能：接粉、打粉、客户端坐席；\n营销功能：批量添加好友、一键群发群呼、自动回复、双向实时翻译；\n账号管理：批量上号、批量修改头像昵称、批量检测账号能力、一键清空历史列表及联系人；\n粉丝管理：营销数据汇总、席位计数工单、数据脱敏管控。');
    }).row()
    .url("Telegram云控Pro","https://t.me/Dolphin_guanfang")
    .text("介绍",async (ctx) => {
        await sendProductIntroduction(ctx,'Telegram云控Pro\nDolphin TG云控Pro 是一款基于Telegram开发的快速获客+客服营销工具，实现客户流量快速增长\n获客功能：接粉、打粉、客服坐席、群组聊天室；\n营销功能：批量添加好友、一键群发群呼、自动回复、双向实时翻译；\n账号管理：批量上号、批量修改头像昵称、批量检测账号能力、一键清空历史列表及联系人；\n粉丝管理：营销数据汇总、席位计数工单、数据脱敏管控。');
    }).row()
    .url("SCRM 客服工具","https://client.dolphinscrm.com/")
    .text("介绍",async (ctx) => {
        await sendProductIntroduction(ctx,'客服工具\nDolphin客服工具是一款聚合全球主流社交平台的海外私域运营管理工具，独立平台，确保用户数据安全\n获客功能：接粉、打粉、客户端坐席、精细化粉丝信息；\n营销功能：平台账号多开聚合聊天，多模式快捷回复、双向实时翻译、自动回复；\n客服管理：聊天监控、敏感词监控、粉丝信息数据脱敏、席位数据分享、分流链接；\n粉丝管理：粉丝画像、粉丝标签、粉丝转化、粉丝备注、粉丝活跃度。');
    }).row()
    .url("Viber营销平台","https://t.me/Dolphin_guanfang")
    .text("介绍",async (ctx)=>{
        await sendProductIntroduction(ctx,'Viber营销平台\n对在Viber上有营销需求的用户提供快速获客渠道以及账号支持\n协议拉群：支持各国拉群业务，速度稳定，风控响应及时；\n协议群发：支持各国发送业务，精准触达、到达进线稳定；\n平台账号：支持各国频道号、直登号。')
    }).row()
    .back("返回");

// 注册设置菜单到主菜单。
menu.register(services);
menu.register(channel);
menu.register(products);

// 使其具有互动性。
bot.use(menu);

// 处理 "delete_message" 回调查询
bot.callbackQuery("delete_message", async (ctx) => {
    try {
        if (ctx.callbackQuery.message?.message_id) {
            await ctx.deleteMessage(ctx.message);
            await ctx.answerCallbackQuery();
        } else {
            console.error("撤回消息失败: message_id 为 undefined");
            await ctx.answerCallbackQuery({ text: "撤回失败：消息ID丢失！", show_alert: true });
        }
    } catch (error) {
        console.error("撤回消息失败:", error);
        await ctx.answerCallbackQuery({ text: "撤回消息失败！", show_alert: true });
    }
});

//处理start
bot.command("start", async (ctx) => {
    console.log(`触发start`);
    const userId = ctx.from?.id;
    const username = ctx.from?.username;
    const firstName = ctx.from?.first_name;
    const lastName = ctx.from?.last_name;

    if (userId) {
        // 将用户信息存储到 Deno KV 数据库
        await kv.set(["users", userId], {
            username: username,
            firstName: firstName,
            lastName: lastName,
            lastInteraction: new Date().toISOString(), // 记录最后一次交互时间
        });
        console.log(`用户 ${userId} (${username || '未知'}) 信息已保存。`);
    }
    
  //发送产品图
  await ctx.replyWithPhoto("https://ibb.co/kVWrtsrB")
  // 发送菜单。
  await ctx.reply("您好,这里是Dolphin客服机器人，可以点击下方按钮跳转对应业务。\nDolphin全体员工向您致以最诚挚的新春祝福，祝愿各位老板2025年团队愈加壮大、业绩蒸蒸日上！", { reply_markup: menu });
//photo(media: string | InputFile, options: InputMediaOptions<InputMediaPhoto>): InputMediaPhoto; 
});

//处理command1，即start
bot.command("command1", async (ctx) => {
    await ctx.reply("您好,这里是Dolphin客服机器人，可以点击下方按钮跳转对应业务。\nDolphin全体员工向您致以最诚挚的新春祝福，祝愿各位老板2025年团队愈加壮大、业绩蒸蒸日上！", { reply_markup: menu })
});

//关键词回复
bot.hears(/[TG飞机WS协议直登筛选过滤云控]/, async (ctx) => {
    await ctx.reply("请联系客服注册平台账号",{reply_markup: services})
});

// 处理其他的消息。
bot.on("message", async (ctx) => {
   await ctx.reply("请联系客服",{reply_markup: services})
});

Deno.addSignalListener("SIGINT", () => bot.stop());
Deno.addSignalListener("SIGTERM", () => bot.stop());

//处理 /users 路径，返回所有用户数据
async function handleUsersRequest(req: Request): Promise<Response> {
    const users: any[] = [];
    try {
        for await (const entry of kv.list({ prefix: ["users"] })) {
            users.push(entry.value);
        }
        return new Response(JSON.stringify(users), {
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }, // 添加 CORS 头
        });
    } catch (error) {
        console.error("从 Deno KV 获取用户数据失败:", error);
        return new Response(JSON.stringify({ error: "无法获取用户数据" }), {
            status: 500,
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        });
    }
}

Deno.serve(async (req) => {
    const url = new URL(req.url);

    // Telegram webhook 路由
    if (req.method == "POST" && url.pathname.slice(1) == bot.token) {
        try {
            return await handleUpdate(req);
        } catch (err) {
            console.error(err);
            return new Response("Webhook Error", { status: 500 });
        }
    }

    // 新增：用户数据 API 路由
    if (req.method == "GET" && url.pathname == "/users") {
        return await handleUsersRequest(req);
    }

    // 默认返回一个空响应或 404
    return new Response("Not Found", { status: 404 });
});