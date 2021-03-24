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

/* Calculator Functions */
function SumFixedCost() {
  var rent = document.getElementById("rent").value;
  var transport = document.getElementById("transport").value;
  var telephone = document.getElementById("telephone").value;
  var feeding = document.getElementById("feeding").value;
  var others = document.getElementById("others").value;
  var totalFixedCost =
    parseFloat(rent) +
    parseFloat(transport) +
    parseFloat(telephone) +
    parseFloat(feeding) +
    parseFloat(others);
  return totalFixedCost;
}

function CostPerDay() {
  var days = document.getElementById("days").value;
  var costDay = SumFixedCost() / days;
  return costDay;
}

function CostPerHour() {
  var hours = document.getElementById("hours").value;
  var costHour = CostPerDay() / hours;
  return costHour;
}

function TaxesIVAandISR() {
  var ProjectCost = document.getElementById("projectcost").value;
  var IVA = parseFloat(ProjectCost) * 0.16;
  var ISR_retention = parseFloat(ProjectCost) * 0.1;
  var IVA_retention = parseFloat(ProjectCost) * 0.1067;

  var TOTAL_taxes =
    parseFloat(IVA) + parseFloat(ISR_retention) + parseFloat(IVA_retention);
  return TOTAL_taxes;
}

function Charge() {
  var ProjectCost = document.getElementById("projectcost").value;

  var IVA = parseFloat(ProjectCost) * 0.16;
  var ISR_retention = parseFloat(ProjectCost) * 0.1;
  var IVA_retention = parseFloat(ProjectCost) * 0.1067;

  var charge =
    parseFloat(ProjectCost) +
    parseFloat(IVA) -
    parseFloat(ISR_retention) -
    parseFloat(IVA_retention);

  return charge;
}

function Revenue() {
  var charge = Charge();
  var totalFixedCost = SumFixedCost();
  var revenue = parseFloat(charge) - parseFloat(totalFixedCost);
  return revenue;
}

function Calculate() {
  document.getElementById("ProjectWillCostYou").innerHTML =
    "$" + parseFloat(SumFixedCost()).toFixed(2);
  document.getElementById("CostPerDay").innerHTML =
    "$" + parseFloat(CostPerDay()).toFixed(2);
  document.getElementById("CostPerHour").innerHTML =
    "$" + parseFloat(CostPerHour()).toFixed(2);
  document.getElementById("TaxesIVAandISR").innerHTML =
    "$" + parseFloat(TaxesIVAandISR()).toFixed(2);
  document.getElementById("Charge").innerHTML =
    "$" + parseFloat(Charge()).toFixed(2);
  document.getElementById("Revenue").innerHTML =
    "$" + parseFloat(Revenue()).toFixed(2);
}

/* Section: History DataTable */
$(document).ready(function () {
  $("#historyTable").DataTable();
});
