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

  /* ---------- Projetos ---------- */
  function projectTemplate(project, index) {
    const tags = project.technologies.map((tech) => `<li>${escapeHtml(tech)}</li>`).join("");
    const projectUrl = project.link || project.repository;
    const repositoryText = isValidUrl(project.repository)
      ? project.repository.replace(/^https:\/\/(www\.)?/, "")
      : project.repository || "Link em breve";
    const action = isValidUrl(projectUrl)
      ? `<a class="project-card-link" href="${escapeHtml(projectUrl)}" target="_blank" rel="noreferrer">${escapeHtml(project.linkLabel || "Abrir repositório")} ${ICON("arrow-up-right")}</a>`
      : `<span class="project-card-link project-card-link-muted">${escapeHtml(project.repository || "Repositório em breve")}</span>`;
    const period = project.period ? `<span class="project-period">${escapeHtml(project.period)}</span>` : "";

    return `
      <article class="project-card reveal${project.featured ? " project-card-featured" : ""}" style="--delay: ${index % 3}">
        <div class="project-content">
          <p class="project-meta"><span>${escapeHtml(project.type)}</span><span class="project-semester">${escapeHtml(project.semester)}</span></p>
          <h3>${escapeHtml(project.name)}</h3>
          ${period}
          <p class="project-description">${escapeHtml(project.description)}</p>
          <div class="project-contribution">
            <h4>Contribuição pessoal</h4>
            <p>${escapeHtml(project.contribution)}</p>
          </div>
          <dl>
            <div><dt>Tecnologias</dt><dd><ul class="tag-list">${tags}</ul></dd></div>
            <div><dt>Repositório</dt><dd>${escapeHtml(repositoryText)}</dd></div>
          </dl>
          ${action}
        </div>
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
        <div class="project-cards">${projects.map(projectTemplate).join("")}</div>
      </section>`;
  }

  function renderProjects(filter = "todos") {
    if (!projectGrid || !data) return;
    const categories = filter === "todos" ? data.categories : data.categories.filter((c) => c.key === filter);
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
      { threshold: 0.12, rootMargin: "0px 0px -24px" },
    );

    elements.forEach((element) => observer.observe(element));
  }

  /* ---------- Perfil, hero e contatos ---------- */
  function renderProfile() {
    if (!data) return;
    document.querySelectorAll("[data-profile]").forEach((element) => {
      const key = element.dataset.profile;
      const value = data.profile[key];
      if (!value) return;
      element.textContent = key === "name" ? `${value}.` : value;
    });

    const interests = document.querySelector("[data-list='profile-interests']");
    if (interests && Array.isArray(data.profile.interests)) {
      interests.innerHTML = data.profile.interests.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
    }

    const stats = {
      projects: String(data.projects.length).padStart(2, "0"),
      semester: data.profile.currentSemester,
      since: (data.experience?.[0]?.period || "").split(" ")[2] || "",
    };
    document.querySelectorAll("[data-stat]").forEach((element) => {
      const value = stats[element.dataset.stat];
      if (value) element.textContent = value;
    });
  }

  function renderSocialLinks() {
    if (!data) return;
    Object.entries(data.social).forEach(([network, url]) => {
      const current = document.querySelector(`[data-social="${network}"]`);
      if (!current || !isValidUrl(url)) return;
      current.href = url;
    });
  }

  /* ---------- Formação, experiência, conhecimentos ---------- */
  function renderEducation() {
    if (!data?.education?.length) return;
    const education = data.education[0];
    document.querySelectorAll("[data-education]").forEach((element) => {
      const value = education[element.dataset.education];
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
            <ul class="tag-list">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
          </li>`,
        )
        .join("");
    }

    ["languages", "interests"].forEach((key) => {
      const list = document.querySelector(`[data-list="${key}"]`);
      if (!list || !Array.isArray(data[key])) return;
      list.innerHTML = data[key].map((item) => `<li>${escapeHtml(item)}</li>`).join("");
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
        return `<article class="video-item reveal" style="--delay: ${index}"><span>${escapeHtml(video.label)}</span><p>${escapeHtml(video.note)}</p>${action}</article>`;
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
