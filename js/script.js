$(function() {
  //Variables
  const $name = $('#name');
  const $title = $('#title');
  const $otherJobTitle = $('#other-title');
  const $designSelect = $('#design');
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

  //Change t-shirt color options based on design selected
  $designSelect.on('change', () => {
    $jsPunShirts = $('#colors-js-puns option:contains("JS Puns")');
    $heartJsShirts = $('#colors-js-puns option:contains("JS shirt")');
    if ($designSelect.val() == 'js puns') {
      $heartJsShirts.attr('hidden', true);
      $heartJsShirts.first().attr('selected', false);
      $jsPunShirts.attr('hidden', false);
      $jsPunShirts.first().attr('selected', 'selected');
    } else if ($designSelect.val() == 'heart js') {
      $jsPunShirts.attr('hidden', true);
      $jsPunShirts.first().attr('selected', false);
      $heartJsShirts.attr('hidden', false);
      $heartJsShirts.first().attr('selected', 'selected');
    } else {
      $jsPunShirts.attr('hidden', false);
      $heartJsShirts.attr('hidden', false);
    }
  });

  $paymentSelect.on('change', () => {
    const $selectValue = paymentSelect.val();
    const $creditCard = $('#credit-card');
    const $paypalDiv = $();
    if ($selectValue == 'credit card') {
    }
  });
});
