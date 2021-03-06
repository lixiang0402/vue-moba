module.exports = app => {
    const express = require("express")
    const router = express.Router({
        mergeParams: true
    })
    const Ads = require("../../models/Ad")
    const Category = require("../../models/Category")
    const Article = require("../../models/Article")
    const Hero = require("../../models/Hero")
    const Item = require("../../models/Item")
    const Rune = require("../../models/Rune")
    // 获取首页轮播图
    router.get("/swiper", async (req, res) => {
        const data = await Ads.findOne({ name: "王者荣耀H5轮播图" })
        res.send(data)
    })
    // 初始化新闻数据
    router.get("/news/init", async (req, res) => {
        const news_title = ["峡谷端午过节指南", "云中君源·梦皮肤海报投票结果公布", "UI改造日志丨局内外交流功能优化：观战中好友也可预约！", "策划有话说丨聊聊荣耀战力计算规则的优化", "寻找“峡谷参谋”丨来线下玩家交流活动，见策划&amp;大神主播，赢专属局内称号", "6月22日体验服不停机更新公告", "6月20日体验服停机更新公告", "6月24日体验服停机更新公告", "6月19日体验服停机更新公告", "更新机制优化版本相关异常说明", "恭喜TS夺得2020年KPL春季赛总冠军，多重福利来袭", "应援KPL春决得好礼，上官婉儿-天狼绘梦者即将开售", "【破浪前行吧英雄们】活动开启公告", "参与活动免费解锁KPL限定皮肤个人专属购买6折特权", "新英雄蒙恬上架，多重好礼等你解锁", "无惧挑战向阳而生，TS冠军之夜今日18:00惊喜来袭", "虎牙明星主播踢馆名校战队，峡谷高材生与学霸的荣耀对决", "2020年KPL春季赛常规赛最佳阵容及最佳选手评选方式公布", "2020年KPL春季赛季后赛赛程赛制公布，5月28日16:00热血开战", "【原创内容大赛音乐比赛】优秀作品合集（二）"]
        // 找新闻分类
        const parent = await Category.findOne({ name: "新闻资讯" })
        const newsCategory = await Category.find().where({ parent }).lean()
        const news = news_title.map(title => {
            // 随机数组
            const categorys = newsCategory.slice(0).sort((a, b) => Math.random() - 0.5)
            return {
                title,
                categories: categorys.slice(0, 2)
            }
        })
        // 初始化数据
        // await Article.deleteMany({})
        // await Article.insertMany(news)
        res.send(news)
    })
    // 获取新闻资讯列表
    router.get("/news/list", async (req, res) => {
        const parent = await Category.findOne({ name: "新闻资讯" })
        const cats = await Category.aggregate([
            { $match: { parent: parent._id } },
            {
                $lookup: {
                    from: "articles",
                    localField: "_id",
                    foreignField: "categories",
                    as: "newsList"
                }
            },
            {
                $addFields: {
                    newsList: { $slice: ["$newsList", 5] }
                }
            }
        ])
        const subCats = cats.map(v => v._id)
        cats.unshift({
            name: "热门",
            newsList: await Article.find().where({
                categories: { $in: subCats }
            }).populate('categories').limit(5).lean()
        })
        cats.map(cat => {
            cat.newsList.map(news => {
                news.categoryName = (cat.name === "热门") ? news.categories[0].name : cat.name
                return news
            })
            return cat
        })
        res.send(cats)
    })
    // 获取新闻详情
    router.get("/article/:id", async (req, res) => {
        const id = req.params.id
        const data = await Article.findById(id).lean()
        const parent = await Category.findOne({ name: "新闻资讯" })
        const catsD = await Category.aggregate([
            { $match: { parent: parent._id } },
        ])
        const cats = catsD.map(r => r._id)
        // data.releted = await Article.find().where({
        //     categories: { $in: cats }
        // }).limit(2)
        let arr = await Article.find().where({ categories: { $in: cats } })
        let newarr = arr.filter(r => r._id != id)
        newarr = newarr.sort(function() { return Math.random() > 0.5 ? -1 : 1; });
        data.releted = newarr.slice(0, 2)
        res.send(data)
    })
    // 初始化英雄数据
    router.get("/heroes/init", async (req, res) => {
        await Hero.deleteMany({})
        const defaultData = [{
                name: "战士",
                children: [
                    { "name": "赵云", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/107/107.jpg" },
                    { "name": "墨子", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/108/108.jpg" },
                    { "name": "钟无艳", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg" },
                    { "name": "吕布", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg" },
                    { "name": "夏侯惇", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg" },
                    { "name": "曹操", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/128/128.jpg" },
                    { "name": "典韦", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/129/129.jpg" },
                    { "name": "宫本武藏", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/130/130.jpg" },
                    { "name": "达摩", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg" },
                    { "name": "老夫子", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/139/139.jpg" },
                    { "name": "关羽", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/140/140.jpg" },
                    { "name": "程咬金", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/144/144.jpg" },
                    { "name": "露娜", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/146/146.jpg" },
                    { "name": "花木兰", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/154/154.jpg" },
                    { "name": "橘右京", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/163/163.jpg" },
                    { "name": "亚瑟", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg" },
                    { "name": "孙悟空", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg" },
                    { "name": "刘备", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/170/170.jpg" },
                    { "name": "钟馗", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/175/175.jpg" },
                    { "name": "杨戬", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/178/178.jpg" },
                    { "name": "雅典娜", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/183/183.jpg" },
                    { "name": "哪吒", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/180/180.jpg" },
                    { "name": "铠", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg" },
                    { "name": "苏烈", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg" },
                    { "name": "裴擒虎", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/502/502.jpg" },
                    { "name": "狂铁", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/503/503.jpg" },
                    { "name": "孙策", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg" },
                    { "name": "李信", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/507/507.jpg" },
                    { "name": "盘古", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/529/529.jpg" },
                    { "name": "云中君", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/506/506.jpg" },
                    { "name": "曜", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/522/522.jpg" },
                    { "name": "马超", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/518/518.jpg" },
                    { "name": "蒙恬", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/527/527.jpg" }
                ]
            },
            {
                name: "法师",
                children: [
                    { "name": "小乔", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/106/106.jpg" },
                    { "name": "墨子", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/108/108.jpg" }, { "name": "妲己", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/109/109.jpg" }, { "name": "嬴政", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/110/110.jpg" }, { "name": "高渐离", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/115/115.jpg" }, { "name": "孙膑", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/118/118.jpg" }, { "name": "扁鹊", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/119/119.jpg" }, { "name": "芈月", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg" }, { "name": "周瑜", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/124/124.jpg" }, { "name": "甄姬", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/127/127.jpg" }, { "name": "武则天", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/136/136.jpg" }, { "name": "貂蝉", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/141/141.jpg" }, { "name": "安琪拉", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/142/142.jpg" }, { "name": "露娜", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/146/146.jpg" }, { "name": "姜子牙", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/148/148.jpg" }, { "name": "王昭君", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/152/152.jpg" }, { "name": "张良", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/156/156.jpg" }, { "name": "不知火舞", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/157/157.jpg" }, { "name": "钟馗", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/175/175.jpg" }, { "name": "诸葛亮", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/190/190.jpg" }, { "name": "干将莫邪", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/182/182.jpg" }, { "name": "女娲", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/179/179.jpg" }, { "name": "杨玉环", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/176/176.jpg" }, { "name": "弈星", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/197/197.jpg" }, { "name": "米莱狄", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/504/504.jpg" }, { "name": "司马懿", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/137/137.jpg" }, { "name": "沈梦溪", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/312/312.jpg" }, { "name": "上官婉儿", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/513/513.jpg" }, { "name": "嫦娥", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg" }, { "name": "西施", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/523/523.jpg" }
                ]
            }, {
                name: "坦克",
                children: [{ "name": "廉颇", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/105/105.jpg" }, { "name": "庄周", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg" }, { "name": "刘禅", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/114/114.jpg" }, { "name": "钟无艳", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg" }, { "name": "白起", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/120/120.jpg" }, { "name": "芈月", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg" }, { "name": "吕布", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg" }, { "name": "夏侯惇", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg" }, { "name": "达摩", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg" }, { "name": "项羽", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/135/135.jpg" }, { "name": "程咬金", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/144/144.jpg" }, { "name": "刘邦", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/149/149.jpg" }, { "name": "亚瑟", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg" }, { "name": "牛魔", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/168/168.jpg" }, { "name": "张飞", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/171/171.jpg" }, { "name": "太乙真人", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/186/186.jpg" }, { "name": "东皇太一", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/187/187.jpg" }, { "name": "铠", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg" }, { "name": "苏烈", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg" }, { "name": "梦奇", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/198/198.jpg" }, { "name": "孙策", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg" }, { "name": "嫦娥", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg" }, { "name": "猪八戒", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/511/511.jpg" }]
            },
            {
                name: "刺客",
                children: [{ "name": "赵云", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/107/107.jpg" }, { "name": "阿轲", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/116/116.jpg" }, { "name": "李白", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/131/131.jpg" }, { "name": "貂蝉", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/141/141.jpg" }, { "name": "韩信", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/150/150.jpg" }, { "name": "兰陵王", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/153/153.jpg" }, { "name": "花木兰", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/154/154.jpg" }, { "name": "不知火舞", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/157/157.jpg" }, { "name": "娜可露露", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/162/162.jpg" }, { "name": "橘右京", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/163/163.jpg" }, { "name": "孙悟空", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg" }, { "name": "百里守约", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/196/196.jpg" }, { "name": "百里玄策", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/195/195.jpg" }, { "name": "裴擒虎", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/502/502.jpg" }, { "name": "元歌", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/125/125.jpg" }, { "name": "司马懿", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/137/137.jpg" }, { "name": "上官婉儿", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/513/513.jpg" }, { "name": "云中君", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/506/506.jpg" }, { "name": "马超", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/518/518.jpg" }, { "name": "镜", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/531/531.jpg" }]
            },
            {
                name: "射手",
                children: [{ "name": "孙尚香", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/111/111.jpg" }, { "name": "鲁班七号", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg" }, { "name": "马可波罗", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/132/132.jpg" }, { "name": "狄仁杰", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/133/133.jpg" }, { "name": "后羿", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg" }, { "name": "李元芳", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/173/173.jpg" }, { "name": "虞姬", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/174/174.jpg" }, { "name": "成吉思汗", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/177/177.jpg" }, { "name": "黄忠", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/192/192.jpg" }, { "name": "百里守约", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/196/196.jpg" }, { "name": "公孙离", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/199/199.jpg" }, { "name": "伽罗", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/508/508.jpg" }, { "name": "蒙犽", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/524/524.jpg" }]
            }, {
                name: "辅助",
                children: [{ "name": "庄周", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg" }, { "name": "刘禅", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/114/114.jpg" }, { "name": "孙膑", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/118/118.jpg" }, { "name": "姜子牙", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/148/148.jpg" }, { "name": "牛魔", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/168/168.jpg" }, { "name": "张飞", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/171/171.jpg" }, { "name": "蔡文姬", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/184/184.jpg" }, { "name": "太乙真人", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/186/186.jpg" }, { "name": "大乔", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/191/191.jpg" }, { "name": "鬼谷子", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/189/189.jpg" }, { "name": "明世隐", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/501/501.jpg" }, { "name": "杨玉环", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/176/176.jpg" }, { "name": "盾山", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/509/509.jpg" }, { "name": "瑶", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/505/505.jpg" }, { "name": "鲁班大师", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/525/525.jpg" }]
            }

        ]
        // 循环英雄列表
        for (let item of defaultData) {
            const categories = await Category.findOne({
                name: item.name
            })
            // 给循环出来的每个英雄添加 分类(战士,射手==)
            item.children = item.children.map(r => {
                r.categories = [categories]
                return r
            })
            await Hero.insertMany(item.children)
        }
        res.send(defaultData)
    })
    // 获取英雄列表
    router.get("/heroes/list", async (req, res) => {
        const parent = await Category.findOne({ name: "英雄分类" })
        const cats = await Category.aggregate([
            { $match: { parent: parent._id } },
            {
                $lookup: {
                    from: "heroes",
                    localField: "_id",
                    foreignField: "categories",
                    as: "heroesList"
                }
            },
        ])
        const subCats = cats.map(v => v._id)
        cats.unshift({
            name: "热门",
            heroesList: await Hero.find().where({
                categories: { $in: subCats }
            }).limit(10).lean()
        })
        res.send(cats)
    })
    // 获取英雄详情
    router.get("/heroes/:id", async (req, res) => {
        const id = req.params.id;
        const hero = await Hero.findById(id).populate("categories items1 items2 runes partners.hero naturalEnemys.hero restrainOneselfs.hero")
        res.send(hero)
    })
    app.use("/web/api", router)
}