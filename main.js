const listEl = document.querySelector("[data-essay-list]");

const fallbackPeople = [
  {
    slug: "joy-buolamwini",
    name: "조이 부올람위니",
    date: "2026.07.07",
    summary: "흰 가면 앞에서 시작해 알고리즘 정의의 언어를 만든 사람이다.",
    url: "article/joy-buolamwini/index.html",
    tags: ["기술윤리", "AI", "시민권"],
  },
  {
    slug: "mikaela-loach",
    name: "미카엘라 로치",
    date: "2026.07.07",
    summary: "사라진 해변에서 북해의 법정, 칼레의 국경까지 기후정의를 이어 온 사람이다.",
    url: "article/mikaela-loach/index.html",
    tags: ["기후정의", "디아스포라", "난민·이주민"],
  },
  {
    slug: "vanessa-nakate",
    name: "바네사 나카테",
    date: "2026.07.02",
    summary: "기후위기를 먼 구호가 아니라 어린이, 학교, 숲으로 옮겨온 사람이다.",
    url: "article/vanessa-nakate/index.html",
    tags: ["기후정의", "아프리카", "생태"],
  },
  {
    slug: "autumn-peltier",
    name: "오텀 펠티어",
    date: "2026.06.30",
    summary: "물을 지키는 일은 자기 삶의 경계를 다시 긋는 일이다.",
    url: "article/autumn-peltier/index.html",
    tags: ["물", "원주민 권리", "기후정의"],
  },
];

function normalizeUrl(item) {
  if (item.url) {
    return item.url;
  }
  return `article/${item.slug}/index.html`;
}

function renderPeople(people) {
  const sorted = [...people].sort((a, b) => String(b.date).localeCompare(String(a.date)));
  listEl.replaceChildren();

  if (sorted.length === 0) {
    listEl.innerHTML = '<p class="empty">아직 공개된 글이 없습니다.</p>';
    return;
  }

  sorted.forEach((item) => {
    const article = document.createElement("a");
    article.className = "article";
    article.href = normalizeUrl(item);

    const date = document.createElement("p");
    date.className = "date";
    date.textContent = item.date;

    const title = document.createElement("h2");
    title.className = "title";
    title.textContent = item.name;

    const summary = document.createElement("p");
    summary.className = "summary";
    summary.textContent = item.summary;

    article.append(date, title, summary);
    listEl.append(article);
  });
}

async function loadPeople() {
  renderPeople(fallbackPeople);

  try {
    const response = await fetch("./data/people.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`people.json ${response.status}`);
    }
    const people = await response.json();
    renderPeople(Array.isArray(people) ? people : people.people || []);
  } catch (error) {
    console.warn("data/people.json을 읽지 못해 main.js의 기본 목록을 표시합니다.", error);
  }
}

loadPeople();
