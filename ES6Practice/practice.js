document.addEventListener('DOMContentLoaded', () => {
  let store = document.querySelector('#store');
  let request = new XMLHttpRequest();
  request.open('GET', 'https://ls-230-web-store-demo.herokuapp.com/products');
  request.addEventListener('load', () => store.innerHTML = request.response);
  request.send();

  store.addEventListener('click', e => {
    let target = e.target;
    if (target.tagName !== 'A') return;
    e.preventDefault();
    let request = new XMLHttpRequest();
    request.open('GET', `https://ls-230-web-store-demo.herokuapp.com${target.getAttribute('href')}`);
    request.addEventListener('load', () => store.innerHTML = request.response);
    request.send();
  });

  store.addEventListener('submit', e => {
    e.preventDefault();
    let form = e.target;
    let data = new FormData(form);
    let request = new XMLHttpRequest();
    request.open('POST', `https://ls-230-web-store-demo.herokuapp.com${form.getAttribute('action')}`);
    request.setRequestHeader('Authorization', 'token AUTH_TOKEN');
    request.addEventListener('load', () => store.innerHTML = request.response);
    request.send(data);
  });

  const createProduct = productData => {
    let json = JSON.stringify(productData);
    let request = new XMLHttpRequest();

    request.open('POST', 'https://ls-230-web-store-demo.herokuapp.com/v1/products');
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', 'token AUTH_TOKEN');
    request.addEventListener('load', () => console.log(`This product was added: ${request.responseText}`));
    request.send(json);
  }

  createProduct({
    name: 'Purple Pen',
    sku: 'purplep100',
    price: 4,
  });
});
