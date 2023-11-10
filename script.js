async function criarPedido(token,clienteId,dataPedidoInput,dataPedido) {
    const token = document.getElementById('token').value;
    const clienteId = document.getElementById('clienteId').value;
    const dataPedidoInput = document.getElementById('dataPedido');
    const dataPedido = formatDate(dataPedidoInput.value);
  
    const pedidoData = {
      clienteId: clienteId,
      dataPedido: dataPedido
    };
  
    try {
      const response = await fetch('https://localhost:7156/pedido', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(pedidoData)
      });
  
      const resultadoPedido = document.getElementById('resultadoPedido');
  
      if (response.ok) {
        const data = await response.json();
        resultadoPedido.innerHTML = `<p>Pedido criado com sucesso! ID: ${data.id}</p>`;
      } else {
        const data = await response.json();
        resultadoPedido.innerHTML = `<p>Erro ao criar pedido: ${data.error}</p>`;
      }
    } catch (error) {
      console.error('Erro ao realizar a solicitação:', error);
    }
  }
  
  function formatDate(dateTimeLocal) {
    const dateTime = new Date(dateTimeLocal);
    const formattedDate = dateTime.toISOString().split('T')[0];
    const formattedTime = dateTime.toISOString().split('T')[1].split('.')[0];
    return `${formattedDate}T${formattedTime}`;
  }
  