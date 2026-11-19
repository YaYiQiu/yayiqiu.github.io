/*
 * 网站的全部内容都在这个文件里，改这里就行，不用动其它文件。
 * 字段值支持 HTML，例如 <a href="...">链接</a>、<b>加粗</b>。
 * 某个板块设为空数组 [] 时，该板块和导航里对应的项都会自动隐藏。
 * 标注 TODO 的都是占位内容，需要替换。
 */
window.SITE_DATA = {
  updated: "November 2026",

  profile: {
    name: "Yang MaYuBo",
    nameZh: "",                         // TODO: 中文名（可留空）
    nameLines: ["Yang", "MaYuBo"],      // 首屏大字的分行方式，例如 ["Yang", "Ma", "YuBo"]
    highlightName: ["MaYuBo Yang", "Yang MaYuBo"], // 论文作者列表里需要高亮的写法
    title: "Ph.D. Student",             // TODO
    affiliation: "Your University",     // TODO
    links: {
      email: "you@example.com",         // TODO
      scholar: "",                      // TODO: Google Scholar 链接
      github: "https://github.com/YaYiQiu",
      twitter: "",
      linkedin: "",
      cv: ""
    },
    bio: [
      "TODO: A short introduction — who you are, where you study, and who you work with.",
      "TODO: Your research focuses on <b>topic A</b>, <b>topic B</b> and <b>topic C</b>."
    ],
    interests: ["TODO Interest 1", "TODO Interest 2", "TODO Interest 3"]
  },

  // current: true 会让时间线圆点呼吸发光，表示“进行中”
  education: [
    {
      period: "2025.09 – Present",
      title: "TODO University",
      subtitle: "Ph.D. in Computer Science",
      details: ["Advisor: Prof. TODO"],
      current: true
    },
    {
      period: "2022.09 – 2025.06",
      title: "TODO University",
      subtitle: "M.S. in Computer Science",
      details: ["Advisor: Prof. TODO"]
    },
    {
      period: "2018.09 – 2022.06",
      title: "TODO University",
      subtitle: "B.E. in TODO",
      details: ["TODO: ranking / scholarships"]
    }
  ],

  research: [
    {
      period: "2025.06 – Present",
      title: "TODO Lab / Company",
      subtitle: "Research Intern",
      details: ["TODO: what you worked on."],
      current: true
    },
    {
      period: "2024.06 – 2025.05",
      title: "TODO Lab / Company",
      subtitle: "Research Intern",
      details: ["TODO: what you worked on."]
    }
  ],

  /*
   * selected: true → 显示在 Selected 标签下；All 标签按年份分组显示全部
   * venueShort    → 左侧徽章文字；也可以用 image: "images/xxx.png" 换成论文配图
   * links 键名可选：paper / arxiv / code / project / slides / video / poster / bibtex
   */
  publications: [
    {
      title: "TODO: Example Paper Title One",
      authors: "Yang MaYuBo*, Coauthor A*, Coauthor B, Prof. Advisor",
      venue: "International Conference on Learning Representations (ICLR)",
      venueShort: "ICLR",
      year: 2026,
      selected: true,
      tags: ["Oral"],
      links: { paper: "#", code: "#" }
    },
    {
      title: "TODO: Example Paper Title Two",
      authors: "Coauthor A, Yang MaYuBo, Prof. Advisor",
      venue: "Annual Meeting of the Association for Computational Linguistics (ACL)",
      venueShort: "ACL",
      year: 2025,
      selected: true,
      links: { paper: "#" }
    },
    {
      title: "TODO: Example Preprint",
      authors: "Yang MaYuBo, Coauthor B",
      venue: "arXiv preprint",
      venueShort: "arXiv",
      year: 2025,
      links: { arxiv: "#" }
    }
  ],

  service: [
    { role: "Reviewer", items: "TODO: NeurIPS, ICML, ICLR, ACL, EMNLP" }
  ]
};
