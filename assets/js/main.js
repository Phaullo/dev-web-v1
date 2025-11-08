// Popula catálogo e gerencia orçamento (salvo em sessionStorage)
document.addEventListener('DOMContentLoaded', async function(){
  const lista = document.getElementById('lista-produtos');
  const itensOrc = document.getElementById('itens-orcamento');
  const totalEl = document.getElementById('total');
  const limparBtn = document.getElementById('limpar-orcamento');
  const exportBtn = document.getElementById('exportar-orcamento');

  let produtos = await carregarProdutos();
  function renderCatalogo(){
    lista.innerHTML = '';
    produtos.forEach(p => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `<h3>${p.nome}</h3><p>${p.descricao}</p><p><strong>${formatBRL(p.preco)}</strong></p>
        <button class="btn" data-id="${p.id}">Adicionar</button>`;
      lista.appendChild(card);
    });
  }

  // orçamento no sessionStorage (limpa ao fechar a aba)
  function getOrcamento(){ return JSON.parse(sessionStorage.getItem('siop_orc') || '[]'); }
  function salvarOrcamento(v){ sessionStorage.setItem('siop_orc', JSON.stringify(v)); }

  function renderOrcamento(){
    const itens = getOrcamento();
    itensOrc.innerHTML = '';
    let total = 0;
    itens.forEach(item => {
      const div = document.createElement('div');
      div.className = 'item';
      div.innerHTML = `<span>${item.nome} x ${item.qtd}</span><span>${formatBRL(item.qtd * item.preco)}</span>`;
      itensOrc.appendChild(div);
      total += item.qtd * item.preco;
    });
    totalEl.textContent = total.toFixed(2);
  }

  lista.addEventListener('click', function(e){
    if(e.target.tagName === 'BUTTON'){
      const id = e.target.dataset.id;
      const p = produtos.find(x => x.id == id);
      if(!p) return;
      const orc = getOrcamento();
      const found = orc.find(x=>x.id==p.id);
      if(found) found.qtd++;
      else orc.push({ id:p.id, nome:p.nome, preco:p.preco, qtd:1 });
      salvarOrcamento(orc);
      renderOrcamento();
    }
  });

  limparBtn.addEventListener('click', function(){
    sessionStorage.removeItem('siop_orc');
    renderOrcamento();
  });

  exportBtn.addEventListener('click', function(){
    const itens = getOrcamento();
    if(itens.length===0){ alert('Orçamento vazio.'); return; }
    // simula export: gera texto e baixa como .txt
    let texto = 'Orçamento - Sistema de Orçamentos Online\n\n';
    let total=0;
    itens.forEach(i => { texto += `${i.nome} x ${i.qtd} = R$ ${ (i.qtd*i.preco).toFixed(2) }\n`; total+=i.qtd*i.preco; });
    texto += `\nTotal: R$ ${total.toFixed(2)}\n\n(Export simulado)`;
    const blob = new Blob([texto], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orcamento.txt';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });

  // init
  renderCatalogo();
  renderOrcamento();
});
