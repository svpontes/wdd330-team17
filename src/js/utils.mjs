// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {

  const data = localStorage.getItem(key);
  try {
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error("Erro ao fazer parse do localStorage:", e);
    return null;
  }
  
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// This function inserts a template string into a parent HTML element
// and optionally executes a callback with provided data
export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template; // Set the inner HTML of the parent element to the template
  if (callback) {
    callback(data); // If a callback function is provided, call it with the data
  }
}

// This asynchronous function loads an HTML template from a given file path
//Added error handling for safer execution
async function loadTemplate(path) {
  try {
    const res = await fetch(path); // Fetch the file from the specified path
    if (!res.ok) {
      throw new Error(`Failed to load template: ${res.status} ${res.statusText}`);
    }
    const template = await res.text(); // convert the response to text html
    return template; //return the Html template as a string
  } catch (error) {
    console.error("Error loading template:", error);
    return ""; //return an empty astring if there is an error
  } 
}

// This function loads and renders the header and footer templates into the page
export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html"); // Load the header template
  const footerTemplate = await loadTemplate("../partials/footer.html"); // Load the footer template

  const headerElement = document.querySelector("#main-header"); // Select the HTML element for the header
  const footerElement = document.querySelector("#main-footer"); // Select the HTML element for the footer

  renderWithTemplate(headerTemplate, headerElement); // Render the header template into the header element
  renderWithTemplate(footerTemplate, footerElement); // Render the footer template into the footer element
}
