const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const emptyMessage = document.querySelector("#empty-message");
const taskPagination = document.querySelector("#task-pagination");
const previousTaskPageButton = document.querySelector("#previous-task-page");
const nextTaskPageButton = document.querySelector("#next-task-page");
const taskPaginationStatus = document.querySelector("#task-pagination-status");
const completedFilter = document.querySelector("#completed-filter");
const openSearchButton = document.querySelector("#open-search");
const closeSearchButton = document.querySelector("#close-search");
const searchModal = document.querySelector("#search-modal");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const clearSearchButton = document.querySelector("#clear-search");
const searchOrderStatus = document.querySelector("#search-order-status");
const searchOrderLabel = document.querySelector("#search-order-label");
const searchResults = document.querySelector("#search-results");
const searchEmptyMessage = document.querySelector("#search-empty-message");
const closeStatisticsButton = document.querySelector("#close-statistics");
const statisticsModal = document.querySelector("#statistics-modal");
const statisticsPanel = document.querySelector(".statistics-panel");
const completionChart = document.querySelector("#completion-chart");
const completionPercentage = document.querySelector("#completion-percentage");
const completionChartLabel = document.querySelector("#completion-chart-label");
const completionMood = document.querySelector("#completion-mood");
const statisticsCount = document.querySelector("#statistics-count");
const statisticsTaskStatus = document.querySelector("#statistics-task-status");
const completedHeading = document.querySelector("#completed-heading");
const completedEmptyMessage = document.querySelector("#completed-empty-message");
const completedTaskList = document.querySelector("#completed-task-list");
const completedPagination = document.querySelector("#completed-pagination");
const previousPageButton = document.querySelector("#previous-page");
const nextPageButton = document.querySelector("#next-page");
const paginationStatus = document.querySelector("#pagination-status");
const openNotificationsButton = document.querySelector("#open-notifications");
const closeNotificationsButton = document.querySelector("#close-notifications");
const notificationsModal = document.querySelector("#notifications-modal");
const notificationBadge = document.querySelector("#notification-badge");
const notificationList = document.querySelector("#notification-list");
const notificationsEmptyMessage = document.querySelector("#notifications-empty-message");
const notificationCategoryFilter = document.querySelector("#notification-category-filter");
const notificationToast = document.querySelector("#notification-toast");
const notificationToastTitle = document.querySelector("#notification-toast-title");
const notificationToastMessage = document.querySelector("#notification-toast-message");
const closeThemesButton = document.querySelector("#close-themes");
const themesModal = document.querySelector("#themes-modal");
const themeOptions = document.querySelector("#theme-options");
const settingsToggle = document.querySelector("#toggle-settings");
const settingsMenu = document.querySelector("#settings-menu");
const darkModeToggle = document.querySelector("#toggle-dark-mode");
const darkModeStatus = document.querySelector("#dark-mode-status");
const informationDarkModeToggle = document.querySelector("#information-dark-mode");
const informationDarkModeStatus = document.querySelector("#information-dark-mode-status");
const informationModal = document.querySelector("#information-modal");
const closeInformationButton = document.querySelector("#close-information");
const currentYear = document.querySelector("#current-year");

// Estado em memória da aplicação; listas e controles visuais são atualizados a partir daqui.
let tasks = [];
let nextTaskId = 1;
let showCompletedTasks = false;
let taskListPage = 0;
let taskSearchQuery = "";
let focusedTaskId = null;
let statisticsTasksPage = 0;
let notifications = [];
let notificationId = 1;
let achievedMilestones = [];
let toastQueue = [];
let activeToastTimer = null;
let toastHideTimer = null;
let statisticsTransitionTimer = null;
let completionAnimationFrame = null;
let selectedTheme = "forest";
let isDarkMode = false;

// Limites de paginação e marcos usados nas telas de tarefas e estatísticas.
const completedTasksPageSize = 5;
const taskListPageSize = 10;
const achievementMilestones = [20, 30, 40, 50, 60, 70, 80, 90, 100];

