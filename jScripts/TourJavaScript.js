// תמונות מתחלפות
document.addEventListener("DOMContentLoaded", function () {
    let currentImageIndex = 0;
    var images = document.querySelectorAll('.slider-image'); // בחירת כל התמונות

    function showNextImage() {
        if (images[currentImageIndex]) {
            images[currentImageIndex].classList.remove('active'); // הסרת המחלקה מהתמונה הנוכחית
        }

        // עדכון האינדקס של התמונה הבאה
        currentImageIndex = (currentImageIndex + 1) % images.length;

        if (images[currentImageIndex]) {
            images[currentImageIndex].classList.add('active'); // הוספת המחלקה לתמונה הבאה
        }
    }

    // להציג את התמונה הראשונה מיד
    if (images[currentImageIndex]) {
        images[currentImageIndex].classList.add('active');
    }

    // להחליף תמונה כל 10 שניות
    setInterval(showNextImage, 10000);
});

function CurrencyIcon(selectedCurrency) {
    // כל האייקונים מוסתרים
    document.querySelectorAll('.currency-icon').forEach(icon => {
        icon.style.display = 'none';
    });

    // האייקון שנבחר מופיע
    var iconId = 'icon-' + selectedCurrency;
    document.getElementById(iconId).style.display = 'inline-block';
}

function MealPreferences() {
    var lunchCheckbox = document.getElementById('lunch');
    var mealPreferencesSection = document.getElementById('meal-preferences');

    if (lunchCheckbox.checked) {
        // Show the meal preferences section
        mealPreferencesSection.style.display = 'block';
    } else {
        // Hide the meal preferences section
        mealPreferencesSection.style.display = 'none';
    }
}

function ServiceIcon(serviceId) {
    var checkbox = document.getElementById(serviceId);
    var icon = document.getElementById('icon-' + serviceId);

    if (checkbox.checked) {
        // הופעה מלאה של אייקון כאשר שירות מסומן
        icon.style.opacity = '1';
    } else {
        // אייקון שקוף חלקית כאשר השירות אינו מסומן
        icon.style.opacity = '0.25';
    }
}

// פונקציה להצגת תיבת בקשה מיוחדת אם נבחר Special Request
function SpecialRequestTextbox() {
    const specialRequestCheckbox = document.getElementById('SpecialRequest'); // Target the checkbox
    const specialRequestTextbox = document.getElementById('specialRequestTextbox'); // Target the text area container
    specialRequestTextbox.style.display = specialRequestCheckbox.checked ? 'block' : 'none';
}

function changeParticipants(amount) {
    var participantsInput = document.getElementById('participants');
    var currentValue = parseInt(participantsInput.value);

    if (!isNaN(currentValue)) {
        var newValue = currentValue + amount;

        // Ensure the value stays within the specified range
        if (newValue >= participantsInput.min && newValue <= participantsInput.max) {
            participantsInput.value = newValue;
        }
    }
}

function validateForm()
{
    var totalCost = 150;
    // קבלת השדות הנדרשים בטופס
    var currency = document.querySelector('input[name="currency"]:checked').value; // מטבע שנבחר
    var departureCity = document.getElementById('departure').value; // עיר יציאה
    var tourDate = document.getElementById('tour-date').value; // תאריך הטיול
    var fullName = document.getElementById('full-name').value; // שם מלא
    var email = document.getElementById('email').value; // אימייל
    var participants = parseInt(document.getElementById('participants').value); // מספר המשתתפים

    var isFormValid = true; // אתחול משתנה בדיקה לטופס מלא

    // בדיקת שדה המטבע
    if (!currency) {
        document.getElementById('currency-error').innerText = "*";
        isFormValid = false;
    } else {
        document.getElementById('currency-error').innerText = "";
        if (currency === "dollar") {
            totalCost /= 4;
        }
        if (currency === "euro") {
            totalCost /= 5;
        }
    }

    // בדיקת שדה עיר יציאה
    if (departureCity === "") {
        document.getElementById('departure-error').innerText = "*";
        isFormValid = false;
    } else {
        document.getElementById('departure-error').innerText = "";
    }

    // בדיקת שדה תאריך הטיול
    if (tourDate === "") {
        document.getElementById('date-error').innerText = "*";
        isFormValid = false;
    } else {
        document.getElementById('date-error').innerText = "";
    }

    // בדיקת שדה שם מלא
    if (fullName === "") {
        document.getElementById('name-error').innerText = "*";
        isFormValid = false;
    } else {
        document.getElementById('name-error').innerText = "";
    }

    // בדיקת שדה אימייל
    if (email === "") {
        document.getElementById('email-error').innerText = "*";
        isFormValid = false;
    } else {
        document.getElementById('email-error').innerText = "";
    }

    // בדיקת סוג ארוחה
    var mealPreference = "";
    var lunchCheckbox = document.getElementById("lunch");
    if (lunchCheckbox && lunchCheckbox.checked) {
        totalCost *= 2;
        var selectedMeal = document.querySelector('input[name="meal-preference"]:checked');
        mealPreference = selectedMeal ? selectedMeal.nextElementSibling.textContent : "No meal preference selected";
    } else {
        mealPreference = "No meal preference selected";
    }


    // בדיקת ביטוח בריאות
    var hasHealthInsurance = document.getElementById("healthInsurance").checked ? "Yes" : "No";
    if (hasHealthInsurance === "Yes") {
        totalCost *= 4;
    }


    // בדיקת בקשה מיוחדת
    // Initialize specialRequest variable
    var specialRequest = "";

    // Get the checkbox and textbox elements
    var specialRequestCheckbox = document.getElementById("SpecialRequest");
    var specialRequestTextbox = document.getElementById("SpecialRequestTextbox");

    if (specialRequestCheckbox && specialRequestCheckbox.checked) {
        // If the checkbox is marked, check for any input in the textbox
        var specialRequestInput = specialRequestTextbox.value;

        if (specialRequestInput) {
            specialRequest = specialRequestInput; // If there is input, set it to the content
        } else {
            specialRequest = "No special requests"; // If empty, set to default message
        }
    } else {
        specialRequest = "Special request not selected"; // If checkbox is not marked
    }

    var submitButton = document.querySelector('button[type="button"]'); // כפתור הסיכום

    // שינוי צבע הכפתור והצגת סיכום ההזמנה אם כל השדות מלאים
    if (isFormValid) {
        submitButton.style.backgroundColor = 'green'; // צבע ירוק לכפתור
        submitButton.style.color = 'white';
        submitButton.disabled = false; // הכפתור הפעיל

        var output = "Order Summary:<br />";

        // יצירת הסיכום להצגה
        output += "Currency: " + currency + "<br />" +
            "Departure City: " + departureCity + "<br />" +
            "Tour Date: " + tourDate + "<br />" +
            "Full Name: " + fullName + "<br />" +
            "Email: " + email + "<br />" +
            "Number of Participants: " + participants + "<br />" +
            "Meal Preference: " + mealPreference + "<br />" +
            "Health Insurance: " + hasHealthInsurance + "<br />" +
            "Special Request: " + specialRequest + "<br />" +
            "Total Amount to be Paid: " + totalCost * participants + " " + currency;

        //// הצגת הסיכום באיזור המיועד
        document.getElementById("orderSummary").innerHTML = output;

    } else {
        // החזרת צבע הכפתור למצבו המקורי במידה ויש שדות חסרים
        submitButton.style.backgroundColor = '';
        submitButton.style.color = '';
        submitButton.disabled = true; // כפתור מושבת
        alert("Please fill in all required fields"); // הודעה למילוי השדות
    }
}