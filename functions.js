
exports.generateID =  (idLength = 15) => {
  const charString = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%"&*()-+=§¢¬';
  let id = '';
  for (let i = 0; i < idLength; i++) {
    id += charString.charAt(Math.floor(Math.random() * charString.length));
  }
  return id;
};
