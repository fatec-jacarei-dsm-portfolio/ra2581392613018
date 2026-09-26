(() => {
  const data = window.PORTFOLIO_DATA;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const projectGrid = document.querySelector("#projects-grid");
  const filterButtons = [...document.querySelectorAll("[data-filter]")];
  const menuButton = document.querySelector(".menu-button");
  const menu = document.querySelector("#site-menu");

  const escapeHtml = (value) =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const isValidUrl = (value) => /^https:\/\//i.test(value || "");

  function projectTemplate(project, index) {
    const technologies = project.technologies.map(escapeHtml).join(", ");
    const projectUrl = project.link || project.repository;
    const repository = isValidUrl(projectUrl)
      ? `<a class="project-card-link" href="${escapeHtml(projectUrl)}" target="_blank" rel="noreferrer">${escapeHtml(project.linkLabel || "Abrir repositório")} <img class="icon" src="assets/icons/arrow-up-right.svg" alt="" width="16" height="16"></a>`
      : '<span class="project-card-link project-card-link-muted">Repositório pendente</span>';

    return `
      <article class="project-card reveal" style="--delay: ${index % 3}">
        <div class="project-content">
          <p class="project-meta">${escapeHtml(project.type)} <span>Semestre ${escapeHtml(project.semester)}</span></p>
          <h3>${escapeHtml(project.name)}</h3>
          <p>${escapeHtml(project.description)}</p>
          <dl>
            <div><dt>Contribuição pessoal</dt><dd>${escapeHtml(project.contribution)}</dd></div>
            <div><dt>Tecnologias</dt><dd>${technologies}</dd></div>
            <div><dt>Repositório</dt><dd>${escapeHtml(project.repository || "Adicione o link")}</dd></div>
          </dl>
          ${repository}
        </div>
      </article>`;
  }

  function renderProjects(filter = "todos") {
    if (!projectGrid || !data) return;
    const priority = { profissionais: 0, academicos: 1, pessoais: 2 };
    const projects = filter === "todos"
      ? [...data.projects].sort((a, b) => priority[a.category] - priority[b.category])
      : data.projects.filter((project) => project.category === filter);
    projectGrid.innerHTML = projects.map(projectTemplate).join("");
    initRevealObserver(projectGrid);
  }

  function setActiveFilter(filter) {
    filterButtons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.filter === filter));
    });
    renderProjects(filter);
  }

  function toggleMenu(force) {
    if (!menu || !menuButton) return;
    const open = typeof force === "boolean" ? force : !menu.classList.contains("is-open");
    menu.classList.toggle("is-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
    document.querySelector(".menu-button-label").textContent = open ? "Fechar" : "Menu";
    const menuIcon = document.querySelector(".menu-icon");
    if (menuIcon) menuIcon.src = open ? "assets/icons/x.svg" : "assets/icons/menu.svg";
  }

  function initRevealObserver(root = document) {
    const elements = [...root.querySelectorAll(".reveal:not(.is-visible)")];
    elements.forEach((element) => {
      const delay = element.dataset.delay;
      if (delay) element.style.setProperty("--delay", delay);
    });

    if (reduceMotion.matches || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -24px" },
    );

    elements.forEach((element) => observer.observe(element));
  }

  function renderSocialLinks() {
    if (!data) return;
    Object.entries(data.social).forEach(([network, url]) => {
      const current = document.querySelector(`[data-social="${network}"]`);
      if (!current || !isValidUrl(url)) return;
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.target = "_blank";
      anchor.rel = "noreferrer";
      anchor.innerHTML = `${current.firstChild.textContent.trim()} <img class="icon" src="assets/icons/arrow-up-right.svg" alt="" width="16" height="16">`;
      current.replaceWith(anchor);
    });
  }

  function renderProfile() {
    if (!data) return;
    document.querySelectorAll("[data-profile]").forEach((element) => {
      const key = element.dataset.profile;
      const value = data.profile[key];
      if (!value) return;
      element.textContent = key === "name" ? `${value}.` : value;
    });
  }

  function renderEducation() {
    if (!data?.education?.length) return;
    const education = data.education[0];
    document.querySelectorAll("[data-education]").forEach((element) => {
      const value = education[element.dataset.education];
      if (value) element.textContent = value;
    });

    ["skills", "languages", "interests"].forEach((key) => {
      const list = document.querySelector(`[data-list="${key}"]`);
      if (!list || !Array.isArray(data[key])) return;
      list.innerHTML = data[key].map((item) => `<li>${escapeHtml(item)}</li>`).join("");
    });
  }

  function renderVideos() {
    const list = document.querySelector("#video-list");
    if (!list || !data?.videos) return;
    list.innerHTML = data.videos
      .map((video, index) => {
        const action = isValidUrl(video.url)
          ? `<a href="${escapeHtml(video.url)}" target="_blank" rel="noreferrer">Assistir <img class="icon" src="assets/icons/arrow-up-right.svg" alt="" width="16" height="16"></a>`
          : "<strong>Link pendente</strong>";
        return `<article class="video-item reveal" style="--delay: ${index}"><span>${escapeHtml(video.label)}</span><p>${escapeHtml(video.note)}</p>${action}</article>`;
      })
      .join("");
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => setActiveFilter(button.dataset.filter));
  });

  menuButton?.addEventListener("click", () => toggleMenu());
  menu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => toggleMenu(false)));
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !menu?.classList.contains("is-open")) return;
    toggleMenu(false);
    menuButton.focus();
  });

  window.matchMedia("(min-width: 901px)").addEventListener("change", (event) => {
    if (event.matches) toggleMenu(false);
  });

  document.querySelector("[data-year]").textContent = new Date().getFullYear();
  renderProfile();
  renderEducation();
  renderVideos();
  renderProjects();
  renderSocialLinks();
  initRevealObserver();
})();
