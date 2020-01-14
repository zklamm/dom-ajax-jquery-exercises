let inventory;

(() => {
  const template = Handlebars.compile($('#inventory_item').remove().html());
  let collection = [];

  inventory = {
    currentId: 1,
    setDate() {
      $('#order_date').text(new Date());
    },

    add(e) {
      e.preventDefault();

      const item = {
        id: this.currentId,
        name: '',
        stockNumber: '',
        quantity: 1,
      };

      collection.push(item);
      this.currentId += 1;
      $('#inventory').append(template(item));
    },

    findParent(e) {
      return $(e.target).closest('tr');
    },

    remove(idx) {
      collection = collection.filter(item => item.id !== idx);
    },

    delete(e) {
      e.preventDefault();
      const $item = this.findParent(e).remove();
      this.remove(this.findId($item));
    },

    findId($item) {
      return +$item.find('input[type=hidden]').val();
    },

    update($item) {
      const id = this.findId($item);
      const item = collection.filter(item => item.id === id)[0];
      item.name = $item.find('[name^=item_name]').val();
      item.stockNumber = $item.find('[name^=item_stock_number]').val();
      item.quantity = +$item.find('[name^=item_quantity]').val();
    },

    updateItem(e) {
      const $item = this.findParent(e);
      this.update($item);
    },

    bindEvents() {
      $('#add_item').on('click', e => this.add(e));
      $('#inventory').on('click', 'a.delete', e => this.delete(e));
      $('#inventory').on('focusout', e => this.updateItem(e));
    },

    init() {
      this.setDate();
      this.bindEvents();
    },
  };
})();

$(() => inventory.init());