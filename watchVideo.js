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
    return data.data.data;
  } catch (error) {
    console.log("error", error);
  }
};

// 验证码轨迹
const VERIFY_TRAJECTORY =
  "[[96,0],[97,146],[99,196],[108,252],[123,310],[124,361],[149,416],[152,466],[162,516],[174,575],[181,626],[188,677],[193,729],[196,779],[205,830],[206,889],[209,941],[213,991],[224,1043],[225,1097],[228,1149],[229,1208],[232,1259],[234,1310],[235,1360],[236,1411],[237,1461],[239,1513],[240,1576],[241,1894],[242,1944],[243,2043],[237,0]]";

// 开始任务
const startTask_watchVideo = async () => {
  try {
    // 获取用户信息
    console.log("开始任务");
    console.log("获取用户信息");
    const userInfo = await getUserInfo();
    console.log("用户信息", userInfo);

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
          const { videoList, pem } = await getAllVideo(courseDictId, videoPackageId, id);
          const key = encryptTripleDES(
            getVerifyKey({ pem }),
            getVerifyKeyIv(userInfo.userId),
            VERIFY_TRAJECTORY
          );
          console.log("key", key);
          // 打印当前课程的所有视频
          console.log("当前课程的所有视频", videoList);
          // 保存视频记录
          // 遍历当前课程的所有视频
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
          }
          /* videoList.forEach(async item => {
            const { videoId, duration, watchTime, videoName } = item;
            await checkRobot();
            await saveStudyRecord(
              videoId,
              courseDictId,
              videoPackageId,
              id,
              Math.floor(duration),
              Math.floor(duration),
              key
            ).then(res => {
              if (res.code === 200) {
                console.log(videoName, "：保存视频记录成功");
              }
            });
          }); */
        }
      } else {
        console.log("当前不在当前学期时间范围内");
      }
    }
    // 打印本学期课程观看完毕
    console.log("任务完成");
  } catch (error) {
    console.log("error", error);
  }
};

window.addEventListener("load", () => {
  console.log("watchVideo onload");
  const btn = createButton("开始看视频", startTask_watchVideo);
  window.box.appendChild(btn);
});
