// 这是一个油猴脚本

console.log("999", 999);

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length));
    }
  }
  return null;
}

// 获取用户信息
const getUserInfo = async () => {
  try {
    const res = await fetch(
      "https://www.mxdxedu.com/api/diploma/pc/diplomaUserDetail/getStudentInfo",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
          authorization: getCookie("loginCookie") || "",
          "cache-control": "no-cache",
          pragma: "no-cache",
          "sec-ch-ua": '"Chromium";v="136", "Google Chrome";v="136", "Not.A/Brand";v="99"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          token: getCookie("loginCookie") || "",
        },
        referrer: "https://www.mxdxedu.com/onlineStudy",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "GET",
        mode: "cors",
        credentials: "include",
      }
    );
    const data = await res.json();
    console.log("data", data);
    return data.data;
  } catch (error) {
    console.log("error", error);
  }
};
window.userInfo = await getUserInfo();

const getVerifyKey = videoResponse => {
  var i = videoResponse?.pem;
  return i || (i = "tempPublicKey123456789123456789"), i.length, i;
};
const getVerifyKeyIv = userId => {
  for (var i = userId || 0, e = 0; e < 20 && !(8 - i.length <= 0); e++) i += "0";
  return i;
};
const encryptTripleDES = (i, e, t = "[]") => {
  const a = CryptoJS.enc.Utf8.parse(i);
  const s = CryptoJS.enc.Utf8.parse(e);
  const encrypted = CryptoJS.TripleDES.encrypt(t, a, {
    iv: s,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
};
window.encryptTripleDES = encryptTripleDES;

// 创建一个盒子按钮加在body右下角 里面接受按钮数组
const createBox = () => {
  const box = document.createElement("div");
  box.style.position = "fixed";
  box.style.bottom = "30px";
  box.style.right = "30px";
  box.style.zIndex = "9999";
  box.style.backgroundColor = "#ffffff";
  box.style.border = "1px solid #e8e8e8";
  box.style.borderRadius = "4px";
  box.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
  box.style.display = "flex";
  box.style.flexDirection = "column";
  box.style.padding = "5px";
  document.body.appendChild(box);
  return box;
};
// 创建按钮
const createButton = (text, onClick) => {
  const button = document.createElement("button");
  button.textContent = text;
  // 现代化的按钮样式
  button.style.backgroundColor = "#4CAF50";
  button.style.color = "#ffffff";
  button.style.border = "none";
  button.style.borderRadius = "6px";
  button.style.padding = "10px 20px";
  button.style.fontSize = "14px";
  button.style.fontWeight = "500";
  button.style.cursor = "pointer";
  button.style.margin = "5px";
  button.style.transition = "all 0.3s ease";
  button.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
  button.style.outline = "none";

  // 添加悬停效果
  button.onmouseenter = () => {
    button.style.backgroundColor = "#45a049";
    button.style.transform = "translateY(-2px)";
    button.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
  };
  button.onmouseleave = () => {
    button.style.backgroundColor = "#4CAF50";
    button.style.transform = "translateY(0)";
    button.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
  };

  button.addEventListener("click", onClick);
  return button;
};

console.log("index onload");
window.box = createBox();
