var inventory;

(function() {
  var template = cacheTemplate();

  function cacheTemplate() {
    var $iTmpl = $('#inventory_item').remove();
    return Handlebars.compile($iTmpl.html());
  }

  inventory = {
    lastId: 0,
    collection: [],
    setDate: function() {
      var date = new Date();
      $('#order_date').text(date.toUTCString());
    },
    add: function() {
      this.lastId += 1;
      var item = {
        id: this.lastId,
        name: '',
        stockNumber: '',
        quantity: 1,
      };
      this.collection.push(item);

      return item;
    },
    remove: function(idx) {
      this.collection = this.collection.filter(function(item) {
        return item.id !== idx;
      });
    },
    get: function(id) {
      var foundItem;

      this.collection.forEach(function(item) {
        if (item.id === id) {
          foundItem = item;
          return false;
        }
      });

      return foundItem;
    },
    update: function($item) {
      var id = this.findId($item);
      var item = this.get(id);

      item.name = $item.find('[name^=item_name]').val();
      item.stockNumber = $item.find('[name^=item_stock_number]').val();
      item.quantity = $item.find('[name^=item_quantity]').val();
    },
    newItem: function(e) {
      e.preventDefault();
      var item = this.add();
      var $item = $(template({ id: item.id }));

      $('#inventory').append($item);
    },
    findParent: function(e) {
      return $(e.target).closest('tr');
    },
    findId: function($item) {
      return +$item.find('input[type=hidden]').val();
    },
    deleteItem: function(e) {
      e.preventDefault();
      var $item = this.findParent(e).remove();

      this.remove(this.findId($item));
    },
    updateItem: function(e) {
      var $item = this.findParent(e);

      this.update($item);
    },
    bindEvents: function() {
      $('#add_item').on('click', this.newItem.bind(this));
      $('#inventory').on('click', 'a.delete', this.deleteItem.bind(this));
      $('#inventory').on('blur', ':input', this.updateItem.bind(this));
    },
    init: function() {
      this.setDate();
      this.bindEvents();
    },
  };
})();

$(inventory.init.bind(inventory));


$('#header').on('click', 'p', function(e) {
  // do something
});

document.querySelector('#header').addEventListener('click', function(e) {

});