import { useState, useEffect, useRef } from "react";
import { Form, Input, Checkbox, Radio, InputNumber, Button } from "antd";
import { LRCPlayer, createLrcObj } from "../packages/index";

import src from './assets/希林娜依高,HOYO-MiX - 烬火 Emberfire.mp3'
import cover from './assets/cover.jpg'

export default function LRCPlayerDemo() {
  const [form] = Form.useForm();
  const [config, setConfig] = useState({
    placeholder: "无歌词",
    offset: -0.3,
    animateType: "lrcplayer-slide",
    animateDuration: 8,
    nextLrcDisplay: true,
    nextLrcNumber: 2,
  });
  const lrc = createLrcObj(`[00:00.000] 作词 : 三宝 Bao/项柳 Hsiang Liu\n[00:00.368] 作曲 : 李洋 Yang Lee (HOYO-MiX)\n[00:00.736] 编曲 : 李洋 Yang Lee (HOYO-MiX)\n[00:01.104] 制作人 : HOYO-MiX\n[00:01.472] 原声吉他 Acoustic Guitar：尤裴佳 Peijia You (HOYO-MiX)\n[00:01.840] 电吉他 Electric Guitar：尤裴佳 Peijia You (HOYO-MiX)\n[00:02.208] 乐队 Orchestra：国际首席爱乐乐团 International Master Philharmonic Orchestra\n[00:02.576] 合唱指挥 Choir Conductor：齐放 Fang Qi\n[00:02.944] 合唱 Choir：Sfuture艺术团\n[00:03.312] 录音棚 Recording Studio：Studio21A / 九紫天诚录音棚 SKY FIRE STUDIO / Sound Pro Studio\n[00:03.680] 录音师 Recording Engineer：倪涵文 Carol Nee / 董方昱 Fangyu Dong / 曹晓冬 Xiaodong Cao\n[00:04.048] 混音师 Mixing Engineer：周天澈 TC Z. / 徐天鸿 TianHong Xu\n[00:04.416] 母带制作 Mastering Engineer：周天澈 TC Z.\n[00:04.784] 出品 Produced by：HOYO-MiX\n[00:05.160]May the birds soar from their cage\n[00:09.410]Sunbeams filter through the foliage\n[00:13.820]Flames grow with immortal courage\n[00:21.480]And I hope you won't be tainted by fate\n[00:29.070]Nothing to fear\n[00:31.070]So go alone\n[00:39.100]By the grace of pain\n[00:43.850]Hundreds of times you fight in the ruins\n[00:47.960]Your pride will not be slain\n[00:52.960]From the heart to the veins\n[01:00.020]Stay awake don't fall asleep\n[01:04.090]The way is long and the gloom is deep\n[01:08.840]Embers glowing in the hearth still seen\n[01:16.590]And I hope you won't be tainted by fate\n[01:23.960]Nothing to fear\n[01:26.150]Never look back\n[01:29.760]Go ahead\n[01:34.210]Though bones and minds were chained\n[01:38.840]You cut down the thorns again and again\n[01:43.000]Your pride will not be slain\n[01:47.640]From the heart to the veins\n[01:55.210](Nec fatum finire te)\n[01:59.500](Nec tribulatio potest)\n[02:03.870]Flames grow with immortal courage (Haec olim meminisse iuvabit)\n[02:11.590]And your world will never fall away\n[02:19.030]Nothing to fear\n[02:21.490]Beneath the scars\n[02:25.560]You'll never be tainted by fate\n[02:36.890]\n`);
  return (
    <>
      <h1>自定义</h1>
      <Form
        form={form}
        onFinish={setConfig}
        initialValues={config}
      >
        <Form.Item name="placeholder" label="placeholder（无歌词显示）">
          <Input />
        </Form.Item>

        <Form.Item name="offset" label="offset（歌词时差）">
          <InputNumber />
        </Form.Item>

        <Form.Item name="animateType" label="animateType（动画类型）">
          <Radio.Group>
            <Radio value="lrcplayer-slide">lrcplayer-slide 划出</Radio>
            <Radio value="lrcplayer-fade">lrcplayer-fade 淡入</Radio>
            <Radio value="none">none 无</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="animateDuration" label="animateDuration（动画时长）">
          <InputNumber />
        </Form.Item>

        <Form.Item
          name="nextLrcDisplay"
          valuePropName="checked"
          label="nextLrcDisplay（显示下一句）"
        >
          <Checkbox />
        </Form.Item>

        <Form.Item name="nextLrcNumber" label="nextLrcNumber（显示句数）">
          <InputNumber />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" type="primary">
            确定
          </Button>
        </Form.Item>
      </Form>

      <LRCPlayer
        src={src}
        cover={cover}
        title="希林娜依高,HOYO-MiX - 烬火 Emberfire"
        subTitle="《原神》动画短片「烬中歌」插曲"
        lrc={lrc}
        placeholder={config.placeholder}
        offset={config.offset}
        animate={{
          type: config.animateType,
          duration: config.animateDuration,
        }}
        nextLrc={{
          display: config.nextLrcDisplay,
          number: config.nextLrcNumber,
        }}

      />
      文档请见
      <a href="https://www.npmjs.com/package/react-lrcplayer" target="_blank">
        https://www.npmjs.com/package/react-lrcplayer
      </a>
    </>
  );
}
