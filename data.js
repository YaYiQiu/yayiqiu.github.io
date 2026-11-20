/*
 * 网站的全部内容都在这个文件里，改这里就行，不用动其它文件。
 * 字段值支持 HTML，例如 <a href="...">链接</a>、<b>加粗</b>。
 * 某个板块设为空数组 [] 时，该板块和导航里对应的项都会自动隐藏。
 */
window.SITE_DATA = {
  updated: "November 2026",

  profile: {
    name: "Mayubo Yang",
    nameZh: "杨马钰波",
    nameLines: ["Mayubo", "Yang"],      // 首屏大字的分行方式
    motto: "Algorithms demand rich imagination.", // 首屏名字上方的一句话
    highlightName: ["Mayubo Yang", "MaYuBo Yang", "Yang MaYuBo"], // 论文作者列表里需要高亮的写法
    title: "Undergraduate Student",
    affiliation: "Southwest Petroleum University",
    links: {
      email: "yangmayubo@gmail.com",
      scholar: "https://scholar.google.com/citations?user=T-rgBTkAAAAJ&hl=zh-CN",
      github: "https://github.com/YaYiQiu",
      twitter: "",
      linkedin: "",
      cv: ""
    },
    bio: [],
    interests: ["LLM Post-training", "Long-horizon Agentic RL", "RSI"],
    // 研究合作者，显示在首屏；url 可省略
    collaborators: [
      { name: "Wei Zhang", url: "https://zwpride.github.io/" },
      { name: "Shuyun Yang", url: "https://github.com/waitfor-night" }
    ]
  },

  // current: true 会让时间线圆点呼吸发光，表示“进行中”
  education: [
    {
      period: "2024.09 – 2028.06",
      title: "Southwest Petroleum University",
      subtitle: "B.E. in Computer Science and Technology",
      current: true
    }
  ],

  research: [
    {
      period: "2026.07 – Present",
      title: "Tencent",
      subtitle: "Research Intern · Harness RSI",
      current: true
    },
    {
      period: "2025.08 – 2026.06",
      title: "IQuest Research",
      subtitle: "Research Intern · Code Intelligence"
    }
  ],

  /*
   * selected: true → 显示在 Selected 标签下；All 标签按年份分组显示全部
   * venueShort    → 左侧徽章文字；也可以用 image: "images/xxx.png" 换成论文配图
   * links 键名可选：paper / arxiv / code / project / slides / video / poster / bibtex
   * year 用于分组；date（可选）会代替 year 显示在会议名后
   * 作者名后加 * 表示共同一作，加 † 表示通讯作者，页面会自动显示对应说明
   */
  publications: [
    {
      title: "One State, Many Paths: From Linear Trajectories to Hierarchical State Spaces for Terminal Agents",
      authors: "Wei Zhang*, Mayubo Yang*, Yuwen Li*, Jian Yang†, Mingjie Tang, Aishan Liu, Xianglong Liu, Bryan Dai",
      venue: "AAAI Conference on Artificial Intelligence (AAAI)",
      venueShort: "AAAI",
      year: 2027,
      selected: true,
      tags: ["Under Review"]
    },
    {
      title: "Language as Computation: Simulated Feedback and On-Policy Guidance for Interactive Agents",
      authors: "Mayubo Yang*, Shuyun Yang*, Yuwen Li, Zhe Sun, Siying Qian, Mohui Xu, Wei Zhang†",
      venue: "International Conference on Learning Representations (ICLR)",
      venueShort: "ICLR",
      year: 2027,
      tags: ["Under Review"]
    },
    {
      title: "Same Trajectories, Different States: Rethinking State Abstraction for Agentic Credit Assignment",
      authors: "Mayubo Yang*, Shuyun Yang*, Mohui Xu, Siying Qian, Zhe Sun, Yuwen Li, Wei Zhang†",
      venue: "Annual Meeting of the Association for Computational Linguistics (ACL)",
      venueShort: "ACL",
      year: 2027,
      tags: ["Under Review"]
    },
    {
      title: "Distilling What Matters: State-Boundary Supervision for On-Policy Distillation of Long-Horizon Coding Agents",
      authors: "Mohui Xu*, Shuyun Yang*, Mayubo Yang*, Siying Qian, Zhe Sun, Yuwen Li, Wei Zhang†",
      venue: "Annual Meeting of the Association for Computational Linguistics (ACL)",
      venueShort: "ACL",
      year: 2027,
      tags: ["Under Review"]
    },
    {
      title: "Close the Loop: Synthesizing Infinite Tool-Use Data via Multi-Agent Role-Playing",
      authors: "Yuwen Li, Wei Zhang, Zelong Huang, Mayubo Yang, Jiajun Wu, Shawn Guo, Huahao Hu, Lingyi Sun, Jian Yang, Mingjie Tang, Bryan Dai",
      venue: "arXiv preprint",
      venueShort: "arXiv",
      year: 2025,
      date: "2025.12",
      selected: true,
      links: { arxiv: "https://arxiv.org/abs/2512.23611" }
    }
  ],

  // 有审稿等经历时按 { role, items } 填写；为空时显示 serviceEmptyText
  service: [],
  serviceEmptyText: "暂无"
};
