document.addEventListener("DOMContentLoaded", function() {
  // Data arrays (already correct)
  const packages = [
    {
      name: "Beach Getaway",
      photo:
        "https://cdn.pixabay.com/photo/2016/11/23/13/48/beach-1852945_640.jpg",
      description: "Enjoy a relaxing time at the sunny beaches of Bali. Inclusive of hotel stay and guided tours.",
    },
    {
      name: "Mountain Adventure",
      photo:
        "https://cdn.pixabay.com/photo/2016/11/14/03/26/cliff-1822484_640.jpg",
      description: "Explore the thrilling trails of the Himalayas. Package includes hiking, camping, and meals.",
    },
    {
      name: "City Life Experience",
      photo:
        "https://cdn.pixabay.com/photo/2017/03/29/15/18/tianjin-2185510_1280.jpg",
      description: "Discover the vibrant life of New York City. Comes with city tours and museum passes.",
    },
  ];

  const countryCodes = [
    { code: "+1", name: "USA" },
    { code: "+1", name: "Canada" },
    { code: "+52", name: "Mexico" },
    { code: "+852", name: "Hong Kong" },
    { code: "+44", name: "UK" },
    { code: "+33", name: "France" },
    { code: "+49", name: "Germany" },
    { code: "+66", name: "Thailand" },
    { code: "+84", name: "Vietnam" },
    { code: "+91", name: "India" },
    { code: "+27", name: "South Africa" },
    { code: "+61", name: "Australia" },
    { code: "+64", name: "New Zealand" },
    { code: "+971", name: "UAE" },
    { code: "+81", name: "Japan" },
    { code: "+82", name: "South Korea" },
    { code: "+39", name: "Italy" },
    { code: "+30", name: "Greece" },
    { code: "+90", name: "Turkey" },
    { code: "+55", name: "Brazil" },
    { code: "+54", name: "Argentina" },
    { code: "+56", name: "Chile" },
  ];

  // Function to populate country codes
  const countryCodeSelect = document.getElementById("countryCode");
  if (countryCodeSelect) {
    countryCodes.forEach(code => {
      const codeOpt = document.createElement("option");
      codeOpt.value = code.code;
      codeOpt.textContent = `${code.name} (${code.code})`;
      countryCodeSelect.appendChild(codeOpt);
    });
  }

  // Function to render packages
  const packagesContainer = document.getElementById("packages-container");
  function renderPackages(filteredPackages) {
    if (!packagesContainer) return;
    packagesContainer.innerHTML = "";
    filteredPackages.forEach(pkg => {
      const packageElement = document.createElement("div");
      packageElement.className = "package";
      packageElement.innerHTML = `
        <div class="image-container">
          <img src="${pkg.photo}" alt="${pkg.name}">
        </div>
        <h3 class="package-name">${pkg.name}</h3>
        <p class="package-description">${pkg.description}</p>
        <a href="#" class="book-now-btn">Book Now</a>
      `;
      packagesContainer.appendChild(packageElement);
    });
  }

  // Initial render
  renderPackages(packages);

  // Search functionality
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("keyup", function(event) {
      const value = event.target.value.toLowerCase();
      const filtered = packages.filter(pkg => pkg.name.toLowerCase().includes(value) || pkg.description.toLowerCase().includes(value));
      renderPackages(filtered);
    });
  }

  // Smooth scroll for About link
  const aboutLink = document.getElementById('aboutLink');
  if (aboutLink) {
    aboutLink.addEventListener('click', function(e) {
      e.preventDefault();
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // Bootstrap Carousel auto control
  let myCarousel = document.querySelector('#carouselExampleInterval');
  if (myCarousel) {
    new bootstrap.Carousel(myCarousel, {interval: 3000, ride: "carousel"});
  }

  // Form submission and validation
  const bookingForm = document.getElementById("bookingForm");
  if (bookingForm) {
    bookingForm.addEventListener("submit", function(e) {
      e.preventDefault();

      // Clear any existing error messages and success messages
      document.querySelectorAll(".error-message").forEach(el => el.remove());
      const oldSuccessMessage = document.getElementById("formSuccessMessage");
      if (oldSuccessMessage) {
        oldSuccessMessage.remove();
      }

      const phoneInput = document.getElementById("phone");
      const birthdayInput = document.getElementById("birthday");
      const phone = phoneInput.value.trim();
      const birthday = birthdayInput.value;
      let valid = true;

      // Helper function to show error below input
      function showError(inputElem, message) {
        const errorElem = document.createElement("div");
        errorElem.className = "error-message text-danger small mt-1";
        errorElem.textContent = message;
        inputElem.parentNode.insertBefore(errorElem, inputElem.nextSibling);
        valid = false;
      }

      // Validation checks
      if (phone.length !== 10) {
        showError(phoneInput, "Please enter a valid 10-digit phone number.");
      }

      const birthDate = new Date(birthday);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 18) {
        showError(birthdayInput, "You must be at least 18 years old.");
      }

      if (!valid) {
        return;
      }

      // On successful form submission, create and append the success message
      const successMessage = document.createElement("div");
      successMessage.id = "formSuccessMessage";
      successMessage.className = "text-success mt-2";
      successMessage.textContent = "Thanks for your interest, our tour experts will get back to you shortly!";
      
      bookingForm.appendChild(successMessage);
    });
  }
});