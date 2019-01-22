$(function() {
  //Variables
  const name = $('#name');
  const title = $('#title');
  const otherJobTitle = $('#other-title');

  //Focus on first field on load
  name.focus();

  //Hide field on load
  otherJobTitle.hide();

  title.on('change', () => {
    selectValue = title.val();
    if (selectValue == 'other') {
      otherJobTitle.fadeIn();
    } else {
      otherJobTitle.fadeOut();
    }
  });
});
