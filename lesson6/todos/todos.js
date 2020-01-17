$(() => {
  const todos = [
    { name: 'Homework' },
    { name: 'Shopping' },
    { name: 'Calling Mom' },
    { name: 'Coffee with John' },
  ];

  const todoTemplate = Handlebars.compile($('#todoTemplate').html());
  const todoHtml = todoTemplate({ items: todos })

  $('ul').html(todoHtml);

  $('a').click(e => {
    e.preventDefault();

    $('li').length > 1
      ? $(e.target).closest('li').remove()
      : $('ul').remove();
  });
});