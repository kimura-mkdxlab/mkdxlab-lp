const header = document.querySelector("[data-header]");
const nav = document.querySelector("#site-nav");
const navToggle = document.querySelector(".nav-toggle");
const year = document.querySelector("[data-year]");
const form = document.querySelector("[data-contact-form]");
const formMessage = document.querySelector("[data-form-message]");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

if (header) {
  const updateHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

if (form && formMessage) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      formMessage.textContent = "未入力の項目をご確認ください。";
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    const subject = encodeURIComponent("業務改善の相談");
    const body = encodeURIComponent(
      `お名前: ${data.get("name")}\nメール: ${data.get("email")}\n\nご相談内容:\n${data.get("message")}`
    );

    formMessage.textContent = "メール作成画面を開きます。内容をご確認ください。";
    window.location.href = `mailto:kimura@mkdxlab.onmicrosoft.com?subject=${subject}&body=${body}`;
  });
}
