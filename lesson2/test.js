$(() => {
  $('ul.featured').on('click', 'li', e => {
    debugger
    const $li = $(e.target).closest('li');
    console.log($li.html());
  });
});