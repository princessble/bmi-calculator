// ===============================
// STEP A: GET ELEMENTS FROM THE PAGE (DOM)
// ===============================
const bmiForm = document.getElementById("bmiForm");
const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");

const resultSection = document.getElementById("result");
const bmiValueEl = document.getElementById("bmiValue");
const bmiCategoryEl = document.getElementById("bmiCategory");
const bmiTipEl = document.getElementById("bmiTip");

const bmiIndicator = document.getElementById("bmi-indicator");

const errorEl = document.getElementById("error");
const resetBtn = document.getElementById("resetBtn");

// ===============================
// STEP B: SMALL HELPERS (ERROR UI)
// ===============================
function showError(message) {
  errorEl.textContent = message;
  errorEl.classList.remove("hidden");
  resultSection.classList.add("hidden");
}

function clearError() {
  errorEl.textContent = "";
  errorEl.classList.add("hidden");
}

// ===============================
// STEP C: VALIDATION
// ===============================
function validateInputs(heightCm, weightKg) {
  if (!heightCm || !weightKg) {
    return "Please enter both height and weight.";
  }

  if (heightCm < 50 || heightCm > 250) {
    return "Please enter a realistic height between 50cm and 250cm.";
  }

  if (weightKg < 10 || weightKg > 400) {
    return "Please enter a realistic weight between 10kg and 400kg.";
  }

  return null; // means “no error”
}

// ===============================
// STEP D: BMI CALCULATION
// BMI = kg / (m^2)
// ===============================
function calculateBMI(weightKg, heightCm) {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}

// ===============================
// STEP E: BMI CATEGORY + TIP
// ===============================
function getBMICategory(bmi) {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal weight";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

function getBMITip(category) {
  switch (category) {
    case "Underweight":
      return "Tip: Consider speaking with a healthcare professional about healthy weight gain.";
    case "Normal weight":
      return "Tip: Great! Maintain healthy habits with balanced meals and daily movement.";
    case "Overweight":
      return "Tip: Small consistent changes—like walking daily—can make a big difference.";
    case "Obese":
      return "Tip: Consider professional support for a structured nutrition and activity plan.";
    default:
      return "";
  }
}

// ===============================
// STEP F: MOVE THE INDICATOR BAR
// We clamp BMI to a visual range so it fits nicely on the bar.
// ===============================
function moveBMIIndicator(bmi) {
  const minBMI = 10;
  const maxBMI = 40;

  const clamped = Math.min(Math.max(bmi, minBMI), maxBMI);
  const percent = ((clamped - minBMI) / (maxBMI - minBMI)) * 100;

  bmiIndicator.style.left = `${percent}%`;
}

// ===============================
// STEP G: SUBMIT EVENT (MAIN FLOW)
// ===============================
bmiForm.addEventListener("submit", (event) => {
  event.preventDefault();
  clearError();

  const heightCm = Number(heightInput.value);
  const weightKg = Number(weightInput.value);

  const errorMessage = validateInputs(heightCm, weightKg);
  if (errorMessage) {
    showError(errorMessage);
    return;
  }

  const bmi = calculateBMI(weightKg, heightCm);
  const bmiRounded = bmi.toFixed(1);

  const category = getBMICategory(bmi);
  const tip = getBMITip(category);

  bmiValueEl.textContent = bmiRounded;
  bmiCategoryEl.textContent = category;
  bmiTipEl.textContent = tip;

  moveBMIIndicator(bmi);

  resultSection.classList.remove("hidden");
});

// ===============================
// STEP H: RESET BUTTON
// ===============================
resetBtn.addEventListener("click", () => {
  bmiForm.reset();
  clearError();

  resultSection.classList.add("hidden");
  bmiValueEl.textContent = "--";
  bmiCategoryEl.textContent = "--";
  bmiTipEl.textContent = "";

  bmiIndicator.style.left = "0%";
});

const yearEl = document.getElementById("year");
yearEl.textContent = new Date().getFullYear();