// Cada tema agrupa as cores de prévia e as variáveis CSS que serão aplicadas à página.
const themes = [
  {
    id: "forest",
    name: "Floresta",
    premium: false,
    colors: ["#28613d", "#8fb99a", "#e7f1e9"],
    variables: {
      accent: "#28613d",
      accentDark: "#1d4b2f",
      accentText: "#38664b",
      accentSoft: "#edf4ef",
      accentSoftStrong: "#f0f7f2",
      accentBorder: "#dce9df",
      accentHover: "#b7cdbd",
      accentFocus: "#9cc9aa",
      scrollbarThumb: "#6b9b76",
      chartTrack: "#dfe9e1",
    },
  },
  {
    id: "ocean",
    name: "Oceano",
    premium: false,
    colors: ["#2563a6", "#83b5df", "#e5f1fb"],
    variables: {
      accent: "#2563a6",
      accentDark: "#1b4c82",
      accentText: "#285b8f",
      accentSoft: "#edf5fc",
      accentSoftStrong: "#eaf4fc",
      accentBorder: "#d2e5f4",
      accentHover: "#afcde5",
      accentFocus: "#94c3e6",
      scrollbarThumb: "#6398c2",
      chartTrack: "#dcebf6",
    },
  },
  {
    id: "lavender",
    name: "Lavanda",
    premium: false,
    colors: ["#7352a3", "#b39bd4", "#f0eafa"],
    variables: {
      accent: "#7352a3",
      accentDark: "#583b83",
      accentText: "#674b91",
      accentSoft: "#f4effa",
      accentSoftStrong: "#f1ebf8",
      accentBorder: "#e3d8f0",
      accentHover: "#ccbee0",
      accentFocus: "#c0a9df",
      scrollbarThumb: "#9176b8",
      chartTrack: "#e8dff2",
    },
  },
  {
    id: "sunset",
    name: "Pôr do sol",
    premium: false,
    colors: ["#c05b32", "#e8a47f", "#faeee8"],
    variables: {
      accent: "#b9532c",
      accentDark: "#913f22",
      accentText: "#a84d2b",
      accentSoft: "#fbf1eb",
      accentSoftStrong: "#faeee8",
      accentBorder: "#efd9cb",
      accentHover: "#e3bba5",
      accentFocus: "#e6ad8e",
      scrollbarThumb: "#c67a54",
      chartTrack: "#f2dfd3",
    },
  },
  {
    id: "amethyst",
    name: "Ametista",
    premium: true,
    colors: ["#5939a6", "#9d86df", "#eee9fb"],
    variables: {
      accent: "#5939a6",
      accentDark: "#40277e",
      accentText: "#52358f",
      accentSoft: "#f2effb",
      accentSoftStrong: "#eee9fb",
      accentBorder: "#ddd5f2",
      accentHover: "#bdb0e3",
      accentFocus: "#ab98e4",
      scrollbarThumb: "#8069c2",
      chartTrack: "#e2dcf4",
    },
  },
  {
    id: "rose",
    name: "Rosa",
    premium: true,
    colors: ["#b33c68", "#e09ab2", "#faeaf0"],
    variables: {
      accent: "#a8325c",
      accentDark: "#822448",
      accentText: "#9c3157",
      accentSoft: "#fbf0f4",
      accentSoftStrong: "#faeaf0",
      accentBorder: "#efd3de",
      accentHover: "#dfb0c1",
      accentFocus: "#df9db3",
      scrollbarThumb: "#c66d8b",
      chartTrack: "#f2dce5",
    },
  },
  {
    id: "midnight",
    name: "Meia-noite",
    premium: true,
    colors: ["#34506f", "#8ca9c4", "#e8eff6"],
    variables: {
      accent: "#34506f",
      accentDark: "#263c55",
      accentText: "#344f6d",
      accentSoft: "#eef3f8",
      accentSoftStrong: "#e8eff6",
      accentBorder: "#d6e0ea",
      accentHover: "#b4c4d4",
      accentFocus: "#a5bbd1",
      scrollbarThumb: "#718ca8",
      chartTrack: "#dfe8f0",
    },
  },
  {
    id: "gold",
    name: "Dourado",
    premium: true,
    colors: ["#98701b", "#d0b46a", "#f7f1df"],
    variables: {
      accent: "#8d6818",
      accentDark: "#6d5011",
      accentText: "#846116",
      accentSoft: "#f8f4e8",
      accentSoftStrong: "#f7f1df",
      accentBorder: "#e9dfbf",
      accentHover: "#d7c58f",
      accentFocus: "#d1bb76",
      scrollbarThumb: "#ae9146",
      chartTrack: "#eee6ce",
    },
  },
];

const createTask = (text) => ({
  id: nextTaskId++,
  text,
  completed: false,
  createdAt: new Date(),
});

