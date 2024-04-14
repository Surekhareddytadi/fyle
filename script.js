document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('taxForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var income = parseFloat(document.getElementById('income').value);
    var extraIncome = parseFloat(document.getElementById('extraIncome').value) || 0;
    var deductions = parseFloat(document.getElementById('deductions').value) || 0;
    var age = document.getElementById('age').value;

    var incomeErrorIcon = document.getElementById('incomeErrorIcon');
    var ageErrorIcon = document.getElementById('ageErrorIcon');

    if (isNaN(income) || income <= 0) {
      incomeErrorIcon.style.display = 'inline-block';
    } else {
      incomeErrorIcon.style.display = 'none';
    }

    if (age === '') {
      ageErrorIcon.style.display = 'inline-block';
    } else {
      ageErrorIcon.style.display = 'none';
    }

    if (!isNaN(income) && income > 0 && age !== '') {
      var tax = calculateTax(income, age);
      showModal(tax);
    }
  });


  document.getElementById('income').addEventListener('input', function () {
    var income = this.value.trim();

    if (!/^\d*$/.test(income)) {
      addErrorSymbol(this);
    } else {
      removeErrorSymbol(this);
    }
  });

  function addErrorSymbol(input) {
    var errorSymbol = input.parentNode.querySelector('.error-symbol');
    if (!errorSymbol) {
      errorSymbol = document.createElement('span');
      errorSymbol.innerHTML = '!';
      errorSymbol.className = 'error-symbol';
      input.parentNode.appendChild(errorSymbol);
    } else {
      errorSymbol.style.display = 'inline-block'; // Show the error symbol
    }
  }

  function removeErrorSymbol(input) {
    var errorSymbol = input.parentNode.querySelector('.error-symbol');
    if (errorSymbol) {
      errorSymbol.style.display = 'none'; // Hide the error symbol
    }
  }




  document.querySelector('.close').addEventListener('click', function () {
    document.getElementById('modal').style.display = 'none';
  });
});

function calculateTax(income, age) {
  var tax = 0;
  var threshold = 800000;

  if (income > threshold) {
    var taxableAmount = income - threshold;
    switch (age) {
      case 'under40':
        tax = taxableAmount * 0.3;
        break;
      case '40to60':
        tax = taxableAmount * 0.4;
        break;
      case 'above60':
        tax = taxableAmount * 0.1;
        break;
    }
  }

  return tax;
}

function showModal(tax) {
  var modal = document.getElementById('modal');
  var taxResult = document.getElementById('amount');

  taxResult.textContent = tax.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  modal.style.display = 'block';
}
