var inventory;

(function() {
  inventory = {
    lastId: 0,
    collection: [],
    cacheTemplate: function() {
      var $iTmpl = $('#inventory_item').remove();
      this.template = $iTmpl.html();
    },
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
    newItem: function(e) {
      e.preventDefault();

      var item = this.add();
      var $item = $(this.template.replace(/ID/g, item.id));

      $('#inventory').append($item);
    },
    deleteItem: function(e) {
      e.preventDefault();

    },
    bindEvents: function() {
      $('#add_item').on('click', this.newItem.bind(this));
      $('inventory').on('click', 'a.delete', this.deleteItem.bind(this));
    },
    init: function() {
      this.setDate();
      this.cacheTemplate();
      this.bindEvents();
    },
  };

})();

$(inventory.init.bind(inventory));
