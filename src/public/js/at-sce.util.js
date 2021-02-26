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

/* Section: History DataTable */
$(document).ready(function () {
  $("#historyTable").DataTable();
});
