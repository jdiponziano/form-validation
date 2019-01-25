$(function() {
  //Variables
  const $name = $('#name');
  const $title = $('#title');
  const $otherJobTitle = $('#other-title');
  const $designSelect = $('#design');
  const $colorSelect = $('#colors-js-puns');
  const $paymentSelect = $('#payment');

  //Focus on first field on load
  $name.focus();

  //Hide field on load
  $otherJobTitle.hide();

  $title.on('change', () => {
    selectValue = title.val();
    if (selectValue == 'other') {
      otherJobTitle.fadeIn();
    } else {
      otherJobTitle.fadeOut();
    }
  });

  $designSelect.on('change', () => {
    $jsPunShirts = $();
    if ($designSelect.val() == 'js puns') {
      console.log('show js pun shirts only');
    } else if ($designSelect.val() == 'heart js') {
      console.log('show js heart shirts only');
    } else {
      console.log('show all options');
    }
  });

  $paymentSelect.on('change', () => {
    const $selectValue = paymentSelect.val();
    const $creditCard = $('#credit-card');
    const $paypalDiv = $()
    if ($selectValue == 'credit card') {
    }
  });
});
