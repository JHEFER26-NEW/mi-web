// ─── EMAILJS CONFIG ─────────────────────────────────────────────────────────
// 1. Regístrate gratis en https://emailjs.com con jheferson6666@gmail.com
// 2. Crea un servicio de Gmail  → copia el "Service ID"
// 3. Crea una plantilla con estas variables: {{from_name}}, {{reply_to}}, {{message}}
//    Pon en "To email": jheferson6666@gmail.com → copia el "Template ID"
// 4. Ve a Account > API Keys → copia tu "Public Key"
// Reemplaza los tres valores de abajo:
const EMAILJS_PUBLIC_KEY  = "TU_PUBLIC_KEY";   // ← pega tu Public Key aquí
const EMAILJS_SERVICE_ID  = "TU_SERVICE_ID";   // ← pega tu Service ID aquí
const EMAILJS_TEMPLATE_ID = "TU_TEMPLATE_ID";  // ← pega tu Template ID aquí
// ─────────────────────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  // Inicializar EmailJS
  if (typeof emailjs !== "undefined") {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }

  // Animaciones de scroll
  const reveals = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.15 });
  reveals.forEach((item) => observer.observe(item));

  // Formulario de contacto
  const form     = document.getElementById("contact-form");
  const btn      = document.getElementById("btn-enviar");
  const feedback = document.getElementById("form-feedback");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (typeof emailjs === "undefined") {
      showFeedback("error", "No se pudo conectar con el servicio de correo. Recarga la página.");
      return;
    }

    // Estado de carga
    btn.disabled = true;
    btn.textContent = "Enviando…";
    feedback.className = "form-feedback";
    feedback.textContent = "";

    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
      .then(() => {
        showFeedback("success", "¡Mensaje enviado! Te responderé pronto.");
        form.reset();
      })
      .catch(() => {
        showFeedback("error", "Hubo un error al enviar. Intenta de nuevo o escríbeme directamente.");
      })
      .finally(() => {
        btn.disabled = false;
        btn.textContent = "Enviar mensaje";
      });
  });

  function showFeedback(type, msg) {
    feedback.textContent = msg;
    feedback.className = "form-feedback form-feedback--" + type;
  }
});