// Monta as opções de tema e mantém a seleção atual refletida na interface.
const createThemeOption = (theme) => {
  const option = document.createElement("button");
  option.className = "theme-option";
  option.type = "button";
  option.dataset.themeId = theme.id;
  option.setAttribute("aria-pressed", String(theme.id === selectedTheme));
  option.style.setProperty("--theme-preview-primary", theme.colors[0]);
  option.style.setProperty("--theme-preview-secondary", theme.colors[1]);
  option.style.setProperty("--theme-preview-soft", theme.colors[2]);

  const preview = document.createElement("span");
  preview.className = "theme-preview";
  preview.setAttribute("aria-hidden", "true");

  const name = document.createElement("span");
  name.className = "theme-name";
  name.textContent = theme.name;

  const status = document.createElement("span");
  status.className = "theme-status";
  status.textContent = theme.premium ? "Premium" : "Grátis";
  if (theme.premium) status.classList.add("is-premium");

  option.append(preview, name, status);
  return option;
};

const renderThemeOptions = () => {
  themeOptions.replaceChildren(...themes.map(createThemeOption));
};

// Aplica as cores do tema nas variáveis CSS globais.
const applyTheme = (themeId) => {
  const theme = themes.find((option) => option.id === themeId);
  if (!theme) return;

  selectedTheme = theme.id;
  document.documentElement.dataset.theme = theme.id;
  Object.entries(theme.variables).forEach(([name, value]) => {
    const cssVariable = name.replace(
      /[A-Z]/g,
      (letter) => `-${letter.toLowerCase()}`,
    );
    document.documentElement.style.setProperty(`--theme-${cssVariable}`, value);
  });
  renderThemeOptions();
};

const setDarkMode = (enabled) => {
  isDarkMode = enabled;
  document.documentElement.dataset.colorMode = enabled ? "dark" : "light";
  darkModeToggle.setAttribute("aria-pressed", String(enabled));
  informationDarkModeToggle.setAttribute("aria-pressed", String(enabled));
  darkModeStatus.textContent = enabled ? "Ativado" : "Desativado";
  informationDarkModeStatus.textContent = enabled
    ? "Ativado. Toque para desativar."
    : "Desativado. Toque para ativar.";
};

const toggleDarkMode = () => {
  setDarkMode(!isDarkMode);
};

const openThemesModal = () => {
  renderThemeOptions();
  themesModal.showModal();
};

const handleThemeOptionsClick = (event) => {
  const selectedOption = event.target.closest("[data-theme-id]");
  if (!selectedOption) return;

  applyTheme(selectedOption.dataset.themeId);
};

const handleThemesModalClick = (event) => {
  if (event.target === themesModal) themesModal.close();
};

const handleThemesModalClose = () => {
  settingsToggle.focus();
};

const setSettingsMenuOpen = (isOpen) => {
  settingsMenu.hidden = !isOpen;
  settingsToggle.setAttribute("aria-expanded", String(isOpen));
};

const handleSettingsToggleClick = () => {
  setSettingsMenuOpen(settingsMenu.hidden);
};

const handleSettingsMenuClick = (event) => {
  const actionButton = event.target.closest("[data-settings-action]");
  if (!actionButton) return;

  setSettingsMenuOpen(false);
  if (actionButton.dataset.settingsAction === "dark-mode") {
    toggleDarkMode();
    return;
  }
  if (actionButton.dataset.settingsAction === "themes") openThemesModal();
  if (actionButton.dataset.settingsAction === "statistics") openStatisticsModal();
  if (actionButton.dataset.settingsAction === "information") openInformationModal();
};

const handleDocumentClick = (event) => {
  if (!settingsMenu.hidden && !event.target.closest(".settings-control")) {
    setSettingsMenuOpen(false);
  }
};

const handleDocumentKeydown = (event) => {
  if (!informationModal.hidden && event.key === "Tab") {
    const focusableElements = [...informationModal.querySelectorAll("button:not(:disabled)")];
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
      return;
    }

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
      return;
    }

    if (informationModal.contains(document.activeElement)) return;
    event.preventDefault();
    firstElement.focus();
    return;
  }

  if (event.key !== "Escape") return;

  if (!informationModal.hidden) {
    closeInformationModal();
    return;
  }

  if (settingsMenu.hidden) return;

  setSettingsMenuOpen(false);
  settingsToggle.focus();
};

const openInformationModal = () => {
  informationModal.hidden = false;
  informationModal.classList.add("is-open");
  document.body.classList.add("information-modal-open");
  closeInformationButton.focus();
};

const closeInformationModal = () => {
  informationModal.classList.remove("is-open");
  informationModal.hidden = true;
  document.body.classList.remove("information-modal-open");
  settingsToggle.focus();
};

