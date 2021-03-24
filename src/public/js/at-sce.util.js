/* Section: Calc Form */

// Section: Fixed Cost
$(function () {
  $('[data-toggle="tooltipFixedCost"]').tooltip();
});

// Section: About Project
$(function () {
  $('[data-toggle="tooltipAboutProject"]').tooltip();
});

// Section Calc Cost day/hr
$(function () {
  $('[data-toggle="tooltipCostPerDay"]').tooltip();
});

$(function () {
  $('[data-toggle="tooltipCostPerHr"]').tooltip();
});

// Section: Calc Results
$(function () {
  $('[data-toggle="tooltipCost"]').tooltip();
});

$(function () {
  $('[data-toggle="tooltipTax"]').tooltip();
});

$(function () {
  $('[data-toggle="tooltipCharge"]').tooltip();
});

$(function () {
  $('[data-toggle="tooltipRevenue"]').tooltip();
});

// Section: Show History Button
$(function () {
  $('[data-toggle="tooltipShowHistory"]').tooltip();
});

/*Constants percent's IVA and percent's ISR*/
const percentIva = 0.16;
const percentIsrRetention = 0.1;
const percentIvaRetention = 0.1067;

/* Calculator Functions */
function calculateTotalFixedCost(rent, transport, telephone, feeding, others) {
  let totalFixedCost =
    parseFloat(rent) +
    parseFloat(transport) +
    parseFloat(telephone) +
    parseFloat(feeding) +
    parseFloat(others);
  return totalFixedCost;
}

function calculateCostPerDay(days, totalFixedCost) {
  return totalFixedCost / days;
}

function calculateCostPerHour(hours, costPerDay) {
  return costPerDay / hours;
}

function calculatePercentIva(projectCost) {
  return parseFloat(projectCost * percentIva);
}

function calculatePercentIsrRetention(projectCost) {
  return parseFloat(projectCost * percentIsrRetention);
}

function calculatePercentIvaRetention(projectCost) {
  return parseFloat(projectCost * percentIvaRetention);
}

function calculateTotalTaxesIVAandISR(
  percentIva,
  percentIsrRetention,
  percentIvaRetention
) {
  let totalTaxes =
    parseFloat(percentIva) +
    parseFloat(percentIsrRetention) +
    parseFloat(percentIvaRetention);
  return totalTaxes;
}

function calculateCharge(
  projectCost,
  percentIva,
  percentIsrRetention,
  percentIvaRetention
) {
  let charge =
    parseFloat(projectCost) +
    parseFloat(percentIva) -
    parseFloat(percentIsrRetention) -
    parseFloat(percentIvaRetention);
  return charge;
}

function calculateRevenue(charge, totalFixedCost) {
  let revenue = parseFloat(charge) - parseFloat(totalFixedCost);
  return revenue;
}

function calculateProjectCost() {
  /*Initialization */
  const rent = document.getElementById("rent").value;
  const transport = document.getElementById("transport").value;
  const telephone = document.getElementById("telephone").value;
  const feeding = document.getElementById("feeding").value;
  const others = document.getElementById("others").value;
  const days = document.getElementById("days").value;
  const hours = document.getElementById("hours").value;
  const projectCost = document.getElementById("projectcost").value;

  /*Validation*/
  if (
    rent == "" ||
    transport == "" ||
    telephone == "" ||
    feeding == "" ||
    others == "" ||
    days == "" ||
    hours == "" ||
    projectCost == ""
  ) {
    document.getElementById("myAlert").innerHTML =
      "<strong> Please, enter value in all fields </strong>";
    document.getElementById("myAlert").className =
      "alert alert-warning align-self-center mt-2";

    $("#myAlert").fadeIn(1500);
    setTimeout(function () {
      $("#myAlert").fadeOut();
    }, 5000);
  } else {
    /*Call the functions*/
    let totalFixedCost = calculateTotalFixedCost(
      rent,
      transport,
      telephone,
      feeding,
      others
    );
    let costPerDay = calculateCostPerDay(days, totalFixedCost);
    let costPerHour = calculateCostPerHour(hours, costPerDay);
    let percentIva = calculatePercentIva(projectCost);
    let percentIsrRetention = calculatePercentIsrRetention(projectCost);
    let percentIvaRetention = calculatePercentIvaRetention(projectCost);
    let totalTaxesIVAandISR = calculateTotalTaxesIVAandISR(
      percentIva,
      percentIsrRetention,
      percentIvaRetention
    );
    let charge = calculateCharge(
      projectCost,
      percentIva,
      percentIsrRetention,
      percentIvaRetention
    );
    let revenue = calculateRevenue(charge, totalFixedCost);
    /* DOM handling */
    document.getElementById("ProjectWillCostYou").innerHTML = parseFloat(
      totalFixedCost
    ).toFixed(2);
    document.getElementById("CostPerDay").innerHTML = parseFloat(
      costPerDay
    ).toFixed(2);
    document.getElementById("CostPerHour").innerHTML = parseFloat(
      costPerHour
    ).toFixed(2);
    document.getElementById("TaxesIVAandISR").innerHTML = parseFloat(
      totalTaxesIVAandISR
    ).toFixed(2);
    document.getElementById("Charge").innerHTML = parseFloat(charge).toFixed(2);
    document.getElementById("Revenue").innerHTML = parseFloat(revenue).toFixed(
      2
    );
    /*Highlight button*/
    $(".calcResultsSection").effect("highlight", {}, 3000);

    /*Enable Save Button */
    $("#saveButton").prop("disabled", false);
  }
}

/* Section: History DataTable */
$(document).ready(function () {
  $("#historyTable").DataTable();
});
