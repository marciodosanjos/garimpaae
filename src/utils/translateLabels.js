const translateLabels = (value) => {
  switch (value) {
    case "username":
      return "E-mail";
    case "password":
      return "Senha";
    case "processing":
      return "processando";
    case "shipped":
      return "enviado";
    case "pending":
      return "pendente";
    case "totalSales":
      return "Total de vendas";
    case "avgSales":
      return "Média de vendas";
    case "maxSale":
      return "Máx de itens p/ compra";
    case "brand":
      return "Marca";
    case "name":
      return "Nome";
    case "price":
      return "Preço";
    case "images":
      return "Imagens";
    case "sizes":
      return "Tamanhos";
    case "totalQty":
      return "Quantidade";
    case "colors":
      return "Cores";
    case "category":
      return "Categoria";
    case "_id":
      return "Deletar";
    case "description":
      return "Descrição";
    case "azul":
      return "#5353ec";
    default:
      return value;
  }
};

export default translateLabels;
