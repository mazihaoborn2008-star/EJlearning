// Phase 3.5E.1A editorial source. These examples are new curated drafts, not Dynamic AI output.
// Blocks are grammar id followed by sentence=>Chinese meaning rows.
const parse=raw=>Object.fromEntries(raw.trim().split(/\n\s*\n/).map(block=>{const [id,...rows]=block.split('\n');return [id,rows.map(row=>{const split=row.indexOf('=>');if(split<1)throw Error(`Invalid row for ${id}: ${row}`);return {text:row.slice(0,split),translation_zh:row.slice(split+2)};})];}));

export const englishExamples=parse(String.raw`
en-simple-present
She walks to work every day.=>她每天步行上班。
We usually eat dinner at seven.=>我们通常七点吃晚饭。
My brother does not drink coffee.=>我哥哥不喝咖啡。
The shop closes at six.=>这家店六点关门。
Do they live near the station?=>他们住在车站附近吗？
Water boils at one hundred degrees Celsius.=>水在一百摄氏度时沸腾。

en-be-adjective
The soup is hot.=>这汤很烫。
I am not busy this afternoon.=>我今天下午不忙。
Are you ready to leave?=>你准备好出发了吗？
Her parents are teachers.=>她的父母是老师。
The keys are on the table.=>钥匙在桌上。
This room was quiet last night.=>这个房间昨晚很安静。

en-present-continuous
She is waiting outside.=>她正在外面等。
We are not using the meeting room.=>我们现在没有使用会议室。
Are you looking for the bus stop?=>你在找公交车站吗？
The children are sleeping now.=>孩子们现在正在睡觉。
I am staying with a friend this week.=>我这周暂住在朋友家。
Why is the printer making that noise?=>打印机为什么在发出那种声音？

en-do-question
Do you need a receipt?=>你需要收据吗？
Does this bus stop at the airport?=>这辆公交车在机场停吗？
Do your classes start at nine?=>你的课九点开始吗？
Does Anna work on Saturdays?=>安娜星期六上班吗？
Do we have enough time?=>我们有足够的时间吗？
Does the price include breakfast?=>这个价格包含早餐吗？

en-there-is
There is a pharmacy across the street.=>街对面有一家药房。
There are two clean cups in the cupboard.=>橱柜里有两个干净的杯子。
There is not enough milk for breakfast.=>早餐的牛奶不够。
Is there a lift in this building?=>这栋楼里有电梯吗？
Are there any seats near the window?=>窗边还有座位吗？
There was a delay on the train line this morning.=>今天早上这条火车线路有延误。

en-have-possession
We have a spare key.=>我们有一把备用钥匙。
He has a new phone.=>他有一部新手机。
I do not have any cash with me.=>我身上没有现金。
Do you have a reservation?=>你有预订吗？
She has a sore throat today.=>她今天喉咙痛。
The apartment has a small balcony.=>这套公寓有一个小阳台。

en-wh-question
What time does the library open?=>图书馆几点开门？
Where can I charge my phone?=>我可以在哪里给手机充电？
Why did you change the plan?=>你为什么改变了计划？
How much does this ticket cost?=>这张票多少钱？
When are they arriving?=>他们什么时候到？
Which train goes to the city centre?=>哪趟火车去市中心？

en-imperative
Turn left at the next corner.=>在下一个路口左转。
Please keep the receipt.=>请保留收据。
Do not touch that pan; it is hot.=>不要碰那个锅，它很烫。
Take this medicine after dinner.=>晚饭后服用这种药。
Let me know when you arrive.=>你到达时告诉我一声。
Check the address before you send the form.=>发送表格前请核对地址。

en-want-to
We want to leave before the traffic gets busy.=>我们想在交通繁忙前离开。
She does not want to eat outside tonight.=>她今晚不想在外面吃。
Do you want to sit by the window?=>你想坐在窗边吗？
I want to learn how to cook this dish.=>我想学会做这道菜。
They wanted to change their booking.=>他们想更改预订。
What do you want to do this weekend?=>这个周末你想做什么？

en-possessive
Your bag is under the seat.=>你的包在座位下面。
His appointment is on Thursday.=>他的预约在星期四。
Her train leaves at eight.=>她的火车八点出发。
Our room is on the third floor.=>我们的房间在三楼。
Their children go to this school.=>他们的孩子在这所学校上学。
Is this your card or mine?=>这是你的卡还是我的？

en-greeting
Good morning. How are you?=>早上好。你好吗？
Nice to meet you.=>很高兴认识你。
Thank you for your help.=>谢谢你的帮助。
You are welcome.=>不客气。
Take care on your way home.=>回家路上保重。
Have a good weekend.=>周末愉快。

en-noun-please
A table for two, please.=>请给我们一张两人桌。
The vegetarian option, please.=>请给我素食那款。
No sugar, thanks.=>不要糖，谢谢。
Not today, thanks.=>今天不用了，谢谢。
One more minute, please.=>请再等一分钟。
The receipt as well, please.=>也请给我收据。

en-simple-past
We arrived ten minutes early.=>我们提前十分钟到了。
She did not feel well yesterday.=>她昨天感觉不舒服。
Did you call the hotel?=>你给酒店打电话了吗？
I left my umbrella on the bus.=>我把雨伞落在公交车上了。
They changed the meeting time last week.=>他们上周更改了会议时间。
What did the doctor say?=>医生说了什么？

en-plan-to
We plan to move next month.=>我们计划下个月搬家。
I do not plan to drive in the city.=>我不打算在市区开车。
Do you plan to stay for dinner?=>你打算留下来吃晚饭吗？
She plans to apply for the course.=>她计划申请这门课程。
They planned to meet at the station.=>他们原计划在车站见面。
When do you plan to finish the report?=>你计划什么时候完成报告？

en-can-request
Can you open the window?=>你能打开窗户吗？
Can you show me where the lift is?=>你能告诉我电梯在哪里吗？
Can you wait here for a moment?=>你能在这里等一会儿吗？
Can you speak a little more slowly?=>你能说慢一点吗？
Can you check this address for me?=>你能帮我核对这个地址吗？
Can you call me when you arrive?=>你到的时候能给我打电话吗？

en-can-ability
My daughter can swim.=>我女儿会游泳。
I cannot hear you clearly.=>我听不清你说话。
Can he use this software?=>他会使用这个软件吗？
We can finish the work today.=>我们今天能完成这项工作。
This card can be used overseas.=>这张卡可以在海外使用。
How many people can the room hold?=>这个房间能容纳多少人？

en-could-request
Could you repeat the last part?=>你能重复一下最后一部分吗？
Could you move your bag, please?=>请你把包挪一下好吗？
Could you tell me the total price?=>你能告诉我总价吗？
Could you send the file by Friday?=>你能在星期五前发送文件吗？
Could you help me change this booking?=>你能帮我更改这个预订吗？
Could you write that name down for me?=>你能帮我写下那个名字吗？

en-going-to
We are going to visit my parents on Sunday.=>我们打算星期天去看望我的父母。
I am not going to buy it today.=>我今天不打算买它。
Are you going to take the train?=>你打算坐火车吗？
Look at those clouds; it is going to rain.=>看那些云，要下雨了。
She is going to start a new job next week.=>她下周要开始一份新工作。
What are you going to cook tonight?=>你今晚打算做什么？

en-will
I will carry that bag for you.=>我来帮你拿那个包。
We will not be late.=>我们不会迟到。
Will you be home this evening?=>你今晚会在家吗？
The meeting will start at ten.=>会议将在十点开始。
I think the weather will improve tomorrow.=>我想明天天气会好转。
Do not worry; I will call the landlord.=>别担心，我会给房东打电话。

en-comparative
The bus is cheaper than the train.=>公交车比火车便宜。
This route is not faster than the old one.=>这条路线不比旧路线快。
Is the blue jacket warmer than the black one?=>蓝色夹克比黑色夹克暖和吗？
My new office is closer to home.=>我的新办公室离家更近。
Today is busier than yesterday.=>今天比昨天更忙。
Which option is more convenient for you?=>哪个选项对你更方便？

en-would-like
I would like a glass of water, please.=>我想要一杯水。
We would like to check in now.=>我们想现在办理入住。
Would you like some more rice?=>你想再来一点米饭吗？
I would not like to discuss that at work.=>我不想在工作场合讨论那件事。
She would prefer a seat near the door.=>她更想要靠门的座位。
Would they like us to call a taxi?=>他们希望我们叫出租车吗？

en-let-us
Let's check the timetable first.=>我们先查看时刻表吧。
Let's not make a decision yet.=>我们先别作决定。
Let's meet near the main entrance.=>我们在正门附近见吧。
Let's ask the staff for help.=>我们请工作人员帮忙吧。
Let's cook at home tonight.=>我们今晚在家做饭吧。
Where shall we go? Let's try the new café.=>我们去哪里？去试试那家新咖啡馆吧。

en-before-after
Wash your hands before you cook.=>做饭前要洗手。
We can talk after the meeting ends.=>会议结束后我们可以谈谈。
Do not leave before the doctor sees you.=>医生看过你之前不要离开。
After she finishes work, she takes the bus home.=>她下班后坐公交车回家。
Please pay before you collect the order.=>取餐前请付款。
I checked the address after you called me.=>你给我打电话后，我核对了地址。

en-enjoy-ing
She enjoys reading on the train.=>她喜欢在火车上看书。
We do not enjoy waiting in long lines.=>我们不喜欢排长队等候。
Do you enjoy cooking for friends?=>你喜欢给朋友做饭吗？
He enjoyed working with the new team.=>他很享受和新团队一起工作。
I enjoy learning languages through conversation.=>我喜欢通过对话学习语言。
What do you enjoy doing after work?=>你下班后喜欢做什么？

en-take-time
It takes five minutes to walk to the station.=>步行到车站需要五分钟。
It does not take long to complete the form.=>填写这张表格花不了很久。
How long does it take to cook this rice?=>煮这种米需要多长时间？
It took us an hour to find the hotel.=>我们花了一个小时才找到酒店。
It will take two days to repair the phone.=>修好这部手机需要两天。
Does it take longer to travel during rush hour?=>高峰期出行会花更长时间吗？

en-shall-suggestion
Shall we order now?=>我们现在点餐好吗？
Shall we take a short break?=>我们休息一会儿好吗？
Shall we leave now rather than wait until tomorrow?=>我们现在走，不等到明天好吗？
Where shall we meet after class?=>下课后我们在哪里见面？
Shall we ask for a different room?=>我们要求换一个房间好吗？
What shall we do if the train is late?=>如果火车晚点，我们怎么办？

en-ellipsis
Are you ready? Not quite.=>你准备好了吗？还没有完全准备好。
Would you like some tea? Yes, please.=>你想喝点茶吗？好的，谢谢。
Did she call? Not yet.=>她打电话了吗？还没有。
Who needs a receipt? I do.=>谁需要收据？我需要。
Can you come on Friday? I think so.=>你星期五能来吗？我想可以。
Is this seat free? It looks like it.=>这个座位空着吗？看起来是的。

en-may
The train may arrive a few minutes late.=>火车可能会晚到几分钟。
She may not have enough time today.=>她今天可能没有足够的时间。
The manager may join us later.=>经理稍后可能会加入我们。
We may need to change the schedule.=>我们可能需要更改日程。
This medicine may make you sleepy.=>这种药可能会让你犯困。
There may be a fee for changing the booking.=>更改预订可能会收费。

en-might
I might work from home tomorrow.=>我明天可能在家工作。
They might not accept cash.=>他们可能不收现金。
Do you think the road might be closed because of the snow?=>你觉得这条路可能会因为下雪而关闭吗？
We might need a larger table.=>我们可能需要一张更大的桌子。
She said she might arrive after eight.=>她说她可能八点以后到。
You might want to keep a copy of the form.=>你或许最好留一份表格副本。

en-indirect-question
Could you tell me when the shop closes?=>你能告诉我商店几点关门吗？
Do you know whether this seat is free?=>你知道这个座位是否空着吗？
I cannot remember where I put the key.=>我想不起把钥匙放在哪里了。
Can you explain why the price changed?=>你能解释价格为什么变了吗？
She asked how long the repair would take.=>她问维修需要多长时间。
I wonder which bus goes to the hospital.=>我想知道哪辆公交车去医院。

en-since-for
We have lived here for three years.=>我们在这里住了三年。
She has not eaten since breakfast.=>她从早餐后一直没吃东西。
How long have you worked at this school?=>你在这所学校工作多久了？
I have known him since university.=>我从大学起就认识他。
The lift has been out of order for two days.=>电梯已经坏了两天。
Have you been waiting since nine o'clock?=>你从九点起一直在等吗？

en-as-long-as
You can borrow the car as long as you drive carefully.=>只要你小心驾驶，就可以借这辆车。
I do not mind waiting as long as you let me know.=>只要你告诉我，我不介意等。
Can we change the booking as long as we call today?=>只要今天打电话，我们就能改预订吗？
As long as the pain does not get worse, you can rest at home.=>只要疼痛没有加重，你可以在家休息。
The plan will work as long as everyone arrives on time.=>只要大家准时到，这个计划就可行。
You may stay here as long as you keep the door closed.=>只要你把门关着，就可以待在这里。

en-would-rather
I would rather take the train than drive.=>我宁愿坐火车也不愿开车。
She would rather not talk about it now.=>她现在宁愿不谈这件事。
Would you rather eat inside or outside?=>你更愿意在室内还是室外吃？
We would rather wait for a quieter room.=>我们宁愿等一个更安静的房间。
He said he would rather leave early.=>他说他宁愿早点离开。
I would rather you called before visiting.=>我希望你来访前先打电话。

en-what-if
What if the shop is already closed?=>如果商店已经关门了怎么办？
What if we cannot find a taxi?=>如果我们找不到出租车怎么办？
What if she does not agree with the plan?=>如果她不同意这个计划怎么办？
What if I miss the last train?=>如果我错过末班车怎么办？
What if the medicine makes me feel worse?=>如果这种药让我感觉更糟怎么办？
What if we moved the meeting to Friday?=>如果我们把会议改到星期五怎么样？

en-ever-perfect
Have you ever worked from home?=>你曾经在家工作过吗？
Has she ever tried Japanese food?=>她吃过日本料理吗？
I have never missed a flight.=>我从未误过航班。
Have they ever stayed at this hotel?=>他们住过这家酒店吗？
What is the best book you have ever read?=>你读过的最好的书是什么？
He has only ever used this card online.=>他一直只在网上用过这张卡。
`);

