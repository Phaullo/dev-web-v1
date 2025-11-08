// Gerencia o CRUD da página produtos.html
document.addEventListener('DOMContentLoaded', async function(){
  const form = document.getElementById('form-produto');
  const tabela = document.getElementById('tabela-produtos');
  const btnNovo = document.getElementById('btn-novo');

  let produtos = await carregarProdutos();

  function renderTabela(){
    const tbl = document.createElement('table');
    tbl.className = 'tabela';
    tbl.innerHTML = '<thead><tr><th>Nome</th><th>Descrição</th><th>Preço</th><th>Ações</th></tr></thead>';
    const tb = document.createElement('tbody');
    produtos.forEach(p => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${p.nome}</td><td>${p.descricao}</td><td>${formatBRL(p.preco)}</td>
        <td class="actions">
          <button class="btn" data-edit="${p.id}">Editar</button>
          <button class="btn" data-delete="${p.id}">Excluir</button>
        </td>`;
      tb.appendChild(tr);
    });
    tbl.appendChild(tb);
    tabela.innerHTML = '';
    tabela.appendChild(tbl);
  }

  function resetForm(){
    form.reset();
    document.getElementById('produto-id').value = '';
  }

  tabela.addEventListener('click', function(e){
    if(e.target.dataset.edit){
      const id = e.target.dataset.edit;
      const p = produtos.find(x=>x.id==id);
      if(!p) return;
      document.getElementById('produto-id').value = p.id;
      document.getElementById('produto-nome').value = p.nome;
      document.getElementById('produto-descricao').value = p.descricao;
      document.getElementById('produto-preco').value = p.preco;
    } else if(e.target.dataset.delete){
      const id = e.target.dataset.delete;
      if(confirm('Excluir este produto?')){
        removerProduto(id);
        produtos = produtos.filter(x=>x.id!=id);
        renderTabela();
      }
    }
  });

  form.addEventListener('submit', function(e){
    e.preventDefault();
    const id = document.getElementById('produto-id').value;
    const nome = document.getElementById('produto-nome').value.trim();
    const descricao = document.getElementById('produto-descricao').value.trim();
    const preco = parseFloat(document.getElementById('produto-preco').value) || 0;
    if(!nome || !descricao) { alert('Preencha os campos'); return; }
    if(id){
      const updated = { id: Number(id), nome, descricao, preco };
      atualizarProduto(updated);
      produtos = produtos.map(p => p.id==updated.id ? updated : p);
    } else {
      const novo = { nome, descricao, preco };
      const criado = adicionarProduto(novo);
      produtos.push(criado);
    }
    resetForm();
    renderTabela();
  });

  btnNovo.addEventListener('click', resetForm);

  // init
  renderTabela();
});
