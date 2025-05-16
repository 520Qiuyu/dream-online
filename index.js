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

// 获取所有学期
const getAllSemester = async () => {
  try {
    const res = await fetch(
      "https://www.mxdxedu.com/api/diploma/pc/coursePlan/getCourseVideoList",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
          authorization: getCookie("loginCookie"), // 从cookie中获取loginCooki
          "cache-control": "no-cache",
          pragma: "no-cache",
          "sec-ch-ua": '"Chromium";v="136", "Google Chrome";v="136", "Not.A/Brand";v="99"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          token: getCookie("loginCookie"),
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

// 获取所有课程视频
const getAllVideo = async (courseDictId, videoPackageId, courseWithTeachingId) => {
  try {
    const params = new URLSearchParams({
      courseDictId,
      videoPackageId,
      courseWithTeachingId,
    });
    console.log("params", params);
    const res = await fetch(
      "https://www.mxdxedu.com/api/diploma/pc/coursePlan/getCourseVideoInfo" + "?" + params,
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
          authorization: getCookie("loginCookie"),
          "cache-control": "no-cache",
          pragma: "no-cache",
          "sec-ch-ua": '"Chromium";v="136", "Google Chrome";v="136", "Not.A/Brand";v="99"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          token: getCookie("loginCookie"),
        },
        referrer: "https://www.mxdxedu.com/onlineStudy",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "POST",
        mode: "cors",
        credentials: "include",
      }
    );
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.log("error", error);
  }
};

// 保存学习记录 '{"videoId":"1157570","courseDictId":"9216","videoPackageId":"1391590","courseWithTeachingId":"12940","watchTime":207,"duration":207,"key":"zQUulOgJXog="}'
const saveStudyRecord = async (
  videoId,
  courseDictId,
  videoPackageId,
  courseWithTeachingId,
  watchTime,
  duration,
  key
) => {
  try {
    const params = {
      videoId,
      courseDictId,
      videoPackageId,
      courseWithTeachingId,
      watchTime,
      duration,
      key,
    };
    const res = await fetch(
      "https://www.mxdxedu.com/api/diploma/pc/studentScore/pingSaveVideoRecord",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
          authorization: getCookie("loginCookie") || "",
          "cache-control": "no-cache",
          "content-type": "application/json;charset=UTF-8",
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
        body: JSON.stringify(params),
        method: "POST",
        mode: "cors",
        credentials: "include",
      }
    );
    const data = await res.json();
    console.log("保存记录", data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

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

// 检查机器人
const checkRobot = async () => {
  try {
    const res = await fetch(
      "https://www.mxdxedu.com/api/diploma/pc/banRecord/checkRobot?w=400&h=300&blockSize=63",
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
        method: "POST",
        mode: "cors",
        credentials: "include",
      }
    );
    const data = await res.json();
  } catch (error) {
    console.log("error", error);
  }
};

// 创建一个盒子按钮加在body右下角 里面接受按钮数组
const createBox = btns => {
  const box = document.createElement("div");
  box.style.position = "fixed";
  box.style.bottom = "30px";
  box.style.right = "30px";
  box.style.zIndex = "9999";
  box.style.backgroundColor = "#ffffff";
  box.style.border = "1px solid #e8e8e8";
  box.style.borderRadius = "4px";
  box.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
  document.body.appendChild(box);
  // 遍历按钮数组
  btns.forEach(btn => {
    box.appendChild(btn);
  });
  return box;
};
// 创建按钮
const createButton = (text, onClick) => {
  const button = document.createElement("button");
  button.textContent = text;
  // 美化一下样式，照着antd
  button.style.backgroundColor = "#3498db";
  button.style.color = "#ffffff";
  button.style.border = "none";
  button.style.borderRadius = "4px";
  button.style.padding = "8px 16px";
  button.style.fontSize = "14px";
  button.style.fontWeight = "500";
  button.style.cursor = "pointer";
  button.style.margin = "5px";
  button.style.transition = "all 0.2s ease";
  button.addEventListener("click", onClick);
  return button;
};

// 开始任务
const startTask = async () => {
  try {
    // 获取用户信息
    console.log("开始任务");
    console.log("获取用户信息");
    const userInfo = await getUserInfo();
    console.log("用户信息", userInfo);
    const key = encryptTripleDES(getVerifyKey(), getVerifyKeyIv(userInfo.userId));
    console.log("key", key);
    // 获取所有学期
    const semesterList = await getAllSemester();
    // 答应获取到的学期
    console.log(
      "semesterList",
      semesterList.map(item => item.semester)
    );
    for (let i = 0; i < semesterList.length; i++) {
      const { semester, semesterBeginDate, semesterEndDate, courseWithTeachingList } =
        semesterList[i];
      // 打印当前学期
      console.log("当前学期", semester);
      // 打印当前学期开始时间
      console.log("当前学期开始时间", semesterBeginDate);
      // 打印当前学期结束时间
      console.log("当前学期结束时间", semesterEndDate);
      // 判断当前是否正处在当前学期时间范围内
      const now = new Date();
      const begin = new Date(semesterBeginDate);
      const end = new Date(semesterEndDate);
      if (true) {
        console.log("当前正处在当前学期时间范围内");
        // 遍历当前学期所有课程
        for (let j = 0; j < courseWithTeachingList.length; j++) {
          /* {
                "id": "12940",
                "delFlag": 0,
                "params": {},
                "courseDictId": "9216",
                "courseShowName": "中国传统文化",
                "teachingPlanId": "462",
                "isLastSemester": "NO",
                "grade": "2024",
                "semester": "第三学期",
                "videoOnlineOrOffline": "ONLINE",
                "examOnlineOrOffline": "ONLINE",
                "homeworkOnlineOrOffline": "ONLINE",
                "videoRate": 0.30,
                "homeworkRate": 0.20,
                "examRate": 0.50,
                "examMaxTimes": 3,
                "semesterBeginDate": "2025-03-03 00:00:00",
                "semesterEndDate": "2025-07-07 00:00:00",
                "videoNormalDate": "2025-03-03 00:00:00.0~2025-07-07 00:00:00.0",
                "homeworkNormalDate": "2025-03-03 00:00:00.0~2025-07-07 00:00:00.0",
                "examNormalDate": "2025-03-03 00:00:00.0~2025-07-07 00:00:00.0",
                "gmtCreate": "2025-01-16 17:50:02",
                "gmtModified": "2025-01-16 17:50:02",
                "videoTotalCount": 121,
                "courseName": "中国传统文化",
                "courseType": "PUBLIC_BASE_COURSE",
                "videoPackageId": "1391590",
                "homeworkPackageId": "1628",
                "examPackageId": "154",
                "passScore": 60.00,
                "videoPassTime": 300.00,
                "videoPassScore": 60.00,
                "homeworkPassScore": 60.00,
                "examPassScore": 60.00
            } */
          const { id, courseDictId, videoPackageId } = courseWithTeachingList[j];
          // 打印当前课程
          console.log("当前课程", courseWithTeachingList[j]);
          // 获取当前课程的所有视频
          const { videoList } = await getAllVideo(courseDictId, videoPackageId, id);
          // 打印当前课程的所有视频
          console.log("当前课程的所有视频", videoList);
          // 保存视频记录
          /* // 遍历当前课程的所有视频
          for (let k = 0; k < videoList.length; k++) {
            const { videoId, duration, videoName } = videoList[k];
            await checkRobot();
            saveStudyRecord(
              videoId,
              courseDictId,
              videoPackageId,
              id,
              duration,
              duration,
              key
            ).then(res => {
              console.log("res", res);
              if (res.code === 200) {
                console.log(videoName, "：保存视频记录成功");
              }
            });
          } */
          videoList.forEach(async item => {
            const { videoId, duration, watchTime, videoName } = item;
            saveStudyRecord(
              videoId,
              courseDictId,
              videoPackageId,
              id,
              watchTime,
              duration,
              key
            ).then(res => {
              if (res.code === 200) {
                console.log(videoName, "：保存视频记录成功");
              }
            });
          });
        }
      } else {
        console.log("当前不在当前学期时间范围内");
      }
    }
  } catch (error) {
    console.log("error", error);
  }
};

window.onload = () => {
  const startBtn = createButton("开始任务", startTask);
  const testBtn = createButton("测试", test);
  createBox([startBtn, testBtn]);
};

async function test() {
  const allSemester = await getAllSemester();
  console.log("allSemester", allSemester);

  const userInfo = await getUserInfo();
  console.log("userInfo", userInfo);

  const key = encryptTripleDES(getVerifyKey(), getVerifyKeyIv(userInfo.userId));
  console.log("key", key);

  const videoList = await getAllVideo();
}
