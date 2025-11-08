// API simulado - tenta carregar data/produtos.json via fetch (requer servidor HTTP).
// Para persistência o CRUD usa localStorage.
const PROD_KEY = 'siop_produtos_v1';

async function carregarProdutos(){
  // tenta fetch do arquivo JSON
  try {
    const res = await fetch('data/produtos.json');
    if(res.ok){
      const data = await res.json();
      // se não houver localStorage, inicializa com esse data
      if(!localStorage.getItem(PROD_KEY)) localStorage.setItem(PROD_KEY, JSON.stringify(data));
      return JSON.parse(localStorage.getItem(PROD_KEY) || '[]');
    }
  } catch(e){
    // ignore - continuará com localStorage
  }
  return JSON.parse(localStorage.getItem(PROD_KEY) || '[]');
}

function salvarProdutos(produtos){
  localStorage.setItem(PROD_KEY, JSON.stringify(produtos));
}

function adicionarProduto(prod){
  const ps = JSON.parse(localStorage.getItem(PROD_KEY) || '[]');
  const novo = Object.assign({}, prod, { id: Date.now() });
  ps.push(novo);
  salvarProdutos(ps);
  return novo;
}

function atualizarProduto(updated){
  const ps = JSON.parse(localStorage.getItem(PROD_KEY) || '[]');
  const idx = ps.findIndex(p => p.id == updated.id);
  if(idx >= 0){ ps[idx] = updated; salvarProdutos(ps); return true; }
  return false;
}

function removerProduto(id){
  let ps = JSON.parse(localStorage.getItem(PROD_KEY) || '[]');
  ps = ps.filter(p => p.id != id);
  salvarProdutos(ps);
  return true;
}
