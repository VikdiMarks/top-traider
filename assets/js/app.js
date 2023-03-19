const pageName = document.title;

//* HEADER
const headerContent = document.querySelector(".header-content");
const burger = document.querySelector(".burger");

burger.addEventListener("click", () => {
  headerContent.classList.toggle("active");
});

if (window.innerWidth <= 768) {
  const headerLogo = document.querySelector(".header-logo");
  const header = document.querySelector("header");

  header.append(headerLogo);
}

//* MODAL WINDOW ADD COMPANY
class ModalWindow {
  constructor(modalWindow, buttonShow, buttonClose) {
    this.modalWindow = modalWindow;
    this.buttonShow = buttonShow;
    this.buttonClose = buttonClose;

    this.show = this.show.bind(this);
    this.close = this.close.bind(this);
  }

  show() {
    this.modalWindow.style.display = "flex";
  }

  close() {
    this.modalWindow.style.display = "none";
  }
}

if (pageName === "Top Traider") {
  const modalWindowInterface = new ModalWindow(
    document.querySelector(".add-company"),
    document.getElementsByName("show-modal-window")[0],
    document.querySelector(".add-company-close")
  );

  modalWindowInterface.buttonShow.addEventListener(
    "click",
    modalWindowInterface.show
  );

  modalWindowInterface.buttonClose.addEventListener(
    "click",
    modalWindowInterface.close
  );
}

//* CATEGORIES SETTINGS
//* SORTING
class AccordionInterface {
  constructor(accordion, button, panel) {
    this.accrodion = accordion;
    this.button = button;
    this.panel = panel;
  }

  #show() {
    this.panel.style.maxHeight = this.panel.scrollHeight + "px";

    this.#switchItem();
  }

  #close() {
    this.panel.style.maxHeight = null;
  }

  onClick() {
    document.addEventListener("click", (event) => {
      const targetEl = event.target;

      if (targetEl === this.button || targetEl.parentElement === this.button) {
        if (this.panel.style.maxHeight) this.#close();
        else this.#show();
      } else if (targetEl.className.indexOf("accordion") === -1) {
        this.#close();
      }
    });
  }

  #switchItem() {
    const items = [...this.panel.querySelectorAll(".accordion-item")];

    this.panel.addEventListener("click", (event) => {
      const targetEl = event.target;

      items.forEach((item) => {
        if (targetEl === item) {
          this.button.getElementsByTagName("span")[0].innerHTML =
            item.innerHTML;

          this.#close();
        }
      });
    });
  }
}

if (pageName === "Categories") {
  const accordionInterface = new AccordionInterface(
    document.querySelector(".accordion"),
    document.querySelector(".accordion-button"),
    document.querySelector(".accordion-panel")
  );

  accordionInterface.onClick();

  //*DISPlAY CARDS
  const panelDisplay = document.querySelector(".panel-settings-display");
  const displayLarge = document.querySelector(".display-large");
  const displayList = document.querySelector(".display-list");
  const companyCards = document.querySelector(".company-cards");

  panelDisplay.addEventListener("click", (event) => {
    const targetEl = event.target;

    if (targetEl === displayLarge || targetEl.parentElement === displayLarge) {
      companyCards.style.flexDirection = "row";
    } else if (
      targetEl === displayList ||
      targetEl.parentElement === displayList
    ) {
      companyCards.style.flexDirection = "column";
    }
  });

  //* CATEGPRIES FILTER
  const filters = document.querySelector(".filters");
  const filterItems = document.querySelectorAll(".filter");
  const usedFilters = document.querySelector(".used-filters");

  filterItems.forEach((filter) => {
    filter.addEventListener("click", (event) => {
      const target = event.target;
      const filterOptions = [...filter.querySelectorAll(".filter-option")];

      for (let i = 0; i < filterOptions.length; i++) {
        const checkbox = filterOptions[i].querySelector("input");

        if (target === checkbox) {
          if (target.checked === true) {
            const usedFilterItem = createUsedFilter(
              filterOptions[i].querySelector("span").innerHTML
            );

            usedFilters.append(usedFilterItem);
          } else {
            const filterValue =
              target.parentElement.querySelector("span").innerHTML;
            const usedFiltersItems =
              usedFilters.querySelectorAll(".used-filters-item");
            const quantity = usedFiltersItems.length;

            if (usedFiltersItems.length !== 0) {
              const usedFiltersItems = [
                ...usedFilters.querySelectorAll(".used-filters-item"),
              ];

              for (let j = 0; j < usedFiltersItems.length; j++) {
                const usedFilterValue =
                  usedFiltersItems[j].querySelector("span").innerHTML;

                if (usedFilterValue === filterValue) {
                  usedFiltersItems[j].remove();

                  break;
                }
              }
            }
          }

          break;
        }
      }
    });
  });

  usedFilters.addEventListener("click", (event) => {
    const target = event.target;
    const usedFiltersItems = [
      ...usedFilters.querySelectorAll(".used-filters-item"),
    ].map((el) => {
      return el.querySelector("button");
    });

    for (let i = 0; i < usedFiltersItems.length; i++) {
      if (target === usedFiltersItems[i]) {
        const usedFilterValue =
          usedFiltersItems[i].parentElement.querySelector("span").innerHTML;

        usedFiltersItems[i].parentElement.remove();

        document.getElementById(usedFilterValue).checked = false;
        break;
      }
    }
  });

  function createUsedFilter(value) {
    const usedFilterItem = document.createElement("div");

    usedFilterItem.classList.add("used-filters-item");
    usedFilterItem.append(
      document.createElement("button"),
      document.createElement("span")
    );

    usedFilterItem.querySelector("span").innerHTML = value;

    return usedFilterItem;
  }

  //* mobile version
  const showFilters = document.querySelector(".show-filters");

  showFilters.addEventListener("click", () => {
    filters.classList.toggle("active");
  });
}

if (pageName === "Recommended companies") {
  //* COMPANY INFORMATION PANEL
  const buttonSwitchComments = document.getElementsByName("comments")[0];
  const buttonSwitchInfo = document.getElementsByName("info")[0];

  buttonSwitchComments.addEventListener("click", () => {
    console.log(buttonSwitchComments);
    document.querySelector(".info").style.display = "none";
    document.querySelector(".comments").style.display = "block";
  });

  buttonSwitchInfo.addEventListener("click", () => {
    document.querySelector(".comments").style.display = "none";
    document.querySelector(".info").style.display = "block";
  });

  //* FEEDBACK
  const buttonFeedback = [
    ...document.querySelectorAll(".comments-item-buttons .button-gradient"),
  ];

  buttonFeedback.forEach((el) => {
    el.addEventListener("click", () => {
      el
        .closest(".comments-item")
        .querySelector(".comments-item-feedback").style.display = "block";
    });
  });
}
