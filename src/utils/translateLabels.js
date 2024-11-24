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
    default:
      return "outro";
      break;
  }
};

export default translateLabels;
