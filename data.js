/*
 * 网站的全部内容都在这个文件里，改这里就行，不用动其它文件。
 * 字段值支持 HTML，例如 <a href="...">链接</a>、<b>加粗</b>。
 * 某个板块设为空数组 [] 时，该板块和导航里对应的项都会自动隐藏。
 */
window.SITE_DATA = {
  updated: "November 2026",

  profile: {
    name: "Yang MaYuBo",
    nameZh: "",
    nameLines: ["Yang", "MaYuBo"],      // 首屏大字的分行方式
    highlightName: ["Mayubo Yang", "MaYuBo Yang", "Yang MaYuBo"], // 论文作者列表里需要高亮的写法
    title: "Undergraduate Student",
    affiliation: "西南石油大学",
    links: {
      email: "yangmayubo@gmail.com",
      scholar: "https://scholar.google.com/citations?user=T-rgBTkAAAAJ&hl=zh-CN",
      github: "https://github.com/YaYiQiu",
      twitter: "",
      linkedin: "",
      cv: ""
    },
    bio: [
      "对AI前沿技术感兴趣的新人"
    ],
    interests: ["Agentic Post-training", "Long-horizon Agent", "RSI"],
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
      title: "Southwest Petroleum University (西南石油大学)",
      subtitle: "B.E. in Computer Science and Technology",
      current: true
    }
  ],

  research: [
    {
      period: "2026.07 – Present",
      title: "Tencent",
      subtitle: "Intern · Harness RSI",
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
      venue: "arXiv preprint",
      venueShort: "arXiv",
      year: 2025,
      date: "2025.01",
      selected: true,
      tags: ["Under review at AAAI 2027"],
      links: { arxiv: "https://arxiv.org/abs/2512.23611" }
    }
  ],

  // 暂无内容，板块和导航项会自动隐藏；以后有审稿等经历时按 { role, items } 填写
  service: []
};
