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

  function fieldBlankError(selector) {
    if (selector.val() === "") {
      const $label = selector.prev('label').text();
      return `<li><b>${$label}</b> Field must not be blank.</li>`;
    }
  }

  //Change t-shirt color options based on design selected
  $designSelect.on('change', () => {
    $jsPunShirts = $('#colors-js-puns option:contains("JS Puns")');
    $heartJsShirts = $('#colors-js-puns option:contains("JS shirt")');
    if ($designSelect.val() == 'js puns') {
      $colorSelect.show();
      $heartJsShirts.attr('hidden', true);
      $heartJsShirts.first().attr('selected', false);
      $jsPunShirts.attr('hidden', false);
      $jsPunShirts.first().attr('selected', 'selected');
    } else if ($designSelect.val() == 'heart js') {
      $colorSelect.show();
      $jsPunShirts.attr('hidden', true);
      $jsPunShirts.first().attr('selected', false);
      $heartJsShirts.attr('hidden', false);
      $heartJsShirts.first().attr('selected', 'selected');
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
    if ($selectValue == 'credit card') {
      $creditCard.show();
      $paypalDiv.hide();
      $bitcoinDiv.hide();
    } else if ($selectValue == 'paypal') {
      $paypalDiv.show();
      $creditCard.hide();
      $bitcoinDiv.hide();
    } else {
      $bitcoinDiv.show();
      $creditCard.hide();
      $paypalDiv.hide();
    }
  });

  //Validate required fields on submit
  $form.on('submit', (e) => {
    let errorMsg = '<ul class="error-message>';
    const $emailVal = $email.val();
    const $selectValue = $paymentSelect.val();

    errorMsg += fieldBlankError($name);

    if (!validEmail($emailVal)) {
      e.preventDefault();
      errorMsg += '<li><b>Email:</b> Please enter a valid email address.</li>';
    }

    if (!$checkboxes.is(':checked')) {
      e.preventDefault();
      errorMsg += '<li><b>Register Activies:</b> You must register for at least 1 activity.</li>';
    } 
    if ($selectValue == 'credit card') {
      const $zipVal = $ccZip.val(); 
      const $cvVal = $ccCvv.val();
      const $ccVal = $ccNum.val();
      errorMsg += fieldBlankError($ccZip);
      errorMsg += fieldBlankError($cvVal);
      errorMsg += fieldBlankError($ccVal);
      if (!isValidCcNumber($ccVal)) {
        errorMsg += '<li><b>Credit Card Number:</b> You must enter a valid 13-16 digit credit card number.</li>';
      }
      if (!isValidZip($zipVal)) {
        errorMsg += '<li><b>Zip Code:</b> You must enter a valid 5 digit zip code.</li>';
      }
      if (!isCV($cvVal)) {
        errorMsg += '<li><b>CVV:</b> You must enter a valid 3 digit CVV code.</li>';
      }
    }
    errorMsg += '</ul>';
    $form.before(errorMsg);
  });

  //Initialize page
  $activities.append(costString);

  //Focus on first field on load
  $name.focus();

  //Hide fields on load
  $.each([$otherJobTitle, $colorSelect, $creditCard, $paypalDiv, $bitcoinDiv], function(t) {
    $(this).hide();
  });
});
