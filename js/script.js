$(function() {
  //Variables
  const $name = $('#name');
  const $title = $('#title');
  const $otherJobTitle = $('#other-title');
  const $designSelect = $('#design');
  const $activities = $('.activities');
  const $checkboxes = $('input[type=checkbox]');
  const $paymentSelect = $('#payment');
  let $cost = 0;
  let costString =
    '<p>Total Cost: $<span class="cost">' + $cost + '</span></p>';

  $activities.append(costString);

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

  $paymentSelect.on('change', () => {
    const $selectValue = paymentSelect.val();
    const $creditCard = $('#credit-card');
    const $paypalDiv = $();
    if ($selectValue == 'credit card') {
    }
  });
});
