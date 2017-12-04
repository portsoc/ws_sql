/*
 * This module provides a random first name or a random last name, generated from a list
 * kindly provided by http://listofrandomnames.com/
 */

module.exports.randomFirstName = function () {
  return fnames[Math.floor(Math.random()*fnames.length)];
};

module.exports.randomLastName = function () {
  return lnames[Math.floor(Math.random()*lnames.length)];
};

const lnames = [
  'Adkinson', 'Banaszak', 'Bernabe', 'Blasi', 'Brackens', 'Branco',
  'Breece', 'Burda', 'Clinger', 'Clontz', 'Copland', 'Cottle', 'Croston', 'Culler',
  'Debose', 'Dees', 'Fairbairn', 'Friedt', 'Gillman', 'Havis', 'Hearon', 'Honore',
  'Kabel', 'Labombard', 'Lau', 'Ledet', 'Leverett', 'Lewandowski', 'Libby', 'Lotz',
  'Mclennon', 'Mixson', 'Morvant', 'Noble', 'Oakley', 'Ocheltree', 'Roscoe',
  'Rudman', 'Shaddix', 'Shiflett', 'Sinclair', 'Suchan', 'Swader', 'Tannehill',
  'Tito', 'Toki', 'Vizcaino', 'Woodburn', 'Yates', 'Zona',
];


const fnames = [
  'Amelia', 'Armandina', 'Austin', 'Ayako', 'Barrett', 'Bethel',
  'Chang', 'Columbus', 'Cori', 'Debi', 'Delinda', 'Estela', 'Frederick', 'Gertrud',
  'Gillian', 'Graham', 'Hortensia', 'Indira', 'Irish', 'Jazmine', 'Jeromy',
  'Karmen', 'Kathline', 'Kenda', 'Laticia', 'Liberty', 'Ling', 'Lourie', 'Maggie',
  'Manuel', 'Meta', 'Nicola', 'Olivia', 'Renda', 'Robbyn', 'Ruben', 'Rudolf',
  'Santina', 'Seema', 'Sheila', 'Sheree', 'Stefany', 'Steve', 'Sumiko', 'Tayna',
  'Theodore', 'Veola', 'Vickie', 'Victor', 'Yoshie',
];