// Fecha as informações e encaminha para a ação escolhida pelo usuário.
const handleInformationModalClick = (event) => {
  const actionButton = event.target.closest("[data-info-action]");
  if (!actionButton) return;

  closeInformationModal();
  switch (actionButton.dataset.infoAction) {
    case "search":
      openSearchModal();
      break;
    case "notifications":
      openNotificationsModal();
      break;
    case "statistics":
      openStatisticsModal();
      break;
    case "themes":
      openThemesModal();
      break;
    case "dark-mode":
      toggleDarkMode();
      break;
    case "add-task":
      taskInput.focus();
      break;
    case "settings":
      setSettingsMenuOpen(true);
      settingsToggle.focus();
      break;
    default:
      break;
  }
};

// Constrói cada tarefa como elementos DOM, usando textContent para exibir o texto.
const createTaskElement = (task) => {
  const listItem = document.createElement("li");
  listItem.className = [
    "task-item",
    task.completed && "is-completed",
    task.id === focusedTaskId && "is-search-prioritized",
  ]
    .filter(Boolean)
    .join(" ");
  listItem.dataset.taskId = task.id;

  const checkbox = document.createElement("input");
  checkbox.className = "task-checkbox";
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.dataset.action = "toggle";
  checkbox.setAttribute(
    "aria-label",
    `${task.completed ? "Reabrir" : "Concluir"} tarefa: ${task.text}`,
  );

  const taskText = document.createElement("span");
  taskText.className = "task-text";
  taskText.textContent = task.text;

  const taskDate = document.createElement("time");
  const fullTaskDate = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "long",
  }).format(task.createdAt);
  taskDate.className = "task-date";
  taskDate.dateTime = task.createdAt.toISOString();
  taskDate.setAttribute("aria-label", `Criada em ${fullTaskDate}`);
  taskDate.textContent = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(task.createdAt);

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  deleteButton.type = "button";
  deleteButton.dataset.action = "delete";
  deleteButton.textContent = "Excluir";
  deleteButton.setAttribute("aria-label", `Excluir tarefa: ${task.text}`);

  listItem.append(checkbox, taskText, taskDate, deleteButton);
  return listItem;
};

const renderTasks = () => {
  // Mantém a tarefa encontrada em destaque e calcula apenas os itens da página atual.
  const hasFocusedTask = tasks.some((task) => task.id === focusedTaskId);
  searchOrderStatus.classList.toggle("is-active", hasFocusedTask);
  searchOrderStatus.classList.toggle("is-inactive", !hasFocusedTask);
  searchOrderLabel.textContent = hasFocusedTask
    ? "Ordem de busca ativa."
    : "Ordem de busca inativa.";

  const visibleTasks = tasks
    .filter((task) => showCompletedTasks || !task.completed)
    .sort(
      (firstTask, secondTask) =>
        Number(secondTask.id === focusedTaskId) - Number(firstTask.id === focusedTaskId) ||
        Number(firstTask.completed) - Number(secondTask.completed),
    );

  const pageCount = Math.ceil(visibleTasks.length / taskListPageSize);
  taskListPage = Math.min(taskListPage, Math.max(0, pageCount - 1));
  const pageStart = taskListPage * taskListPageSize;
  const currentPageTasks = visibleTasks.slice(pageStart, pageStart + taskListPageSize);

  taskList.replaceChildren(...currentPageTasks.map(createTaskElement));
  taskPagination.hidden = pageCount <= 1;
  taskPaginationStatus.textContent = `Página ${taskListPage + 1} de ${pageCount}`;
  previousTaskPageButton.disabled = taskListPage === 0;
  nextTaskPageButton.disabled = taskListPage >= pageCount - 1;
  emptyMessage.hidden = visibleTasks.length > 0;

  if (tasks.length > 0 && visibleTasks.length === 0) {
    emptyMessage.textContent =
      "Todas as tarefas foram concluídas. Ative a exibição para vê-las.";
  } else {
    emptyMessage.textContent = "Nenhuma tarefa por aqui. Adicione a primeira!";
  }
};

const createSearchResult = (task) => {
  const result = document.createElement("li");
  const resultButton = document.createElement("button");
  const resultText = document.createElement("span");
  const resultStatus = document.createElement("span");

  resultButton.className = "search-result";
  resultButton.type = "button";
  resultButton.dataset.taskId = task.id;
  resultText.className = "search-result-text";
  resultText.textContent = task.text;
  resultStatus.className = "search-result-status";
  resultStatus.textContent = task.completed ? "Concluída" : "Pendente";

  resultButton.append(resultText, resultStatus);
  result.append(resultButton);
  return result;
};

