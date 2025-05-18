// 获取作业列表
const getHomeworkList = async () => {
  try {
    const res = await fetch(
      "https://www.mxdxedu.com/api/diploma/pc/coursePlan/getCourseHomeworkList",
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
    console.log("作业列表数据", data);
    return data.data;
  } catch (error) {
    console.log("获取作业列表出错", error);
  }
};

// 获取做业信息
const getHomeworkInfo = async (courseDictId, courseWithTeachingId, homeworkId) => {
  try {
    const params = new URLSearchParams({
      courseDictId: courseDictId,
      courseWithTeachingId: courseWithTeachingId,
      homeworkId: homeworkId,
      userId: window.userInfo.userId,
    });
    const res = await fetch(
      "https://www.mxdxedu.com/api/diploma/pc/coursePlan/getCourseHomeworkInfo?" + params,
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
    console.log("作业详情数据", data);
    return data.data;
  } catch (error) {
    console.log("获取作业详情出错", error);
  }
};

// 提交作业答案
const submitHomework = async (id, courseDictId, courseWithTeachingId, allList) => {
  try {
    const res = await fetch("https://www.mxdxedu.com/api/diploma/pc/studentScore/submitHomework", {
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
      body: JSON.stringify({
        id,
        courseDictId,
        courseWithTeachingId,
        allList,
      }),
      method: "POST",
      mode: "cors",
      credentials: "include",
    });
    const data = await res.json();
    console.log("提交作业答案结果", data);
    return data;
  } catch (error) {
    console.log("提交作业答案出错", error);
  }
};

// 开始任务
const startTask_doHomeWork = async () => {
  try {
    // 获取用户信息
    console.log("开始任务");
    console.log("获取用户信息");
    const userInfo = await getUserInfo();
    console.log("用户信息", userInfo);

    // 获取作业列表
    console.log("获取作业列表");
    const homeworkList = await getHomeworkList();
    console.log("作业列表", homeworkList);

    // 开始做作业
    console.log("开始做作业=======================");
    const homeworkListLength = homeworkList.length;
    for (let i = 0; i < homeworkListLength; i++) {
      const { courseWithTeachingList, semester } = homeworkList[i];
      // 开始做作业
      console.log("开始做作业", semester);
      courseWithTeachingList.forEach(async item => {
        /*  {
            "id": "12472",
            "delFlag": 0,
            "params": {},
            "courseDictId": "11194",
            "courseShowName": "工矿企业供电",
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
            "gmtCreate": "2025-01-16 17:48:21",
            "gmtModified": "2025-01-16 17:48:21",
            "videoTotalCount": 23,
            "courseName": "工矿企业供电",
            "courseType": "PROFESSIONAL_COURSES",
            "videoPackageId": "2188307",
            "homeworkPackageId": "1632",
            "examPackageId": "1083",
            "passScore": 60.00,
            "videoPassTime": 300.00,
            "videoPassScore": 60.00,
            "homeworkPassScore": 60.00,
            "examPassScore": 60.00
        } */
        const { courseDictId, id, homeworkPackageId } = item || {};
        // 获取作业详情
        console.log("获取作业详情");
        const homeworkInfo = await getHomeworkInfo(courseDictId, id, homeworkPackageId);
        console.log("作业详情", homeworkInfo);
        const { courseName, homeworkTitle, allList } = homeworkInfo || {};

        // 提交作业答案
        console.log("提交作业答案", courseName, homeworkTitle);
        const result = await submitHomework(
          homeworkPackageId,
          courseDictId,
          id,
          allList.map(item => ({
            ...item,
            studentAnswer: item.questionAnswer,
          }))
        );
        console.log("提交作业答案完成", courseName, homeworkTitle, result);
      });
    }
  } catch (error) {
    console.log("任务执行出错", error);
  }
};

window.addEventListener("load", () => {
  console.log("doHomeWork onload");
  const btn = createButton("开始做作业", startTask_doHomeWork);
  window.box.appendChild(btn);
});
