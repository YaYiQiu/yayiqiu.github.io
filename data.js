/*
 * 所有网站内容都在这个文件里，改这里即可，无需改动其它文件。
 * 字段值支持 HTML（例如 <a href="...">链接</a>、<b>加粗</b>）。
 * 某个板块留空数组 [] 时，该板块和对应导航项会自动隐藏。
 */
window.SITE_DATA = {
  updated: "November 2026",

  profile: {
    name: "Your Name",
    nameZh: "你的名字",
    title: "Ph.D. Student",
    affiliation: "Your University",
    avatar: "avatar.jpg",
    highlightName: ["Your Name"],
    links: {
      email: "you@example.com",
      scholar: "https://scholar.google.com/citations?user=XXXX",
      github: "https://github.com/your-github",
      twitter: "",
      linkedin: "",
      cv: ""
    },
    bio: [
      "I am a Ph.D. student at <a href=\"#\">Your University</a>, advised by <a href=\"#\">Prof. Advisor</a>. Previously, I received my M.S. and B.S. degrees from XX University.",
      "My research focuses on <b>large language models</b>, <b>LLM agents</b> and <b>reinforcement learning</b>."
    ],
    interests: ["LLM Agents", "Reinforcement Learning", "Code Intelligence"]
  },

  news: [
    { date: "2026.10", text: "One paper accepted to <b>ICLR 2027</b>." },
    { date: "2026.09", text: "Started my Ph.D. at Your University." },
    { date: "2026.05", text: "One paper accepted to <b>ACL 2026</b> (Oral)." }
  ],

  education: [
    {
      period: "2025.09 – Present",
      title: "Your University",
      subtitle: "Ph.D. in Computer Science",
      details: ["Advisor: Prof. Advisor"],
      current: true
    },
    {
      period: "2022.09 – 2025.06",
      title: "XX University",
      subtitle: "M.S. in Computer Science",
      details: ["Advisor: Prof. XXX"]
    },
    {
      period: "2018.09 – 2022.06",
      title: "XX University",
      subtitle: "B.E. in Software Engineering",
      details: ["GPA ranking: 6/127", "National Scholarship"]
    }
  ],

  experience: [
    {
      period: "2025.06 – Present",
      title: "Company / Lab Name",
      subtitle: "Research Intern",
      details: ["Worked on LLM agents and RL post-training."],
      current: true
    },
    {
      period: "2024.06 – 2025.05",
      title: "Company Name",
      subtitle: "Research Intern",
      details: ["Worked on code generation."]
    }
  ],

  /*
   * selected: true  → 出现在 "Selected" 标签下
   * venueShort      → 左侧徽章显示的简称；也可用 image: "images/xxx.png" 换成论文配图
   * links 的键名可自定义：paper / arxiv / code / project / slides / video / bibtex ...
   */
  publications: [
    {
      title: "An Example Paper Title for Your Great Work",
      authors: "Your Name*, Coauthor A*, Coauthor B, Prof. Advisor",
      venue: "International Conference on Learning Representations (ICLR)",
      venueShort: "ICLR",
      year: 2027,
      selected: true,
      tags: ["Oral"],
      links: { paper: "https://arxiv.org/abs/xxxx.xxxxx", code: "https://github.com/xxx/xxx" }
    },
    {
      title: "Another Example Paper Title",
      authors: "Coauthor A, Your Name, Prof. Advisor",
      venue: "Annual Meeting of the Association for Computational Linguistics (ACL)",
      venueShort: "ACL",
      year: 2026,
      selected: true,
      links: { paper: "#", project: "#" }
    },
    {
      title: "A Preprint Example",
      authors: "Your Name, Coauthor B",
      venue: "arXiv preprint",
      venueShort: "arXiv",
      year: 2025,
      links: { arxiv: "#" }
    }
  ],

  awards: [
    { date: "2024", text: "Outstanding Graduate Student" },
    { date: "2021", text: "National Scholarship" }
  ],

  service: [
    { role: "Area Chair", items: "ACL ARR 2026" },
    { role: "Reviewer", items: "NeurIPS, ICML, ICLR, ACL, EMNLP, AAAI" }
  ]
};
