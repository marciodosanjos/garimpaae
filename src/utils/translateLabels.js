const translateLabels = (value) => {
  switch (value) {
    case "username":
      return "E-mail";
      break;
    case "password":
      return "Senha";
      break;
    case "processing":
      return "processando";
      break;
    case "shipped":
      return "enviado";
      break;
    case "pending":
      return "pendente";
      break;
    case "totalSales":
      return "Total de vendas";
      break;
    case "avgSales":
      return "Média de vendas";
      break;
    case "maxSale":
      return "Máx de itens p/ compra";
      break;
    case "brand":
      return "Marca";
      break;
    case "name":
      return "Nome";
      break;
    case "price":
      return "Preço";
      break;
    case "images":
      return "Imagens";
      break;
    case "sizes":
      return "Tamanhos";
      break;
    case "totalQty":
      return "Quantidade";
      break;
    case "colors":
      return "Cores";
      break;
    case "category":
      return "Categoria";
      break;
    case "_id":
      return "Deletar";
      break;
    default:
      return "outro";
      break;
  }
};

export default translateLabels;
