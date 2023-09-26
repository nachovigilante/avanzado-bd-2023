const pedidosItem = [];

const timedFetch = async (url, options, timeout = 1000) => {
    const controller = new AbortController();
    const id = setTimeout(() => {
        controller.abort();
        return 'Timeout';
    }, timeout);

    const response = await fetch(url, {
        ...options,
        signal: controller.signal,
    });

    clearTimeout(id);

    return response;
};

const addItemToPedido = (item) => {
    const pedido = {
        id: item.getAttribute('data-id'),
        nombre: item.getAttribute('data-nombre'),
        precio: item.getAttribute('data-precio'),
        cantidad: 1,
    };

    const pedidoExistente = pedidosItem.find((item) => item.id === pedido.id);

    if (pedidoExistente) {
        pedidoExistente.cantidad++;
    } else {
        pedidosItem.push(pedido);
    }

    updatePedidos();
};

const loadModalInfo = async (id) => {
    const modalItem = document.querySelector('#modal .item');
    modalItem.classList.remove('error');
    modalItem.classList.add('loading');
    modalItem.innerHTML = `
                <div class="info">
                    <h2>Cargando...</h2>
                </div>`;

    await timedFetch(`http://localhost:3000/menu/${id}`)
        .then(async (res) => {
            if (res.status === 404) {
                modalItem.innerHTML = `
                <div class="info">
                    <h2>Error</h2>
                    <span>No se encontró la ruta.</span>
                    <span>Puede ser por 2 razones: no está implementado el endpoint o el id es inválido.</span>
                </div>`;
                modalItem.classList.add('error');
                modalItem.classList.remove('loading');
                return;
            }

            const item = await res.json();
            modalItem.innerHTML = `
                <img src="./assets/items/1.png" alt="">
                <div class="info" data-id="${item.id}" data-nombre="${item.nombre}" data-precio="${item.precio}">
                    <div class="top">
                        <h3>${item.nombre}</h3>
                        <span class="precio">$${item.precio}</span>
                    </div>
                    <p>${item.descripcion}</p>
                </div>`;
            modalItem.classList.remove('loading');
        })
        .catch((err) => {
            modalItem.innerHTML = `
                <div class="info">
                    <h2>Error</h2>
                    <span>La request no obtuvo respuesta en más de un segundo.</span>
                    <span>Probablemente no estés respondiendo nada en el endpoint o no esté prendido el server.</span>
                </div>`;
            modalItem.classList.add('error');
            modalItem.classList.remove('loading');
        });
};

