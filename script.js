const wrapper = document.querySelector(".wrapper"),
  form = wrapper.querySelector("form"),
  fileInp = wrapper.querySelector('input[type="file"]'),
  img = wrapper.querySelector("img"),
  textarea = wrapper.querySelector("textarea"),
  closeBtn = wrapper.querySelector(".close"),
  copyBtn = wrapper.querySelector(".copy");

function fetchRequest(formData) {
  fetch("https://api.qrserver.com/v1/read-qr-code/", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((result) => {
    //   console.log(result);
      if (result && result[0] && result[0].symbol && result[0].symbol[0].data) {
        const qrData = result[0].symbol[0].data;
        textarea.value = qrData;
        wrapper.classList.add("active");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

fileInp.addEventListener("change", (e) => {
  let file = e.target.files[0]; // Getting user selected file
  let formData = new FormData(); // Creating new FormData object
  formData.append("file", file); // Adding selected file to FormData

  // Show the selected image
  let reader = new FileReader();
  reader.onload = () => {
    img.src = reader.result;
    img.style.display = "block";
  };
  reader.readAsDataURL(file);

  fetchRequest(formData);
});

form.addEventListener("click", () => {
  fileInp.click();
});

// Close button functionality
closeBtn.addEventListener("click", () => {
  wrapper.classList.remove("active");
  img.src = "#";
  img.style.display = "none";
  textarea.value = "";
});

// Copy text button functionality
copyBtn.addEventListener("click", () => {
  textarea.select();
  document.execCommand("copy");
  alert("Text copied to clipboard!");
});
