// 获取考试列表
const getExamList = async () => {
  try {
    const res = await fetch("https://www.mxdxedu.com/api/diploma/pc/coursePlan/getCourseExamList", {
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
    });
    const data = await res.json();
    console.log("考试列表数据", data);
    return data.data;
  } catch (error) {
    console.log("获取考试列表出错", error);
  }
};

// 获取考试信息
const getExamInfo = async (courseDictId, courseWithTeachingId, examId) => {
  try {
    const params = new URLSearchParams({
      courseDictId: courseDictId,
      courseWithTeachingId: courseWithTeachingId,
      examId: examId,
      userId: window.userInfo.userId,
    });
    const res = await fetch(
      "https://www.mxdxedu.com/api/diploma/pc/coursePlan/getCourseExamInfo?" + params,
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
    console.log("考试详情数据", data);
    return data.data;
  } catch (error) {
    console.log("获取考试详情出错", error);
  }
};

// 提交考试结果
const submitExamResult = async (id, courseDictId, courseWithTeachingId, allList) => {
  try {
    const res = await fetch("https://www.mxdxedu.com/api/diploma/pc/studentScore/submitExam", {
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
        studentExamTimes: 1,
        studentHomeWorkTimes: 1,
      }),
      method: "POST",
      mode: "cors",
      credentials: "include",
    });
    const data = await res.json();
    console.log("提交考试答案结果", data);
    return data;
  } catch (error) {
    console.log("提交考试答案出错", error);
  }
};

// 开始考试
const doExam = async examList => {
  try {
    const examListLength = examList.length;
    for (let i = 0; i < examListLength; i++) {
      const { courseWithTeachingList, semester } = examList[i];
      console.log("开始考试", semester);
      for (const item of courseWithTeachingList) {
        const { courseDictId, id, examPackageId } = item;
        // 获取考试详情
        console.log("获取考试详情");
        const examInfo = await getExamInfo(courseDictId, id, examPackageId);
        console.log("考试详情", examInfo);
        const { courseName, examTitle, allList } = examInfo || {};

        // 提交考试答案
        console.log("提交考试答案", courseName, examTitle);
        const result = await submitExamResult(
          examPackageId,
          courseDictId,
          id,

          allList.map(item => ({
            ...item,
            studentAnswer: item.questionAnswer,
          }))
        );
        console.log("提交考试答案完成", courseName, examTitle, result);
      }
    }
  } catch (error) {
    console.log("考试执行出错", error);
  }
};

// 开始任务
const startTask_exam = async () => {
  try {
    // 获取用户信息
    console.log("开始任务");
    console.log("获取用户信息");
    const userInfo = await getUserInfo();
    console.log("用户信息", userInfo);

    // 获取考试列表
    console.log("获取考试列表");
    const examList = await getExamList();
    console.log("考试列表", examList);

    // 开始考试
    console.log("开始考试");
    await doExam(examList);

    // 结束任务
    console.log("任务结束");
  } catch (error) {
    console.log("任务出错", error);
  }
};

window.addEventListener("load", () => {
  console.log("doExam onload");
  const btn = createButton("开始考试", startTask_exam);
  window.box.appendChild(btn);
});
