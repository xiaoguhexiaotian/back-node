import captcha from "svg-captcha";
// 生成验证码
export function generateCaptcha() {
  const capt = captcha.create({
    size: 6, // 验证码长度
    noise: 4, // 干扰线数量
    color: true, // 字体颜色是否随机
    background: "#fff", // 背景颜色
  });
  return capt;
}
