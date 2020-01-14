// $(function() {
//   var catalog = [{
//     "title": "The Legend of Zelda: Majora's Mask 3D",
//     "id": 1,
//     "category": "Nintendo 3DS"
//   }, {
//     "title": "Super Smash Bros.",
//     "id": 2,
//     "category": "Nintendo 3DS"
//   }, {
//     "title": "Super Smash Bros.",
//     "id": 3,
//     "category": "Nintendo WiiU"
//   }, {
//     "title": "LEGO Batman 3: Beyond Gotham",
//     "id": 4,
//     "category": "Nintendo WiiU"
//   }, {
//     "title": "LEGO Batman 3: Beyond Gotham",
//     "id": 5,
//     "category": "Xbox One"
//   }, {
//     "title": "LEGO Batman 3: Beyond Gotham",
//     "id": 6,
//     "category": "PlayStation 4"
//   }, {
//     "title": "Far Cry 4",
//     "id": 7,
//     "category": "PlayStation 4"
//   }, {
//     "title": "Far Cry 4",
//     "id": 8,
//     "category": "Xbox One"
//   }, {
//     "title": "Call of Duty: Advanced Warfare",
//     "id": 9,
//     "category": "PlayStation 4"
//   }, {
//     "title": "Call of Duty: Advanced Warfare",
//     "id": 10,
//     "category": "Xbox One"
//   }];

//   var $items = $('main li');
//   var $categories = $('input:checkbox');

//   $categories.on('change', function() {
//     var $checkbox = $(this);
//     var checked = $checkbox.is(':checked');
//     var category = $checkbox.val();
//     var categoryItems = catalog.filter(function(item) {
//       return item.category === category;
//     });

//     categoryItems.forEach(function(item) {
//       $items.filter(`[data-id=${item.id}]`).toggle(checked);
//     });
//   });
// });

document.addEventListener('DOMContentLoaded', () => {
  const catalog = [{
    "title": "The Legend of Zelda: Majora's Mask 3D",
    "id": 1,
    "category": "Nintendo 3DS"
  }, {
    "title": "Super Smash Bros.",
    "id": 2,
    "category": "Nintendo 3DS"
  }, {
    "title": "Super Smash Bros.",
    "id": 3,
    "category": "Nintendo WiiU"
  }, {
    "title": "LEGO Batman 3: Beyond Gotham",
    "id": 4,
    "category": "Nintendo WiiU"
  }, {
    "title": "LEGO Batman 3: Beyond Gotham",
    "id": 5,
    "category": "Xbox One"
  }, {
    "title": "LEGO Batman 3: Beyond Gotham",
    "id": 6,
    "category": "PlayStation 4"
  }, {
    "title": "Far Cry 4",
    "id": 7,
    "category": "PlayStation 4"
  }, {
    "title": "Far Cry 4",
    "id": 8,
    "category": "Xbox One"
  }, {
    "title": "Call of Duty: Advanced Warfare",
    "id": 9,
    "category": "PlayStation 4"
  }, {
    "title": "Call of Duty: Advanced Warfare",
    "id": 10,
    "category": "Xbox One"
  }];

  const items = Array.from(document.querySelectorAll('main li'));
  const categories = document.querySelectorAll('input');

  function toggle(items) {
    items.forEach(item => item.hidden = !item.hidden);
  };

  categories.forEach(category => {
    category.addEventListener('change', e => {
      const checkbox = e.target;
      const checked = checkbox.checked;
      const categoryValue = checkbox.value;
      const categoryItems = catalog.filter(item => item.category === categoryValue);

      categoryItems.forEach(categoryItem => {
        toggle(items.filter(item => +item.dataset.id === categoryItem.id));
      });
    });
  });
});
