(() => {
  const data = window.PORTFOLIO_DATA;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const projectGrid = document.querySelector("#projects-grid");
  const filterButtons = [...document.querySelectorAll("[data-filter]")];
  const menuButton = document.querySelector(".menu-button");
  const menu = document.querySelector("#site-menu");
  const header = document.querySelector("[data-header]");
  const ICON = (name) => `<img class="icon" src="assets/icons/${name}.svg" alt="" width="16" height="16">`;

  const escapeHtml = (value) =>
    String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const isValidUrl = (value) => /^https:\/\//i.test(value || "");
  const listItems = (items) => items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  const CASE_CATEGORY = "academicos";

  /* ---------- Projetos ---------- */
  function projectTemplate(project, index) {
    const tags = listItems(project.technologies);
    const projectUrl = project.link || project.repository;
    const isCase = project.case || project.category === CASE_CATEGORY;
    const action = isValidUrl(projectUrl)
      ? `<a class="project-link" href="${escapeHtml(projectUrl)}" target="_blank" rel="noreferrer">${escapeHtml(project.linkLabel || "Abrir repositório")} ${ICON("arrow-up-right")}</a>`
      : `<span class="project-link project-link-muted">${escapeHtml(project.repository || "Repositório em breve")}</span>`;
    const period = project.period ? `<p class="project-period">${escapeHtml(project.period)}</p>` : "";
    const status = project.status ? `<p class="project-status">${escapeHtml(project.status)}</p>` : "";
    const description = isCase ? `<p class="project-description">${escapeHtml(project.description)}</p>` : "";
    const steps = [
      ["Problema", project.problem],
      ["O que eu fiz", project.contribution],
      ["Resultado", project.result],
    ]
      .filter(([, text]) => text)
      .map(([title, text]) => `<div><h5>${title}</h5><p>${escapeHtml(text)}</p></div>`)
      .join("");
    const solved = project.solved
      ? `<div class="project-solved"><h5>Problemas resolvidos</h5><ul>${project.solved
          .map(([title, problem, solution]) => `<li><strong>${escapeHtml(title)}</strong><p>${escapeHtml(problem)}</p><p>${escapeHtml(solution)}</p></li>`)
          .join("")}</ul></div>`
      : "";

    return `
      <article class="project-card reveal${isCase ? " project-case" : ""}" style="--delay: ${index % 2}">
        <div class="project-side">
          <p class="project-meta"><span>${escapeHtml(project.type)}</span><span>${escapeHtml(project.semester)}</span></p>
          <h4>${escapeHtml(project.name)}</h4>
          ${period}
          ${description}
          <ul class="tag-list" aria-label="Tecnologias">${tags}</ul>
          ${status}
          ${isCase ? action : ""}
        </div>
        <div class="project-steps">${steps}</div>
        ${solved}
        ${isCase ? "" : action}
      </article>`;
  }

  function groupTemplate(category, projects) {
    if (!projects.length) return "";
    return `
      <section class="project-group" aria-labelledby="group-${category.key}">
        <header class="project-group-heading reveal">
          <h3 id="group-${category.key}">${escapeHtml(category.label)} <span>${projects.length}</span></h3>
          <p>${escapeHtml(category.description)}</p>
        </header>
        <div class="project-cards${category.key === CASE_CATEGORY ? " project-cards-cases" : ""}">${projects.map(projectTemplate).join("")}</div>
      </section>`;
  }

  function renderProjects(filter = "todos") {
    if (!projectGrid || !data) return;
    const categories = filter === "todos" ? data.categories : data.categories.filter((c) => c.key === filter);
    // O observer é global: sem isso, cards removidos pelo filtro ficariam observados para sempre.
    if (revealObserver) projectGrid.querySelectorAll(".reveal").forEach((element) => revealObserver.unobserve(element));
    projectGrid.innerHTML = categories
      .map((category) => groupTemplate(category, data.projects.filter((p) => p.category === category.key)))
      .join("");
    initRevealObserver(projectGrid);
  }

  function setActiveFilter(filter) {
    filterButtons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.filter === filter));
    });
    renderProjects(filter);
  }

  /* ---------- Menu ---------- */
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

  /* ---------- Cabeçalho: fundo ao rolar e seção ativa ---------- */
  function initHeader() {
    if (!header) return;
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const links = [...menu.querySelectorAll('a[href^="#"]')];
    const sections = links.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
    if (!("IntersectionObserver" in window) || !sections.length) return;
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          links.forEach((link) => link.toggleAttribute("aria-current", link.getAttribute("href") === `#${entry.target.id}`));
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((section) => spy.observe(section));
  }

  /* ---------- Revelação ao rolar ---------- */
  // Um observer só: observar de novo o mesmo elemento não duplica callbacks.
  const revealObserver =
    reduceMotion.matches || !("IntersectionObserver" in window)
      ? null
      : new IntersectionObserver(
          (entries, observer) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            });
          },
          { threshold: 0.12, rootMargin: "0px 0px -24px" },
        );

  function initRevealObserver(root = document) {
    root.querySelectorAll(".reveal:not(.is-visible)").forEach((element) => {
      const delay = element.dataset.delay;
      if (delay) element.style.setProperty("--delay", delay);
      if (revealObserver) revealObserver.observe(element);
      else element.classList.add("is-visible");
    });
  }

  /* ---------- Perfil, hero e contatos ---------- */
  function renderProfile() {
    if (!data) return;
    document.querySelectorAll("[data-profile]").forEach((element) => {
      const value = data.profile[element.dataset.profile];
      if (value) element.textContent = value;
    });

    [
      ["profile-interests", data.profile.interests],
      ["stack", data.profile.stack],
    ].forEach(([key, items]) => {
      const list = document.querySelector(`[data-list='${key}']`);
      if (list && Array.isArray(items)) list.innerHTML = listItems(items);
    });

    const semester = currentSemester(data.profile.entry);
    const since = (data.experience?.[0]?.period || "").match(/\d{4}/)?.[0];
    const status = document.querySelector("[data-stat='status']");
    if (status && semester) status.textContent = `Cursando o ${semester}DSM${since ? ` · dev desde ${since}` : ""}`;
  }

  // Semestre do curso (1 a 6) calculado pela data; jan–jun = 1º, jul–dez = 2º semestre do ano.
  function currentSemester(entry, now = new Date()) {
    if (!entry) return 0;
    const term = now.getMonth() < 6 ? 1 : 2;
    const semester = (now.getFullYear() - entry.year) * 2 + term - entry.term + 1;
    return semester >= 1 && semester <= 6 ? semester : 0;
  }

  function renderSocialLinks() {
    if (!data) return;
    Object.entries(data.social).forEach(([network, url]) => {
      if (!isValidUrl(url)) return;
      document.querySelectorAll(`[data-social="${network}"]`).forEach((link) => {
        link.href = url;
      });
    });
  }

  /* ---------- Formação, experiência, conhecimentos ---------- */
  function renderEducation() {
    if (!data?.education?.length) return;
    const education = data.education[0];
    document.querySelectorAll("[data-education]").forEach((element) => {
      let value = education[element.dataset.education];
      const semester = currentSemester(data.profile.entry);
      if (value && element.dataset.education === "period" && semester) value += ` · cursando o ${semester}DSM`;
      if (value) element.textContent = value;
    });

    const experienceList = document.querySelector("[data-list='experience']");
    if (experienceList && Array.isArray(data.experience)) {
      experienceList.innerHTML = data.experience
        .map(
          (item) => `
          <li class="experience-item">
            <span class="experience-period">${escapeHtml(item.period)}</span>
            <div><strong>${escapeHtml(item.role)}</strong><span>${escapeHtml(item.company)}</span><p>${escapeHtml(item.focus)}</p></div>
          </li>`,
        )
        .join("");
    }

    const coursesBlock = document.querySelector("[data-block='courses']");
    const coursesList = document.querySelector("[data-list='courses']");
    if (coursesBlock && coursesList) {
      const courses = Array.isArray(data.courses) ? data.courses : [];
      coursesBlock.hidden = courses.length === 0;
      coursesList.innerHTML = courses
        .map((c) => `<li><strong>${escapeHtml(c.name)}</strong><span>${escapeHtml([c.institution, c.year].filter(Boolean).join(" · "))}</span></li>`)
        .join("");
    }

    const skills = document.querySelector("[data-list='skills']");
    if (skills && data.skills && !Array.isArray(data.skills)) {
      skills.innerHTML = Object.entries(data.skills)
        .map(
          ([group, items]) => `
          <li class="skill-group">
            <h4>${escapeHtml(group)}</h4>
            <ul class="tag-list">${listItems(items)}</ul>
          </li>`,
        )
        .join("");
    }

    ["languages", "interests"].forEach((key) => {
      const list = document.querySelector(`[data-list="${key}"]`);
      if (!list || !Array.isArray(data[key])) return;
      list.innerHTML = listItems(data[key]);
    });
  }

  /* ---------- Vídeos ---------- */
  function renderVideos() {
    const list = document.querySelector("#video-list");
    if (!list || !data?.videos) return;
    list.innerHTML = data.videos
      .map((video, index) => {
        const action = isValidUrl(video.url)
          ? `<a class="video-link" href="${escapeHtml(video.url)}" target="_blank" rel="noreferrer">Assistir ${ICON("arrow-up-right")}</a>`
          : '<strong class="video-pending">Em breve</strong>';
        return `<article class="video-item reveal" style="--delay: ${index}"><span class="video-label">${escapeHtml(video.label)}</span><p>${escapeHtml(video.note)}</p>${action}</article>`;
      })
      .join("");
  }

  /* ---------- Eventos ---------- */
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
  document.addEventListener("click", (event) => {
    if (!menu?.classList.contains("is-open")) return;
    if (menu.contains(event.target) || menuButton.contains(event.target)) return;
    toggleMenu(false);
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
  initHeader();
  initRevealObserver();
})();
