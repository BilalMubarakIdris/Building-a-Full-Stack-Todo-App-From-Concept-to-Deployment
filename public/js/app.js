// Task filtering functionality
document.addEventListener("DOMContentLoaded", function () {
  // Filter tasks by priority and status
  const filterPriority = document.getElementById("filter-priority");
  const filterStatus = document.getElementById("filter-status");

  if (filterPriority && filterStatus) {
    [filterPriority, filterStatus].forEach((filter) => {
      filter.addEventListener("change", filterTasks);
    });
  }

  // Auto-save forms
  const taskForms = document.querySelectorAll(".task-form");
  taskForms.forEach((form) => {
    form.addEventListener("submit", handleFormSubmit);
  });
});

function filterTasks() {
  const priority = document.getElementById("filter-priority").value;
  const status = document.getElementById("filter-status").value;

  const taskCards = document.querySelectorAll(".task-card");

  taskCards.forEach((card) => {
    const cardPriority = card
      .querySelector(".priority-badge")
      .textContent.toLowerCase();
    const isCompleted = card.classList.contains("completed");

    let showCard = true;

    // Priority filter
    if (priority && cardPriority !== priority) {
      showCard = false;
    }

    // Status filter
    if (status === "completed" && !isCompleted) {
      showCard = false;
    }
    if (status === "pending" && isCompleted) {
      showCard = false;
    }

    card.style.display = showCard ? "block" : "none";
  });
}

function handleFormSubmit(e) {
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = "Saving...";

    // Re-enable after 3 seconds (safety)
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = "Save";
    }, 3000);
  }
}

// Real-time search functionality
function setupSearch() {
  const searchInput = document.getElementById("search-tasks");
  if (searchInput) {
    searchInput.addEventListener("input", function (e) {
      const searchTerm = e.target.value.toLowerCase();
      const tasks = document.querySelectorAll(".task-card");

      tasks.forEach((task) => {
        const title = task.querySelector("h3").textContent.toLowerCase();
        const description =
          task.querySelector(".task-description")?.textContent.toLowerCase() ||
          "";

        if (title.includes(searchTerm) || description.includes(searchTerm)) {
          task.style.display = "block";
        } else {
          task.style.display = "none";
        }
      });
    });
  }
}
