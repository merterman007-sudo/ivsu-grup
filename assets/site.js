const menu = document.querySelector(".small-nav");
menu.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menu.open) {
    menu.open = false;
    menu.querySelector("summary").focus();
  }
});

const filters = document.querySelector(".filters");
if (filters) {
  const search = filters.querySelector("input");
  const buttons = [...filters.querySelectorAll("button")];
  const posts = [...document.querySelectorAll(".blog-feed .post")];
  const count = document.querySelector(".count");
  let category = "all";

  const normalize = (value) => value.toLocaleLowerCase("tr-TR").normalize("NFD")
    .replace(/\p{Diacritic}/gu, "").replace(/ı/g, "i");
  const entries = posts.map((post) => ({
    post,
    text: normalize(post.querySelector(".post-copy").textContent),
  }));

  function refresh() {
    const words = normalize(search.value).trim().split(/\s+/);
    let visible = 0;
    entries.forEach(({ post, text }) => {
      const categoryMatches = category === "all" || category === post.dataset.group;
      post.hidden = !categoryMatches || !words.every((word) => text.includes(word));
      visible += Number(!post.hidden);
    });
    count.textContent = visible ? visible + " yazı" : "Aramanızla eşleşen yazı bulunamadı.";
  }

  filters.addEventListener("submit", (event) => event.preventDefault());
  search.addEventListener("input", refresh);
  buttons.forEach((button) => button.addEventListener("click", () => {
    category = button.dataset.filter;
    buttons.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
    refresh();
  }));
  filters.hidden = false;
  count.hidden = false;
  refresh();
}