const renderSearchResults = () => {
  const matchingTasks = taskSearchQuery
    ? tasks
        .filter((task) =>
          task.text
            .toLocaleLowerCase()
            .startsWith(taskSearchQuery.toLocaleLowerCase()),
        )
        .sort((firstTask, secondTask) => Number(firstTask.completed) - Number(secondTask.completed))
    : [];

  searchResults.replaceChildren(...matchingTasks.map(createSearchResult));
  searchResults.hidden = matchingTasks.length === 0;
  searchEmptyMessage.hidden = !taskSearchQuery || matchingTasks.length > 0;
};

const createCompletedTaskItem = (task) => {
  const listItem = document.createElement("li");
  listItem.className = "completed-task-item";
  listItem.textContent = task.text;
  return listItem;
};

// Anima o gráfico até o valor calculado, respeitando a preferência por movimento reduzido.
const animateCompletionChart = (targetPercentage, restartFromZero = false) => {
  window.cancelAnimationFrame(completionAnimationFrame);

  const startingPercentage = restartFromZero
    ? 0
    : Number.parseInt(completionPercentage.textContent, 10) || 0;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReducedMotion || startingPercentage === targetPercentage) {
    completionChart.style.setProperty(
      "--completion-rate",
      `${targetPercentage}%`,
    );
    completionPercentage.textContent = `${targetPercentage}%`;
    return;
  }

  if (restartFromZero) {
    completionChart.style.setProperty("--completion-rate", "0%");
    completionPercentage.textContent = "0%";
  }

  const animationDuration = 650;
  let animationStartTime;

  const updateChart = (currentTime) => {
    if (animationStartTime === undefined) animationStartTime = currentTime;

    const progress = Math.min(
      (currentTime - animationStartTime) / animationDuration,
      1,
    );
    const easedProgress = 1 - (1 - progress) ** 3;
    const currentPercentage =
      startingPercentage +
      (targetPercentage - startingPercentage) * easedProgress;

    completionChart.style.setProperty(
      "--completion-rate",
      `${currentPercentage}%`,
    );
    completionPercentage.textContent = `${Math.round(currentPercentage)}%`;

    if (progress < 1) {
      completionAnimationFrame = window.requestAnimationFrame(updateChart);
      return;
    }

    completionChart.style.setProperty(
      "--completion-rate",
      `${targetPercentage}%`,
    );
    completionPercentage.textContent = `${targetPercentage}%`;
    completionAnimationFrame = null;
  };

  completionAnimationFrame = window.requestAnimationFrame(updateChart);
};

const renderStatistics = (restartChartFromZero = false) => {
  // O filtro determina os itens, a contagem e a porcentagem exibidos nas estatísticas.
  const selectedStatus = statisticsTaskStatus.value;
  const displayedTasks = tasks.filter((task) =>
    selectedStatus === "completed" ? task.completed : !task.completed,
  );
  const isShowingCompleted = selectedStatus === "completed";
  const displayedCount = displayedTasks.length;
  const percentage = tasks.length
    ? Math.round((displayedCount / tasks.length) * 100)
    : 0;
  const pageCount = Math.ceil(displayedTasks.length / completedTasksPageSize);

  statisticsTasksPage = Math.min(
    statisticsTasksPage,
    Math.max(0, pageCount - 1),
  );

  animateCompletionChart(percentage, restartChartFromZero);
  completionChart.classList.toggle("is-pending", !isShowingCompleted);
  completionMood.classList.toggle("is-positive", isShowingCompleted);
  completionMood.classList.toggle("is-negative", !isShowingCompleted);
  completionMood.textContent = isShowingCompleted ? "☺" : "☹";
  completionChart.setAttribute(
    "aria-label",
    `${percentage}% das tarefas ${isShowingCompleted ? "concluídas" : "não concluídas"}`,
  );
  completionChartLabel.textContent = isShowingCompleted
    ? "concluídas"
    : "não concluídas";
  statisticsCount.textContent = `${displayedCount} de ${tasks.length} ${
    tasks.length === 1
      ? isShowingCompleted
        ? "tarefa concluída"
        : "tarefa não concluída"
      : isShowingCompleted
        ? "tarefas concluídas"
        : "tarefas não concluídas"
  }`;

  const pageStart = statisticsTasksPage * completedTasksPageSize;
  const currentPageTasks = displayedTasks.slice(
    pageStart,
    pageStart + completedTasksPageSize,
  );
  completedTaskList.replaceChildren(...currentPageTasks.map(createCompletedTaskItem));
  completedTaskList.classList.toggle("is-pending", !isShowingCompleted);

  completedHeading.textContent = isShowingCompleted
    ? "Tarefas concluídas"
    : "Tarefas não concluídas";
  completedEmptyMessage.textContent = isShowingCompleted
    ? "Ainda não há tarefas concluídas."
    : "Não há tarefas pendentes.";
  completedEmptyMessage.hidden = displayedTasks.length > 0;
  completedPagination.hidden = pageCount <= 1;
  completedPagination.setAttribute(
    "aria-label",
    `Paginação das tarefas ${isShowingCompleted ? "concluídas" : "não concluídas"}`,
  );
  paginationStatus.textContent = `Página ${statisticsTasksPage + 1} de ${pageCount}`;
  previousPageButton.disabled = statisticsTasksPage === 0;
  nextPageButton.disabled = statisticsTasksPage >= pageCount - 1;
};

