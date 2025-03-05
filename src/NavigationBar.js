// Import necessary modules and components
import React, { useEffect } from "react";
import logo from "./assets/milano-2.png";
import { BsCaretDownSquareFill } from "react-icons/bs";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "./i18n";

// Define the URL for the Google Form
const GoogleForm = "https://forms.gle/vDuLfQ7Bc9iKxT2o8";

// Define the NavigationBar component
function NavigationBar() {
  // Get translations
  const { t } = useTranslation();
  // Set up modal functionality with React hooks
  useEffect(() => {
    // Functions to open and close modals
    function openModal($el) {
      $el.classList.add("is-active");
    }

    function closeModal($el) {
      $el.classList.remove("is-active");
    }

    function closeAllModals() {
      (document.querySelectorAll(".modal") || []).forEach(($modal) => {
        closeModal($modal);
      });
    }

    // Set up modal triggers
    const $modalTriggers = document.querySelectorAll(".js-modal-trigger");
    if ($modalTriggers) {
      $modalTriggers.forEach(($trigger) => {
        const modal = $trigger.dataset.target;
        const $target = document.getElementById(modal);

        if ($target) {
          $trigger.addEventListener("click", () => {
            openModal($target);
          });
        }
      });
    }

    // Set up modal close buttons
    const $modalCloseButtons = document.querySelectorAll(
      ".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button"
    );
    if ($modalCloseButtons) {
      $modalCloseButtons.forEach(($close) => {
        const $target = $close.closest(".modal");
        if ($target) {
          $close.addEventListener("click", () => {
            closeModal($target);
          });
        }
      });
    }

    // Close modals on escape key
    document.addEventListener("keydown", (event) => {
      if (event.code === "Escape") {
        closeAllModals();
      }
    });

    // Clean up event listeners on component unmount
    return () => {
      document.removeEventListener("keydown", closeAllModals);
    };
  }, []); // Empty dependency array means this runs once on mount

  // Function to handle FAQ click directly
  const handleFaqClick = () => {
    const modal = document.getElementById("modal-js-example");
    if (modal) {
      modal.classList.add("is-active");
    }
  };

  return (
    // Define the navigation bar
    <nav className="navbar is-light has-shadow py-2 mb-2">
      <div className="navbar-brand">
        <a className="navbar-item" style={{ padding: "0.9rem" }}>
          <img src={logo} style={{ maxHeight: "120px" }} alt="Milan Comedy Logo" />
        </a>
        <div className="navbar-start">
          <div className="navbar-item">
            <div className="title-subtitle-container">
              <p className="title" style={{ fontSize: "1.75rem" }}>
                {t.navigation.title}
              </p>
              <p className="subtitle" style={{ fontSize: "0.875rem" }}>
                {t.navigation.subtitle}
              </p>
            </div>
          </div>
          <div
            className="navbar-burger"
            onClick={() =>
              // Toggle the active state of the navigation links
              document.getElementById("nav-links").classList.toggle("is-active")
            }
          >
            <BsCaretDownSquareFill fontSize="1.5em" />
          </div>
        </div>
      </div>
      <div className="navbar-menu" id="nav-links">
        <div className="navbar-end">
          {/* Language Switcher */}
          <div className="navbar-item">
            <LanguageSwitcher />
          </div>
          
          <a className="navbar-item navbar-item-centered" href={GoogleForm}>
            {t.navigation.submitEvent}
          </a>
          <a
            className="js-modal-trigger navbar-item navbar-item-centered"
            data-target="modal-js-example"
            onClick={handleFaqClick}
            style={{ cursor: "pointer" }}
          >
            {t.navigation.faq}
          </a>
          <a
            className="navbar-item navbar-item-centered"
            href="https://www.instagram.com/_anarchytect/"
          >
            {t.navigation.contact}
          </a>
        </div>
      </div>
    </nav>
  );
}

// Export the NavigationBar component
export default NavigationBar;
