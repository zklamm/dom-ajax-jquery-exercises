$(function() {
  var post = {
    title: 'Lorem ipsum dolor sit amet',
    published: 'April 1, 2015',
    body: '<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>',
    tags: ['Food', 'Cooking', 'Vegetables'],
  };

  Handlebars.registerPartial('tag', $('#tag').html());

  var tagTemplate = Handlebars.compile($('#tag').html());
  var postsTemplate = Handlebars.compile($('#posts').html());


  var post2 = {
    title: 'Test',
    published: 'RN',
    body: 'HALLO',
  };

  var posts = [post, post2];
  $('body').append(postsTemplate({ posts: posts }));
});


function helloLater(n) {
  const delayInSeconds = n * 1000;
  setTimeout(() => console.log('Hello, world!'), delayInSeconds);
}