const createNotification = (category, title, message) => {
  const notification = {
    id: notificationId++,
    category,
    title,
    message,
    createdAt: new Date(),
    read: false,
  };

  notifications.push(notification);
  renderNotificationBadge();
  renderNotifications();
  queueNotificationToast(notification);
};

// Recalcula o indicador de notificações não lidas e sua descrição acessível.
const renderNotificationBadge = () => {
  const unreadCount = notifications.filter((notification) => !notification.read).length;
  notificationBadge.hidden = unreadCount === 0;
  notificationBadge.textContent = unreadCount > 99 ? "99+" : String(unreadCount);
  openNotificationsButton.setAttribute(
    "aria-label",
    unreadCount
      ? `Abrir notificações, ${unreadCount} não lidas`
      : "Abrir notificações",
  );
};

const createNotificationItem = (notification) => {
  const item = document.createElement("li");
  item.className = `notification-item notification-${notification.category}`;
  item.dataset.notificationId = notification.id;

  const heading = document.createElement("div");
  heading.className = "notification-item-heading";

  const title = document.createElement("strong");
  title.textContent = notification.title;

  const timestamp = document.createElement("time");
  timestamp.dateTime = notification.createdAt.toISOString();
  timestamp.textContent = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(notification.createdAt);

  const message = document.createElement("p");
  message.textContent = notification.message;

  heading.append(title, timestamp);
  item.append(heading, message);
  return item;
};

const renderNotifications = () => {
  const selectedCategory = notificationCategoryFilter.value;
  const filteredNotifications =
    selectedCategory === "all"
      ? notifications
      : notifications.filter(
          (notification) => notification.category === selectedCategory,
        );

  notificationList.replaceChildren(
    ...filteredNotifications.map(createNotificationItem),
  );
  notificationsEmptyMessage.hidden = filteredNotifications.length > 0;
  notificationsEmptyMessage.textContent = notifications.length
    ? "Nenhuma notificação nesta categoria."
    : "Suas celebrações e conquistas aparecerão aqui.";
};

const displayNextNotificationToast = () => {
  if (activeToastTimer || toastQueue.length === 0) return;

  const notification = toastQueue.shift();
  notificationToastTitle.textContent = notification.title;
  notificationToastMessage.textContent = notification.message;
  notificationToast.hidden = false;
  requestAnimationFrame(() => notificationToast.classList.add("is-visible"));

  activeToastTimer = window.setTimeout(() => {
    notificationToast.classList.remove("is-visible");
    toastHideTimer = window.setTimeout(() => {
      notificationToast.hidden = true;
      activeToastTimer = null;
      toastHideTimer = null;
      displayNextNotificationToast();
    }, 220);
  }, 3600);
};

// Uma notificação por vez evita que os avisos temporários se sobreponham.
const queueNotificationToast = (notification) => {
  toastQueue.push(notification);
  displayNextNotificationToast();
};

const notifyTaskCompleted = (task, previousCompletionRate, currentCompletionRate) => {
  createNotification(
    "task-completed",
    "Tarefa concluída!",
    `Parabéns por concluir “${task.text}”. Continue assim!`,
  );

  const crossedMilestones = achievementMilestones.filter(
    (milestone) =>
      previousCompletionRate < milestone &&
      currentCompletionRate >= milestone &&
      !achievedMilestones.includes(milestone),
  );

  if (crossedMilestones.length > 0) {
    achievedMilestones.push(...crossedMilestones);
    const mostRelevantMilestone = Math.max(...crossedMilestones);

    createNotification(
      "achievement",
      `Conquista desbloqueada: ${mostRelevantMilestone}%`,
      `Você concluiu ${mostRelevantMilestone}% das suas tarefas. Excelente progresso!`,
    );
  }
};

// Operações centrais sobre as tarefas: criação, conclusão e remoção.
const addTask = (text) => {
  tasks = [...tasks, createTask(text)];
  const visibleTaskCount = tasks.filter(
    (task) => showCompletedTasks || !task.completed,
  ).length;
  taskListPage = Math.floor((visibleTaskCount - 1) / taskListPageSize);
  renderTasks();
};

