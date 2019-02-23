$(function() {
  //Variables
  const $form = $('form');
  const $name = $('#name');
  const $email = $('#mail');
  const $title = $('#title');
  const $otherJobTitle = $('#other-title');
  const $designSelect = $('#design');
  const $colorSelect = $('#colors-js-puns');
  const $activities = $('.activities');
  const $checkboxes = $('input[type=checkbox]');
  const $paymentSelect = $('#payment');
  const $creditCard = $('#credit-card');
  const $ccNum = $('#cc-num');
  const $ccZip = $('#zip');
  const $ccCvv = $('#cvv');
  const $paypalDiv = $paymentSelect.next().next();
  const $bitcoinDiv = $paymentSelect
    .next()
    .next()
    .next();
  let $cost = 0;
  let costString =
    '<p>Total Cost: $<span class="cost">' + $cost + '</span></p>';
  
  $title.on('change', () => {
    const selectValue = $title.val();
    if (selectValue == 'other') {
      $otherJobTitle.fadeIn();
    } else {
      $otherJobTitle.fadeOut();
    }
  });

  function validEmail(email) {
    return /^[^@]+@[^@]+\.[a-z]+$/i.test(email);
  }

  function isValidCcNumber(ccnum) {
    return /^[0-9]{13,16}$/.test(ccnum);
  }

  function isValidZip(zip) {
    return /^[0-9]{5}$/.test(zip);
  }

  function isCV(cv) {
    return /^[0-9]{3}$/.test(cv);
  }

  function fieldBlankError(selector, e) {
    if ($(selector).val() === "") {
      const $label = selector.prev('label').text();
      e.preventDefault();
      return `<li><b>${$label}</b> Field must not be blank.</li>`;
    } else {
      return '';
    }
  }

  function showHideTshirts(showField, hideField) {
    hideField.attr('hidden', true);
    hideField.first().attr('selected', false);
    showField.attr('hidden', false);
    showField.first().attr('selected', 'selected');
  }

  function showHideCcFields(field1, field2, field3) {
    field1.show();
    field2.hide();
    field3.hide();
  }

  function showHideToolTip(show, element) {
    if (show) {
      element.show();
    } else {
      element.hide();
    }
  }

  function createToolTipListener(e, validator) {
    const $this = $(e.target);
    const text = $this.val();
    const valid = validator(text);
    const showTip = text !== "" && !valid;
    const tooltip = $this.next('span');
    showHideToolTip(showTip, tooltip);
  }

  //Change t-shirt color options based on design selected
  $designSelect.on('change', () => {
    $jsPunShirts = $('#colors-js-puns option:contains("JS Puns")');
    $heartJsShirts = $('#colors-js-puns option:contains("JS shirt")');
    $designSelect.find('option[value="select_theme"]').attr('disabled', true).prop('disabled', true);
    if ($designSelect.val() == 'js puns') {
      $colorSelect.show();
      showHideTshirts($jsPunShirts, $heartJsShirts);
    } else if ($designSelect.val() == 'heart js') {
      $colorSelect.show();
      showHideTshirts($heartJsShirts, $jsPunShirts);
    } else {
      $colorSelect.hide();
      $jsPunShirts.attr('hidden', false);
      $heartJsShirts.attr('hidden', false);
    }
  });

  //Sum up cost of workshops and display total
  $checkboxes.on('change', e => {
    const $target = $(e.target);
    const $course = $target.attr('name');
    const $costText = $('.cost');
    if ($target.is(':checked')) {
      if ($course == 'all') {
        $cost = $cost + 200;
      } else {
        $cost = $cost + 100;
      }
    } else {
      if ($course == 'all') {
        $cost = $cost - 200;
      } else {
        $cost = $cost - 100;
      }
    }
    $costText.text($cost);
  });

  //Disable Course fields if at the same time
  $checkboxes.on('change', e => {
    const $target = $(e.target);
    const $content = $target.parent().text();
    const $stringTest = $target.parent().siblings('label');
    const regex = /— (\w*) \d[a|p]m-\d\d?pm/;
    $stringTest.each(function() {
      let $this = $(this);
      let $optionText = $this.text();
      let $optionInput = $this.find('input');
      const contentMatch = $content.match(regex);
      const optionMatch = $optionText.match(regex);
      if (contentMatch && optionMatch) {
        if ($content.match(regex)[0] === $optionText.match(regex)[0]) {
          if ($target.is(':checked')) {
            $optionInput.prop('disabled', 'true');
          } else {
            $optionInput.removeAttr('disabled');
          }
        }
      }
    });
  });

  //Show hide payment options
  $paymentSelect.on('change', () => {
    const $selectValue = $paymentSelect.val();
    switch ($selectValue) {
      case 'credit card':
        showHideCcFields($creditCard, $paypalDiv, $bitcoinDiv);
        break;
      case 'paypal':
        showHideCcFields($paypalDiv, $bitcoinDiv, $creditCard);
        break;
      case 'bitcoin':
        showHideCcFields($bitcoinDiv, $paypalDiv, $creditCard);
        break;
      default:
        $bitcoinDiv.hide();
        $creditCard.hide();
        $paypalDiv.hide();
    }
  });

  //Validate fields while typing
  $email.on('keyup', function (e) { createToolTipListener(e, validEmail) });
  $ccNum.on('keyup', function (e) { createToolTipListener(e, isValidCcNumber) });
  $ccZip.on('keyup', function (e) { createToolTipListener(e, isValidZip) });
  $ccCvv.on('keyup', function (e) { createToolTipListener(e, isCV) });

  //Validate required fields on submit
  $form.on('submit', (e) => {
    $('.error-message').remove();
    let errorMsg = '';
    const $emailVal = $email.val();
    const $selectValue = $paymentSelect.val();
    
    errorMsg = '<ul class="error-message">';
    errorMsg += fieldBlankError($name, e);

    if (!validEmail($emailVal)) {
      e.preventDefault();
      errorMsg += '<li><b>Email:</b> Please enter a valid email address.</li>';
    }

    if (!$checkboxes.is(':checked')) {
      e.preventDefault();
      errorMsg += '<li><b>Register Activies:</b> You must register for at least 1 activity.</li>';
    } 

    if ($designSelect.val() === "select_theme") {
      e.preventDefault();
      errorMsg += '<li><b>Select Theme:</b> You must select a tshirt theme.</li>';
    }

    if ($paymentSelect.val() === "select_method") {
      e.preventDefault();
      errorMsg += '<li><b>Select Payment Method:</b> You must select a valid payment method.</li>';
    }

    if ($selectValue == 'credit card') {
      const $zipVal = $ccZip.val(); 
      const $cvVal = $ccCvv.val();
      const $ccVal = $ccNum.val();
      errorMsg += fieldBlankError($ccNum, e);
      errorMsg += fieldBlankError($ccZip, e);
      errorMsg += fieldBlankError($ccCvv, e);
      if (!isValidCcNumber($ccVal) && $ccVal !== "") {
        e.preventDefault();
        errorMsg += '<li><b>Credit Card Number:</b> You must enter a valid 13-16 digit credit card number.</li>';
      }
      if (!isValidZip($zipVal) && $zipVal !== "") {
        e.preventDefault();
        errorMsg += '<li><b>Zip Code:</b> You must enter a valid 5 digit zip code.</li>';
      }
      if (!isCV($cvVal) && $cvVal !== "") {
        e.preventDefault();
        errorMsg += '<li><b>CVV:</b> You must enter a valid 3 digit CVV code.</li>';
      }
    }
    errorMsg += '</ul>';
    $form.before(errorMsg);
    $('html, body').animate({
      scrollTop: $('.error-message').offset().top
    }, 500);
  });

  //Initialize page
  $activities.append(costString);

  //Focus on first field on load
  $name.focus();

  //Select credit card payment by default
  $paymentSelect.find('option[value="credit card"]').attr('selected', true).prop('selected', true);

  //Hide fields on load
  $.each([$otherJobTitle, $colorSelect, $paypalDiv, $bitcoinDiv], function(t) {
    $(this).hide();
  });
});