const updatePedidos = () => {
    const listaPedidos = document.querySelector('#pedido ul');
    const calcular = document.querySelector('#calcular');
    const totalElement = document.querySelector('#total');

    totalElement.classList.remove('active');

    listaPedidos.innerHTML = '';

    pedidosItem.forEach((item) => {
        listaPedidos.innerHTML += `
            <li class="item" data-id="${item.id}">
                <div class="info">
                    <h3>${item.nombre}</h3>
                    <p class="precio">$${item.precio}</p>
                </div>
                <div class="control">
                    <button class="remove-one">${
                        item.cantidad === 1
                            ? '<div class="delete-btn"></div>'
                            : '<div class="remove-btn"></div>'
                    }</button>
                    <p class="cantidad">${item.cantidad}</p>
                    <button class="add-one"><div class="add-btn"></div></button>
                </div>
            </li>
        `;
    });

    if (pedidosItem.length === 0) {
        listaPedidos.innerHTML =
            '<p class="empty">Todavía no agregaste nada :(</p>';
        calcular.classList.remove('active');
    } else {
        calcular.classList.add('active');
    }

    const removeOnePedido = document.querySelectorAll('.remove-one');
    const addOnePedido = document.querySelectorAll('.add-one');

    removeOnePedido.forEach((removeButton) => {
        removeButton.addEventListener('click', (e) => {
            const item = e.currentTarget.parentElement.parentElement;
            const id = item.getAttribute('data-id');

            const pedidoExistente = pedidosItem.find((item) => item.id === id);

            if (pedidoExistente) {
                if (pedidoExistente.cantidad === 1) {
                    pedidosItem.splice(pedidosItem.indexOf(pedidoExistente), 1);
                } else {
                    pedidoExistente.cantidad--;
                }
            }

            updatePedidos();
        });
    });

    addOnePedido.forEach((addButton) => {
        addButton.addEventListener('click', (e) => {
            const item = e.currentTarget.parentElement.parentElement;
            const id = item.getAttribute('data-id');

            const pedidoExistente = pedidosItem.find((item) => item.id === id);

            if (pedidoExistente) {
                pedidoExistente.cantidad++;
            }

            updatePedidos();
        });
    });

    calcular.addEventListener('click', async () => {
        const pedidos = pedidosItem.map((item) => {
            return {
                id: item.id,
                cantidad: item.cantidad,
            };
        });

        calcular.innerHTML = 'Calculando...';

        // const total = await fetch('http://localhost:3000/pedido', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         productos: pedidos,
        //     }),
        // });

        timedFetch('http://localhost:3000/pedido', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                productos: pedidos,
            }),
        })
            .then(async (res) => {
                if (res.status === 404) {
                    totalElement.innerHTML = `Error: <span style="font-size: 13px;">La ruta /pedido no parece implementada</span>`;
                    totalElement.classList.add('active');
                    calcular.classList.remove('active');
                    return;
                }

                const total = await res.json();

                totalElement.innerHTML = `Total: <span>$${total.precio}</span>`;
                totalElement.classList.add('active');
                calcular.classList.remove('active');
                calcular.innerHTML = 'Calcular';
            })
            .catch((err) => {
                console.log(err);
                totalElement.innerHTML = `Error: <span style="font-size: 13px;">La ruta /pedido no responde nada</span>`;
                totalElement.classList.add('active');
                calcular.classList.remove('active');
                calcular.innerHTML = 'Calcular';
            });
    });
};

const loadMenu = async (section) => {
    const menuSection = document.querySelector(`#${section}`);
    await timedFetch(`http://localhost:3000/${section}`)
        .then(async (res) => {
            if (res.status === 404) {
                menuSection.innerHTML = `
                <div class="error-sign">
                    <h3>Error</h3>
                    <span>No se encontró la ruta /${section}</span>
                </div>`;
                return;
            }

            const sectionJson = await res.json();

            sectionJson.forEach((item) => {
                menuSection.innerHTML += `
                <div class="item" data-id="${item.id}">
                    <img src="./assets/items/1.png" alt="">
                    <h3>${item.nombre}</h3>
                    <span class="precio">$${item.precio}</span>
                    <p>${item.descripcion}</p>
                </div>`;
            });
        })
        .catch((err) => {
            menuSection.innerHTML = `
            <div class="error-sign">
                <h3>Error</h3>
                <span>La request no obtuvo respuesta en más de un segundo.</span>
                <span>Probablemente no estés respondiendo nada en el endpoint o no esté prendido el server.</span>
            </div>`;
        });
};

document.addEventListener('DOMContentLoaded', async () => {
    await Promise.all([
        loadMenu('combos'),
        loadMenu('principales'),
        loadMenu('postres'),
    ]);

    const modalBg = document.querySelector('#modal-background');
    const modal = document.querySelector('#modal');
    const modalClose = document.querySelector('#modal #close');

    modalBg.addEventListener('click', () => {
        modalBg.classList.remove('active');
        modal.classList.remove('active');
    });

    modalClose.addEventListener('click', () => {
        modalBg.classList.remove('active');
        modal.classList.remove('active');
    });

    const items = document.querySelectorAll('section .item');
    items.forEach((item) => {
        item.addEventListener('click', () => {
            modalBg.classList.add('active');
            loadModalInfo(item.getAttribute('data-id'));
            modal.classList.add('active');
        });
    });

    // Pedidos
    const addPedido = document.querySelector('#add');

    addPedido.addEventListener('click', (e) => {
        const item = e.currentTarget.parentElement
            .querySelector('.item')
            .querySelector('.info');

        addItemToPedido(item);
    });

    updatePedidos();
});
