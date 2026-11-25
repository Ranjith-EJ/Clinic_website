const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

// Prevent selecting a date in the past.
const dateInput = document.getElementById("visitDate");
const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
  .toISOString().split("T")[0];
dateInput.min = localToday;

document.getElementById("appointmentForm").addEventListener("submit", function (event) {
  event.preventDefault();
  if (!this.reportValidity()) return;

  const formData = new FormData(this);
  const name = formData.get("patientName").trim();
  const phone = formData.get("patientPhone").trim();
  const date = formData.get("visitDate") || "Not specified";
  const treatment = formData.get("treatment") || "Not specified";
  const message = formData.get("message").trim() || "No additional details";

  const whatsappMessage = [
    "Hello, I would like to request an appointment at Dr Mithra Hegde's Dental Speciality Clinic.",
    "",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Preferred date: ${date}`,
    `Reason for visit: ${treatment}`,
    `Details: ${message}`,
    "",
    "Please let me know the available appointment timings."
  ].join("\n");

  const whatsappUrl = `https://wa.me/919845284411?text=${encodeURIComponent(whatsappMessage)}`;
  document.getElementById("formStatus").textContent =
    "Opening WhatsApp. Please send the pre-filled message to submit your enquiry.";
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
});
