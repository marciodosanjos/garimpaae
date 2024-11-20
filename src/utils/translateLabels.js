const translateLabels = (value) => {
  switch (value) {
    case "username":
      return "E-mail";
      break;
    case "password":
      return "Senha";
      break;

    default:
      return "outro";
      break;
  }
};

export default translateLabels;