export const japaneseExamples=parse(String.raw`
ja-plain-nonpast
毎朝、六時に起きる。=>每天早上六点起床。
今日は家で仕事をする。=>今天在家工作。
この電車は空港まで行く。=>这趟电车开往机场。
明日は学校に行かない。=>明天不去学校。
週末は友達と料理を作る。=>周末和朋友一起做饭。
何時に家を出る？=>几点出门？
来月、新しい仕事を始める。=>下个月开始新工作。

ja-copula
こちらが受付です。=>这里是接待处。
今日は休みではありません。=>今天不是休息日。
この部屋は静かですか。=>这个房间安静吗？
予約は明日の三時です。=>预约是明天下午三点。
妹は大学生です。=>妹妹是大学生。
駅はあの建物の隣です。=>车站在那栋楼旁边。
昨日の担当は田中さんでした。=>昨天的负责人是田中。

ja-wa-topic
私は毎朝コーヒーを飲みます。=>我每天早上喝咖啡。
この店は日曜日も開いています。=>这家店星期天也营业。
会議は十時からです。=>会议从十点开始。
田中さんは今日は来ません。=>田中今天不来。
この薬は食後に飲んでください。=>这种药请在饭后服用。
週末は何をしますか。=>周末做什么？
値段は高いですが、品質はいいです。=>价格虽高，但质量很好。

ja-ga-existence
机の上に鍵があります。=>桌上有钥匙。
公園に子どもがいます。=>公园里有孩子。
この近くに薬局はありません。=>这附近没有药房。
部屋に冷蔵庫がありますか。=>房间里有冰箱吗？
駅の前に新しい店ができました。=>车站前开了一家新店。
会議室には誰もいません。=>会议室里没有人。
明日の午後、予約があります。=>明天下午有预约。

ja-wo-object
毎朝、新聞を読みます。=>我每天早上看报纸。
駅で友達を待っています。=>我正在车站等朋友。
朝はコーヒーを飲みません。=>早上不喝咖啡。
この書類を確認しましたか。=>你确认这份文件了吗？
帰る前に窓を閉めてください。=>回去前请关窗。
週末に部屋を掃除します。=>周末打扫房间。
どの電車を使いますか。=>你坐哪趟电车？

ja-ni-time
会議は九時に始まります。=>会议九点开始。
私は毎晩十一時に寝ます。=>我每天晚上十一点睡觉。
日曜日には仕事に行きません。=>星期天不去上班。
何時に駅に着きますか。=>几点到车站？
来週の月曜日に病院へ行きます。=>下周一去医院。
昼休みに友達と話しました。=>午休时和朋友聊了天。
三時に受付で会いましょう。=>三点在接待处见吧。

ja-de-place
図書館で勉強します。=>在图书馆学习。
家で昼ご飯を食べました。=>在家吃了午饭。
この部屋では電話を使わないでください。=>请不要在这个房间打电话。
どこで切符を買えますか。=>在哪里可以买票？
駅の前で友達を待っています。=>正在车站前等朋友。
会議は二階の部屋で行います。=>会议在二楼的房间举行。
週末は公園で走ります。=>周末在公园跑步。

ja-no-possession
これは私の傘です。=>这是我的伞。
田中さんの電話番号を知っていますか。=>你知道田中的电话号码吗？
駅の入口はあちらです。=>车站入口在那边。
この店の料理は辛くありません。=>这家店的菜不辣。
友達の家に泊まりました。=>我住在朋友家了。
明日の予定を確認しましょう。=>我们确认一下明天的计划吧。
会社の近くに小さな店があります。=>公司附近有一家小店。

ja-ka-question
この席は空いていますか。=>这个座位空着吗？
カードで払えますか。=>可以刷卡付款吗？
明日の午後は大丈夫ですか。=>明天下午方便吗？
駅までどのくらいかかりますか。=>到车站需要多久？
何かアレルギーがありますか。=>你有什么过敏吗？
もう予約を変更しましたか。=>已经更改预约了吗？
この席に座りますか。=>你坐这个座位吗？

ja-i-adjective
このかばんは軽いです。=>这个包很轻。
今日はあまり寒くないです。=>今天不太冷。
その部屋は広いですか。=>那个房间宽敞吗？
昨日の試験は難しかったです。=>昨天的考试很难。
この料理は辛くありません。=>这道菜不辣。
駅から近い店を探しています。=>我在找离车站近的店。
朝の電車は人が多いです。=>早上的电车人很多。

ja-suki
私は音楽が好きです。=>我喜欢音乐。
弟は辛い食べ物が好きではありません。=>弟弟不喜欢辣的食物。
どんな映画が好きですか。=>你喜欢什么样的电影？
母は料理をするのが好きです。=>妈妈喜欢做饭。
この二つなら、青いほうが好きです。=>这两个里面，我更喜欢蓝色的。
子どもの頃は読書が好きでした。=>小时候我喜欢阅读。
静かな場所は好きですが、暗い部屋は苦手です。=>我喜欢安静的地方，但不喜欢昏暗的房间。

ja-polite-present
毎日、電車で会社へ行きます。=>每天坐电车去公司。
今日は家で休みます。=>今天在家休息。
私は今日はカードを使いません。=>我今天不用银行卡。
何時に仕事が終わりますか。=>工作几点结束？
あとで資料を送ります。=>稍后发送资料。
父は週末によく料理をします。=>爸爸周末常做饭。
来月から日本語を勉強します。=>从下个月开始学日语。

ja-greeting
こんにちは。今日は暑いですね。=>你好。今天很热啊。
初めまして。山田と申します。=>初次见面。我叫山田。
どうもありがとうございます。=>非常感谢。
いいえ、どういたしまして。=>不，不客气。
お先に失礼します。=>我先告辞了。
お疲れさまでした。=>辛苦了。
では、また明日。=>那么，明天见。

ja-plain-past
昨日、駅で友達に会った。=>昨天在车站见到了朋友。
朝ご飯は食べなかった。=>没吃早饭。
もう先生に聞いた？=>已经问老师了吗？
先週、新しい靴を買った。=>上周买了新鞋。
電車が遅れて、会議に間に合わなかった。=>电车晚点，没赶上会议。
週末は家でゆっくり休んだ。=>周末在家好好休息了。
どうして予定を変えたの？=>为什么更改计划？

ja-te-form
窓を開けて、部屋の空気を入れ替えます。=>打开窗户，给房间换气。
駅で切符を買って、電車に乗ります。=>在车站买票，然后坐电车。
ここに名前を書いてください。=>请在这里写名字。
今、昼ご飯を食べています。=>现在正在吃午饭。
この薬を飲んで、少し休みました。=>吃了这种药，然后休息了一会儿。
荷物を持って、こちらへ来てもらえますか。=>能请你拿着行李来这里吗？
朝起きて、まず水を飲みます。=>早上起床后先喝水。

ja-polite-negative
今日は残業しません。=>今天不加班。
この電車は空港へ行きません。=>这趟电车不去机场。
今日は肉を食べません。=>今天不吃肉。
まだ予約していません。=>还没有预约。
週末は車を使いませんでした。=>周末没有用车。
その質問には今は答えません。=>那个问题我现在不回答。
このカードでは支払えません。=>不能用这张卡付款。

ja-polite-past
昨日、病院へ行きました。=>昨天去了医院。
会議は予定どおり始まりました。=>会议按计划开始了。
朝は何も食べませんでした。=>早上什么也没吃。
もう書類を送りましたか。=>已经发送文件了吗？
駅で財布を落としました。=>我在车站丢了钱包。
先週、新しい仕事を始めました。=>上周开始了新工作。
店員さんが丁寧に説明しました。=>店员认真地进行了说明。

ja-te-kudasai
荷物はここに置いてください。=>请把行李放在这里。
次の角を右に曲がってください。=>请在下一个路口右转。
少しゆっくり話してください。=>请说慢一点。
ここでは写真を撮らないでください。=>请不要在这里拍照。
名前と電話番号を書いてください。=>请写下姓名和电话号码。
準備ができたら知らせてください。=>准备好后请告诉我。
わからない言葉は先生に聞いてください。=>不懂的词请问老师。

ja-tai
今日は早く帰りたいです。=>今天想早点回去。
辛い物は食べたくありません。=>不想吃辣的东西。
週末は何をしたいですか。=>周末想做什么？
いつか京都に行きたいと思っています。=>我想有一天去京都。
子どもの頃は医者になりたかったです。=>小时候想当医生。
もう少し詳しく話を聞きたいです。=>我想再详细听一听。
どちらの部屋に泊まりたいですか。=>你想住哪个房间？

ja-nai
今日は車を使わない。=>今天不开车。
この店では肉を買わない。=>不在这家店买肉。
まだ答えがわからない。=>还不知道答案。
明日は会社に行かない？=>明天不去公司吗？
忘れないように、予定を書いておく。=>为了不忘记，先把计划写下来。
時間がないから、朝ご飯は作らない。=>因为没时间，不做早饭。
この薬を飲まないで。=>不要吃这种药。

ja-potential
私は少し日本語が話せます。=>我会说一点日语。
今日は車を運転できません。=>今天不能开车。
この部屋でWi-Fiが使えますか。=>这个房间可以使用无线网络吗？
駅まで歩いて行けます。=>可以步行到车站。
昨日はよく眠れませんでした。=>昨天没能睡好。
何時まで予約を変更できますか。=>预约最晚可以更改到几点？
この窓は簡単に開けられます。=>这扇窗很容易打开。

ja-te-mo-ii
ここに座ってもいいですか。=>可以坐在这里吗？
この部屋では靴を脱がなくてもいいです。=>在这个房间不用脱鞋也可以。
今日は少し早く帰ってもいいですよ。=>今天可以早点回去。
このカードを使ってもいいですか。=>可以用这张卡吗？
わからなければ、先生に聞いてもいいです。=>不懂的话可以问老师。
窓を開けてもいいですか。=>可以开窗吗？
予約はあとで変更してもいいでしょうか。=>预约可以稍后更改吗？

ja-mashou
少し休みましょう。=>休息一下吧。
今日は外で食べましょう。=>今天在外面吃吧。
まだ決めないでおきましょう。=>我们先不要决定吧。
駅の入口で会いましょう。=>在车站入口见吧。
わからない点を一緒に確認しましょう。=>一起确认不明白的地方吧。
雨が降る前に帰りましょう。=>趁下雨前回去吧。
次は別の方法を試しましょう。=>下次试试别的方法吧。

ja-masen-ka
一緒に映画を見ませんか。=>一起看电影好吗？
少し休みませんか。=>休息一下好吗？
駅まで歩きませんか。=>一起走到车站好吗？
今度の日曜日に会いませんか。=>下个星期天见面好吗？
この案についてもう一度話しませんか。=>要不要再谈谈这个方案？
窓を開けませんか。=>要不要开窗？
昼ご飯は新しい店で食べませんか。=>午饭去新店吃好吗？

ja-mae-ni
寝る前に薬を飲みます。=>睡觉前吃药。
電車に乗る前に切符を買ってください。=>坐电车前请买票。
出かける前に天気を確認しました。=>出门前确认了天气。
料理をする前に手を洗います。=>做饭前洗手。
会議が始まる前に質問はありますか。=>会议开始前有问题吗？
注文する前に値段を見ましょう。=>点单前先看价格吧。
日本へ来る前に少し日本語を勉強しました。=>来日本前学了一点日语。

ja-kara-after
仕事が終わってから、友達に電話します。=>工作结束后给朋友打电话。
手を洗ってから、料理を始めてください。=>洗手后再开始做饭。
駅に着いてから、連絡しました。=>到车站后联系了对方。
説明を聞いてから決めてもいいですか。=>可以听完说明后再决定吗？
薬を飲んでから、少し眠くなりました。=>吃药后有点困了。
部屋を確認してから、鍵を返します。=>确认房间后归还钥匙。
予約してから店へ行ったほうがいいです。=>最好预约后再去店里。

ja-request-onegai
コーヒーを一つお願いします。=>请给我一杯咖啡。
窓側の席でお願いします。=>请安排靠窗的座位。
砂糖なしでお願いします。=>请不要加糖。
会計をお願いします。=>请结账。
予約の変更をお願いします。=>请帮我更改预约。
もう少し小さいサイズをお願いします。=>请给我再小一点的尺码。
明日の午後でお願いできますか。=>可以安排在明天下午吗？

ja-hodo-approx
駅まで十分ほどかかります。=>到车站大约需要十分钟。
参加者は三十人ほどでした。=>参加者大约有三十人。
この箱には米が五キロほど入っています。=>这个箱子里大约装了五公斤大米。
あと一時間ほど待てますか。=>还能等大约一个小时吗？
週に二回ほど運動します。=>每周大约运动两次。
昼休みは四十分ほどです。=>午休大约四十分钟。
修理には二日ほどかかるそうです。=>听说维修大约需要两天。

ja-dake
今日は水だけ飲みました。=>今天只喝了水。
必要な物だけ買いましょう。=>只买需要的东西吧。
私は説明を聞いただけです。=>我只是听了说明。
この部屋には椅子が一つだけあります。=>这个房间里只有一把椅子。
名前を書くだけで大丈夫です。=>只写名字就可以。
一日だけ予定を延ばせますか。=>可以只把日程延后一天吗？
彼だけが答えを知っています。=>只有他知道答案。

ja-duration
空港まで一時間かかります。=>到机场需要一个小时。
この料理は作るのに三十分かかります。=>做这道菜需要三十分钟。
修理には何日かかりますか。=>维修需要几天？
昨日は帰るのに二時間かかりました。=>昨天回家花了两个小时。
修理にはあまり時間がかかりません。=>维修不太花时间。
手続きはあと十分ほどかかります。=>手续还需要大约十分钟。
混んでいると、もっと時間がかかります。=>拥挤时会花更长时间。

ja-ni-naru
来月、大学生になります。=>下个月就成为大学生了。
夜になると、この道は静かになります。=>到了晚上，这条路会变安静。
部屋がきれいになりました。=>房间变干净了。
会議は午後三時からになります。=>会议改为下午三点开始。
この薬を飲むと眠くなることがあります。=>吃这种药有时会犯困。
練習すれば、もっと上手になります。=>练习的话会变得更熟练。
予定は来週に変更になりました。=>日程改到下周了。

ja-te-iru
今、駅で電車を待っています。=>现在正在车站等电车。
姉は東京に住んでいます。=>姐姐住在东京。
窓が開いています。=>窗户开着。
今日は車を使っていません。=>今天没有在用车。
何を読んでいますか。=>你在读什么？
この店は十年前から営業しています。=>这家店从十年前起一直营业。
父は今、夕食を作っています。=>爸爸现在正在做晚饭。

ja-tsumori
来年、日本へ行くつもりです。=>我打算明年去日本。
今日は外出しないつもりです。=>今天打算不出门。
何時に帰るつもりですか。=>你打算几点回去？
週末に部屋を掃除するつもりでした。=>我原打算周末打扫房间。
そんなことを言うつもりはありませんでした。=>我没有打算说那样的话。
卒業後は働くつもりです。=>毕业后打算工作。
この計画を変えるつもりはありません。=>我不打算改变这个计划。

ja-kamoshirenai
明日は雪になるかもしれません。=>明天可能会下雪。
彼は今日は来ないかもしれない。=>他今天可能不来。
午後は雨が降るかもしれません。=>下午可能会下雨。
この薬は眠くなるかもしれません。=>这种药可能会让人犯困。
予約を変更できるかもしれません。=>预约或许可以更改。
それは誤解だったかもしれない。=>那可能是误会。
駅よりバス停のほうが近いかもしれません。=>公交车站可能比火车站更近。

ja-sou
この料理はおいしそうです。=>这道菜看起来很好吃。
今日は雨が降らなさそうです。=>今天看起来不会下雨。
そのかばんは重そうですか。=>那个包看起来重吗？
電車がすぐ来そうです。=>电车看起来马上要来了。
彼は少し疲れていそうです。=>他看起来有点累。
この仕事は時間がかかりそうです。=>这项工作看起来会花时间。
その店はもう閉まりそうです。=>那家店看起来快关门了。

ja-hou-ga-ii
熱があるなら、今日は休んだほうがいいです。=>如果发烧，今天最好休息。
この道は夜一人で歩かないほうがいいです。=>这条路晚上最好不要一个人走。
先に予約したほうがいいですか。=>最好事先预约吗？
大事な書類はコピーしておいたほうがいいです。=>重要文件最好事先复印。
そんなに心配しないほうがいいですよ。=>最好不要那么担心。
電車よりバスで行ったほうがいいと思います。=>我觉得最好坐公交车去，而不是坐电车。
わからないときは、すぐ聞いたほうがいいです。=>不懂的时候最好马上问。

ja-te-morau
友達に駅まで送ってもらいました。=>朋友送我到了车站。
ここに名前を書いてもらえますか。=>能请你在这里写名字吗？
先生に文章を直してもらいました。=>老师帮我修改了文章。
少し待ってもらえませんか。=>能请你稍等一下吗？
店員さんに別のサイズを持ってきてもらいました。=>店员给我拿来了别的尺码。
誰に手伝ってもらいましたか。=>你请谁帮忙了？
明日の午後に変更してもらえますか。=>能请你改到明天下午吗？

ja-nara
電車で行くなら、この駅で乗り換えてください。=>如果坐电车去，请在这个车站换乘。
辛い物が苦手なら、こちらの料理がおすすめです。=>如果不喜欢辣的，推荐这道菜。
明日が無理なら、金曜日はどうですか。=>如果明天不行，星期五怎么样？
返品するなら、レシートを捨てないでください。=>如果要退货，请不要丢掉收据。
静かな部屋なら、三階にあります。=>如果要安静的房间，三楼有。
田中さんも参加するなら、私も行きます。=>如果田中也参加，我也去。
わからないことがあるなら、今聞いてください。=>如果有不懂的地方，现在请问。

ja-tara
駅に着いたら、電話してください。=>到了车站后请打电话。
雨が降ったら、家で映画を見ましょう。=>如果下雨，就在家看电影吧。
時間がなかったら、明日でも大丈夫です。=>如果没时间，明天也可以。
薬を飲んでも治らなかったら、病院へ行ってください。=>吃药也不好转的话，请去医院。
仕事が終わったら、何をしますか。=>工作结束后做什么？
もっと安かったら、買いたいです。=>如果再便宜一点，我想买。
道に迷ったら、駅員に聞きます。=>如果迷路，就问车站工作人员。

ja-koto-ga-aru
私は北海道へ行ったことがあります。=>我去过北海道。
この料理を食べたことはありません。=>我没吃过这道菜。
一人で海外へ行ったことがありますか。=>你一个人去过国外吗？
電車の中に財布を忘れたことがあります。=>我曾经把钱包忘在电车里。
彼とは前に会ったことがあります。=>我以前见过他。
今までに入院したことがありますか。=>你以前住过院吗？
この店を利用したことがある人はいますか。=>有人用过这家店吗？
`);
