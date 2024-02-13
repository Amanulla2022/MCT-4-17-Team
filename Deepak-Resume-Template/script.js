function twocolumn() {
  const headerColorInput = document.getElementById("Header color");
  const headerTextColorInput = document.getElementById("Header-Text color");

  const headerElement = document.querySelector(".header");

  headerColorInput.addEventListener("input", updateHeaderColor);
  headerTextColorInput.addEventListener("input", updateHeaderTextColor);

  function updateHeaderColor() {
    headerElement.style.backgroundColor = this.value;
  }

  function updateHeaderTextColor() {
    headerElement.style.color = this.value;
  }

  const headerInputName = document.getElementById("Name");
  const headerInputJobTitle = document.getElementById("Wanted Job Title");

  headerInputName.addEventListener("input", updateHeader);
  headerInputJobTitle.addEventListener("input", updateHeader);

  function updateHeader() {
    const nameValue = headerInputName.value;
    const jobTitleValue = headerInputJobTitle.value;

    // Constructing the combined text with job title under the name
    const combinedText = `<div style="font-size: 40px; padding-top: 5px;">${nameValue}<br><span style="font-size: 18px; padding-top: 0;">${jobTitleValue}</span></div>`;

    headerElement.innerHTML = combinedText;
  }

  const skillsInput = document.getElementById("Skills");
  const skillHeading = document.getElementById("skill");
  const skillDescription = document.getElementById("skillDescription");

  skillsInput.addEventListener("input", function () {
    skillHeading.innerText = "SKILLS";
    skillDescription.innerText = this.value;
  });

  const phoneInput = document.getElementById("Phone");
  const phoneValue = document.getElementById("phoneValue");

  phoneInput.addEventListener("input", function () {
    phoneValue.textContent = this.value;
  });

  const mailInput = document.getElementById("E-mail-ID");
  const mailValue = document.getElementById("mailValue");

  mailInput.addEventListener("input", function () {
    mailValue.textContent = this.value;
  });

  const locationInput = document.getElementById("City");
  const locationValue = document.getElementById("locationvalue");

  locationInput.addEventListener("input", function () {
    locationValue.textContent = this.value;
  });

  const summaryinput = document.getElementById("Professional-Summary");
  const summaryvalue = document.getElementById("summaryvalue");

  summaryinput.addEventListener("input", function () {
    summaryvalue.textContent = this.value;
  });

  const employmentDiv = document.querySelector(".Employment");
  const addEmploymentButton = document.getElementById("addEmploymentButton");
  const employvalue = document.getElementById("employvalue");

  addEmploymentButton.addEventListener("click", function () {
    const textArea = document.createElement("textarea");
    textArea.setAttribute("name", "Employment");
    textArea.setAttribute("placeholder", "Employment");
    textArea.setAttribute("cols", "52");
    textArea.setAttribute("rows", "5");
    employmentDiv.appendChild(textArea);

    // Update employvalue when textarea value changes
    textArea.addEventListener("input", function () {
      employvalue.textContent = textArea.value;
    });
  });

  const projectDiv = document.querySelector(".project");
  const addProjectButton = document.getElementById("addprojectButton");
  const projectvalue = document.getElementById("projectvalue");

  addProjectButton.addEventListener("click", function () {
    const textArea = document.createElement("textarea");
    textArea.setAttribute("name", "Project");
    textArea.setAttribute("placeholder", "Project Details");
    textArea.setAttribute("cols", "52");
    textArea.setAttribute("rows", "5");
    projectDiv.appendChild(textArea);

    // Update projectvalue when textarea value changes
    textArea.addEventListener("input", function () {
      projectvalue.textContent = textArea.value;
    });
  });

  const educationalDiv = document.querySelector(".educational");
  const addeducationalButton = document.getElementById("addeducationalButton");
  const educationalvalue = document.getElementById("educationvalue");

  addeducationalButton.addEventListener("click", function () {
    const textArea = document.createElement("textarea");
    textArea.setAttribute("name", "Project");
    textArea.setAttribute("placeholder", "education Details");
    textArea.setAttribute("cols", "52");
    textArea.setAttribute("rows", "5");
    educationalDiv.appendChild(textArea);

    // Update projectvalue when textarea value changes
    textArea.addEventListener("input", function () {
      educationalvalue.textContent = textArea.value;
    });
  });

  // Add the event listener to handle template changes
  const optionSelect = document.getElementById("optionSelect");
  optionSelect.addEventListener("change", function () {
    const selectedTemplate = this.value;
    updateUI(selectedTemplate);
  });

  const downloadButton = document.getElementById("downloadButton");

  downloadButton.addEventListener("click", function () {
    const printContent = document.getElementById("printContent").innerHTML;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
  });

  function updateUI(selectedTemplate) {
    const rightContainer = document.querySelector(".rightcontainer");
    const skillDescription = document.getElementById("skillDescription");
    const contactDetails = document.querySelector(".contacts");
    const moveIcons = document.querySelector(".icons-move");
    const storage = document.querySelector(".storage");
    if (selectedTemplate === "Minimalist") {
      // Change the UI for Minimalist template
      rightContainer.style.flexDirection = "column";
      skillDescription.style.width = "100%";
      contactDetails.style.display = "none";

      moveIcons.style.display = "flex";
      moveIcons.style.marginTop = "50px";
      moveIcons.style.textAlign = "center";
      moveIcons.style.justifyContent = "space-between";
      moveIcons.style.alignItems = "center";
      moveIcons.style.paddingRight = "20px";

      // Move phone, mail, and location elements to the moveIcons
      moveIcons.appendChild(document.getElementById("phoneIcon"));
      moveIcons.appendChild(document.getElementById("mailIconContainer"));
      moveIcons.appendChild(document.getElementById("locationIcon"));

      // Move skills to the storage section
      storage.appendChild(document.getElementById("skill"));
      storage.appendChild(document.getElementById("skillDescription"));
    } else {
      // Reset to default for other template types
      rightContainer.style.flexDirection = "row";
      skillDescription.style.width = "";
      contactDetails.style.height = "block";

      // Move phone, mail, and location elements back to their original positions
      document
        .querySelector(".contacts")
        .appendChild(document.getElementById("phoneIcon"));
      document
        .querySelector(".contacts")
        .appendChild(document.getElementById("mailIconContainer"));
      document
        .querySelector(".contacts")
        .appendChild(document.getElementById("locationIcon"));
    }
  }
}

twocolumn();
