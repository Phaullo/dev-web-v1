// Utilitários simples
function formatBRL(v){
  return Number(v).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
}
function toNumber(v){ return Number(v) || 0; }
