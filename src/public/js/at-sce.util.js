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
  $('[data-toggle="tooltipCostPerHr"]').tooltip();
});

// Section: Calc Results
$(function () {
  $('[data-toggle="tooltipCost"]').tooltip();
  $('[data-toggle="tooltipTax"]').tooltip();
  $('[data-toggle="tooltipCharge"]').tooltip();
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
  return (
    Number(rent) +
    Number(transport) +
    Number(telephone) +
    Number(feeding) +
    Number(others)
  );
}

function calculateCostPerDay(days, totalFixedCost) {
  return totalFixedCost / days;
}

function calculateCostPerHour(hours, costPerDay) {
  return costPerDay / hours;
}

function calculatePercentIva(projectCost) {
  return projectCost * percentIva;
}

function calculatePercentIsrRetention(projectCost) {
  return projectCost * percentIsrRetention;
}

function calculatePercentIvaRetention(projectCost) {
  return projectCost * percentIvaRetention;
}

function calculateTotalTaxesIVAandISR(
  percentIva,
  percentIsrRetention,
  percentIvaRetention
) {
  let totalTaxes =
    Number(percentIva) +
    Number(percentIsrRetention) +
    Number(percentIvaRetention);
  return totalTaxes;
}

function calculateCharge(
  projectCost,
  percentIva,
  percentIsrRetention,
  percentIvaRetention
) {
  let charge =
    Number(projectCost) +
    Number(percentIva) -
    Number(percentIsrRetention) -
    Number(percentIvaRetention);
  return charge;
}

function calculateRevenue(charge, totalFixedCost) {
  let revenue = charge - totalFixedCost;
  return revenue;
}

function getValueForDom(id) {
  let value = document.getElementById(id).value;
  return value;
}

function transformToDecimals(number) {
  let result = parseFloat(number).toFixed(2);
  return result;
}

function calculateProjectCost() {
  /*Initialization */
  const rent = getValueForDom("rent");
  const transport = getValueForDom("transport");
  const telephone = getValueForDom("telephone");
  const feeding = getValueForDom("feeding");
  const others = getValueForDom("others");
  const days = getValueForDom("days");
  const hours = getValueForDom("hours");
  const projectCost = getValueForDom("projectCost");

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
    document.getElementById("sceMessages").innerHTML =
      "Please, enter value in all fields";
    document.getElementById("sceMessages").className =
      "alert alert-warning align-self-center mt-2";

    $("#sceMessages").fadeIn(1500);
    setTimeout(function () {
      $("#sceMessages").fadeOut();
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
    document.getElementById(
      "projectWillCostYou"
    ).innerHTML = transformToDecimals(totalFixedCost);
    document.getElementById("costPerDay").innerHTML = transformToDecimals(
      costPerDay
    );
    document.getElementById("costPerHour").innerHTML = transformToDecimals(
      costPerHour
    );
    document.getElementById("taxesIVAandISR").innerHTML = transformToDecimals(
      totalTaxesIVAandISR
    );
    document.getElementById("charge").innerHTML = transformToDecimals(charge);
    document.getElementById("revenue").innerHTML = transformToDecimals(revenue);

    document.getElementById("total").value = transformToDecimals(
      totalFixedCost
    );
    document.getElementById("costDay").value = transformToDecimals(costPerDay);
    document.getElementById("costHour").value = transformToDecimals(
      costPerHour
    );
    document.getElementById("taxIva").value = transformToDecimals(percentIva);
    document.getElementById("taxIsr_r").value = transformToDecimals(
      percentIsrRetention
    );
    document.getElementById("taxIva_r").value = transformToDecimals(
      percentIvaRetention
    );
    document.getElementById("totalTaxes").value = transformToDecimals(
      totalTaxesIVAandISR
    );
    document.getElementById("totalRevenue").value = transformToDecimals(
      revenue
    );
    /* Highlight button */
    $(".calcResultsSection").effect("highlight", {}, 3000);

    /* Enable Save Button */
    $("#saveButton").prop("disabled", false);
  }
}

/* Section: History DataTable */
$(document).ready(function () {
  $("#historyTable").DataTable();
});