const toggleTask = (taskId, completed) => {
  const previousCompletedCount = tasks.filter((task) => task.completed).length;
  const totalTaskCount = tasks.length;
  const taskBeingUpdated = tasks.find((task) => task.id === taskId);

  tasks = tasks.map((task) =>
    task.id === taskId ? { ...task, completed } : task,
  );

  if (completed && taskBeingUpdated && !taskBeingUpdated.completed) {
    const previousCompletionRate = totalTaskCount
      ? (previousCompletedCount / totalTaskCount) * 100
      : 0;
    const currentCompletionRate = totalTaskCount
      ? ((previousCompletedCount + 1) / totalTaskCount) * 100
      : 0;

    notifyTaskCompleted(
      taskBeingUpdated,
      previousCompletionRate,
      currentCompletionRate,
    );
  }

  renderTasks();
};

const deleteTask = (taskId) => {
  const deletedTask = tasks.find((task) => task.id === taskId);
  if (!deletedTask) return;

  tasks = tasks.filter((task) => task.id !== taskId);
  if (focusedTaskId === taskId) focusedTaskId = null;
  createNotification(
    "task-deleted",
    "Tarefa excluída",
    `A tarefa “${deletedTask.text}” foi excluída.`,
  );
  renderTasks();
};

const handleFormSubmit = (event) => {
  event.preventDefault();

  const taskText = taskInput.value.trim();
  if (!taskText) {
    taskInput.focus();
    return;
  }

  addTask(taskText);
  taskForm.reset();
  taskInput.focus();
};

// A lista usa delegação de eventos para tratar ações nos itens criados dinamicamente.
const handleTaskListChange = (event) => {
  const checkbox = event.target.closest('[data-action="toggle"]');
  if (!checkbox) return;

  const listItem = checkbox.closest("[data-task-id]");
  if (!listItem) return;

  toggleTask(Number(listItem.dataset.taskId), checkbox.checked);
};

const handleTaskListClick = (event) => {
  const deleteButton = event.target.closest('[data-action="delete"]');
  if (!deleteButton) return;

  const listItem = deleteButton.closest("[data-task-id]");
  if (!listItem) return;

  deleteTask(Number(listItem.dataset.taskId));
};

const handleCompletedFilterChange = () => {
  showCompletedTasks = completedFilter.checked;
  taskListPage = 0;
  renderTasks();
};

const handlePreviousTaskPage = () => {
  if (taskListPage === 0) return;
  taskListPage -= 1;
  renderTasks();
};

const handleNextTaskPage = () => {
  const visibleTaskCount = tasks.filter(
    (task) => showCompletedTasks || !task.completed,
  ).length;
  const pageCount = Math.ceil(visibleTaskCount / taskListPageSize);
  if (taskListPage >= pageCount - 1) return;

  taskListPage += 1;
  renderTasks();
};

const openSearchModal = () => {
  searchModal.showModal();
  searchInput.focus();
};

// Abre as estatísticas com dados e animação reiniciados para uma leitura consistente.
const openStatisticsModal = () => {
  statisticsTasksPage = 0;
  window.cancelAnimationFrame(completionAnimationFrame);
  completionAnimationFrame = null;
  completionChart.style.setProperty("--completion-rate", "0%");
  completionPercentage.textContent = "0%";
  renderStatistics();
  statisticsModal.showModal();
};

const closeStatisticsModal = () => {
  statisticsModal.close();
};

const handleStatisticsModalClick = (event) => {
  if (event.target === statisticsModal) closeStatisticsModal();
};

const handleStatisticsModalClose = () => {
  settingsToggle.focus();
};

const handlePreviousCompletedTasksPage = () => {
  if (statisticsTasksPage === 0) return;
  statisticsTasksPage -= 1;
  renderStatistics();
};

const handleNextCompletedTasksPage = () => {
  const pageCount = Math.ceil(
    tasks.filter((task) =>
      statisticsTaskStatus.value === "completed" ? task.completed : !task.completed,
    ).length / completedTasksPageSize,
  );
  if (statisticsTasksPage >= pageCount - 1) return;
  statisticsTasksPage += 1;
  renderStatistics();
};

const handleStatisticsTaskStatusChange = () => {
  window.clearTimeout(statisticsTransitionTimer);
  statisticsPanel.classList.add("is-changing");

  statisticsTransitionTimer = window.setTimeout(() => {
    statisticsTasksPage = 0;
    renderStatistics(true);
    window.requestAnimationFrame(() => {
      statisticsPanel.classList.remove("is-changing");
    });
  }, 100);
};

