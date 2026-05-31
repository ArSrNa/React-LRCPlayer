import { useState, useEffect, useRef } from "react";
import { Form, Input, Checkbox, Radio, InputNumber, Button } from "antd";
// import { LRCPlayer, createLrcObj } from "../packages/index";

import emberfireMP3 from './assets/希林娜依高,HOYO-MiX - 烬火 Emberfire.mp3'
import emberfireCover from './assets/cover.jpg'

import creditEXMP3 from './assets/Frums - Credits EX.mp3'
import creditEXCover from './assets/Frums - Credits EX.jpg'

import { LRCPlayer } from "../packages";
import { credisEX, emberfire } from "./lrcs";

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
        src={emberfireMP3}
        cover={emberfireCover}
        title="希林娜依高,HOYO-MiX - 烬火 Emberfire"
        subTitle="《原神》动画短片「烬中歌」插曲"
        lrc={emberfire}
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

      <h1>无动画</h1>
      <LRCPlayer
        align="start"
        src={creditEXMP3}
        cover={creditEXCover}
        title="Frums - Credits EX"
        subTitle="歌词炫技的"
        lrc={credisEX}
        placeholder={config.placeholder}
        offset={0}
        animate={{
          type: 'none',
          duration: 0
        }}
        nextLrc={{
          display: false,
          number: 0,
        }}

      />

      文档请见
      <a href="https://www.npmjs.com/package/react-lrcplayer" target="_blank">
        https://www.npmjs.com/package/react-lrcplayer
      </a>
    </>
  );
}
