$(() => {
  const contactsTemplate = Handlebars.compile($('#contacts').html());
  const $contactsList = $('#contactsList');
  const $createContact = $('#createContact');
  const $featureBar = $('#featureBar');

  $contactsList.append(contactsTemplate());

  contactsTemplate();

  $('.addContact').on('click', e => {
    e.preventDefault();

    $createContact.fadeIn();
    $contactsList.fadeOut();
    $featureBar.fadeOut();

    $('.cancel').on('click', e => {
      e.preventDefault();

      $createContact.fadeOut();
      $contactsList.fadeIn();
      $featureBar.fadeIn();
    });
  });
});