const openNotificationsModal = () => {
  notifications.forEach((notification) => {
    notification.read = true;
  });
  renderNotificationBadge();
  renderNotifications();
  notificationsModal.showModal();
};

const closeNotificationsModal = () => {
  notificationsModal.close();
};

const handleNotificationsModalClick = (event) => {
  if (event.target === notificationsModal) closeNotificationsModal();
};

const handleNotificationsModalClose = () => {
  openNotificationsButton.focus();
};

const handleNotificationCategoryChange = () => {
  renderNotifications();
};

// A busca é atualizada enquanto o usuário digita e também ao enviar o formulário.
const handleSearchKeyup = () => {
  taskSearchQuery = searchInput.value.trim();
  renderSearchResults();
};

const handleSearchSubmit = (event) => {
  event.preventDefault();
  taskSearchQuery = searchInput.value.trim();
  renderSearchResults();
};

const handleSearchResultsClick = (event) => {
  const resultButton = event.target.closest(".search-result");
  if (!resultButton) return;

  const selectedTask = tasks.find(
    (task) => task.id === Number(resultButton.dataset.taskId),
  );
  if (!selectedTask) return;

  focusedTaskId = selectedTask.id;
  taskListPage = 0;
  if (selectedTask.completed) {
    showCompletedTasks = true;
    completedFilter.checked = true;
  }

  renderTasks();
  searchModal.close();
};

// Limpa os filtros e remove o destaque aplicado ao resultado da busca anterior.
const clearSearch = () => {
  searchInput.value = "";
  taskSearchQuery = "";
  focusedTaskId = null;
  renderSearchResults();
  renderTasks();

  if (searchModal.open) searchInput.focus();
};

const handleSearchModalClick = (event) => {
  if (event.target === searchModal) searchModal.close();
};

const handleSearchModalClose = () => {
  searchInput.value = "";
  taskSearchQuery = "";
  renderSearchResults();
  openSearchButton.focus();
};

// Registra os eventos uma única vez, inclusive nos controles das telas modais.
taskForm.addEventListener("submit", handleFormSubmit);
taskList.addEventListener("change", handleTaskListChange);
taskList.addEventListener("click", handleTaskListClick);
completedFilter.addEventListener("change", handleCompletedFilterChange);
openSearchButton.addEventListener("click", openSearchModal);
closeSearchButton.addEventListener("click", () => searchModal.close());
searchInput.addEventListener("keyup", handleSearchKeyup);
searchForm.addEventListener("submit", handleSearchSubmit);
searchResults.addEventListener("click", handleSearchResultsClick);
clearSearchButton.addEventListener("click", clearSearch);
searchModal.addEventListener("click", handleSearchModalClick);
searchModal.addEventListener("close", handleSearchModalClose);
closeStatisticsButton.addEventListener("click", closeStatisticsModal);
statisticsModal.addEventListener("click", handleStatisticsModalClick);
statisticsModal.addEventListener("close", handleStatisticsModalClose);
previousPageButton.addEventListener("click", handlePreviousCompletedTasksPage);
nextPageButton.addEventListener("click", handleNextCompletedTasksPage);
statisticsTaskStatus.addEventListener("change", handleStatisticsTaskStatusChange);
openNotificationsButton.addEventListener("click", openNotificationsModal);
closeNotificationsButton.addEventListener("click", closeNotificationsModal);
notificationsModal.addEventListener("click", handleNotificationsModalClick);
notificationsModal.addEventListener("close", handleNotificationsModalClose);
notificationCategoryFilter.addEventListener("change", handleNotificationCategoryChange);
previousTaskPageButton.addEventListener("click", handlePreviousTaskPage);
nextTaskPageButton.addEventListener("click", handleNextTaskPage);
closeThemesButton.addEventListener("click", () => themesModal.close());
themeOptions.addEventListener("click", handleThemeOptionsClick);
themesModal.addEventListener("click", handleThemesModalClick);
themesModal.addEventListener("close", handleThemesModalClose);
settingsToggle.addEventListener("click", handleSettingsToggleClick);
settingsMenu.addEventListener("click", handleSettingsMenuClick);
document.addEventListener("click", handleDocumentClick);
document.addEventListener("keydown", handleDocumentKeydown);
closeInformationButton.addEventListener("click", closeInformationModal);
informationModal.addEventListener("click", handleInformationModalClick);

// Completa o rodapé e desenha as opções iniciais de tema ao carregar o script.
currentYear.textContent = String(new Date().getFullYear());
setDarkMode(isDarkMode);
renderThemeOptions();
