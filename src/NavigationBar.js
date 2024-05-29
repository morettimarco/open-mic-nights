// Import necessary modules and components
import logo from "./assets/milano-2.png";
import { BsCaretDownSquareFill } from "react-icons/bs";

// Define the URL for the Google Form
const GoogleForm = "https://forms.gle/vDuLfQ7Bc9iKxT2o8";

// Define the NavigationBar component
function NavigationBar() {
  return (
    // Define the navigation bar
    <nav className="navbar is-light has-shadow py-2 mb-2">
      <div className="navbar-brand">
        <a className="navbar-item" style={{ padding: "0.9rem" }}>
          <img src={logo} style={{ maxHeight: "120px" }} />
        </a>
        <div className="navbar-start">
          <div className="navbar-item">
            <div className="title-subtitle-container">
              <p className="title" style={{ fontSize: "1.75rem" }}>
                Milan Standup Comedy Map
              </p>
              <p className="subtitle" style={{ fontSize: "0.875rem" }}>
                Perform comedy near you
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
          <a className="navbar-item navbar-item-centered" href={GoogleForm}>
            🎤 Submit an open mic night
          </a>
          <a
            className="js-modal-trigger navbar-item-centered"
            data-target="modal-js-example"
          >
            ❓ F.A.Q.
          </a>
          <a
            className="navbar-item navbar-item-centered"
            href="https://www.instagram.com/_anarchytect/"
          >
            📣 Contact me for feedbacks!
          </a>
        </div>
      </div>
    </nav>
  );
}

// Export the NavigationBar component
export default NavigationBar;

// Add an event listener for the DOMContentLoaded event
document.addEventListener("DOMContentLoaded", () => {
  // Define a function to open a modal
  function openModal($el) {
    $el.classList.add("is-active");
  }

  // Define a function to close a modal
  function closeModal($el) {
    $el.classList.remove("is-active");
  }

  // Define a function to close all modals
  function closeAllModals() {
    // Close each modal
    (document.querySelectorAll(".modal") || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event listener to each modal trigger
  (document.querySelectorAll(".js-modal-trigger") || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    // Open the target modal when the trigger is clicked
    $trigger.addEventListener("click", () => {
      openModal($target);
    });
  });

  // Add a click event listener to each modal close element
  (
    document.querySelectorAll(
      ".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button"
    ) || []
  ).forEach(($close) => {
    const $target = $close.closest(".modal");

    // Close the parent modal when the close element is clicked
    $close.addEventListener("click", () => {
      closeModal($target);
    });
  });

  // Add a keydown event listener to the document
  document.addEventListener("keydown", (event) => {
    // Close all modals when the Escape key is pressed
    if (event.code === "Escape") {
      closeAllModals();
    }
  });
});
