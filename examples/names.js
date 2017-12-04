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
  'Antilles', 'Banaszak', 'Bernabe', 'Biggs', 'Brackens', 'Branco',
  'Breece', 'Burda', 'Clinger', 'Clontz', 'Copland', 'Cottle', 'Croston', 'Culler',
  'Debose', 'Dees', 'Fairbairn', 'Friedt', 'Gillman', 'Hutch', 'Hearon', 'Honore',
  'Kabel', 'Labombard', 'Lau', 'Ledet', 'Leverett', 'Lewandowski', 'Libby', 'Lotz',
  'Mclennon', 'Mixson', 'Morvant', 'Noble', 'Oakley', 'Palpatine', 'Roscoe', 'Ren',
  'Rudman', 'Shaddix', 'Solo', 'Sinclair', 'Sloane', 'Skywalker', 'Tarkin',
  'Tito', 'Tyrie', 'Vizcaino', 'Wedge', 'Yates', 'Zona',
];


const fnames = [
  'Amelia', 'Armandina', 'Anakin', 'Ayako', 'Barrett', 'Bethel',
  'Chang', 'Columbus', 'Chewbacca', 'Debi', 'Delinda', 'Estela', 'Frederick',
  'Gillian', 'Graham', 'Han', 'Indira', 'Irish', 'Jazmine', 'Jeromy',
  'Kylo', 'Kathline', 'Rey', 'Laticia', 'Leia', 'Luke', 'Lourie', 'Maggie',
  'Manuel', 'Meta', 'Nicola', 'Olivia', 'Renda', 'Robbyn', 'Ruben', 'Rudolf',
  'Santina', 'Seema', 'Sheila', 'Sheev', 'Stefany', 'Steve', 'Sumiko', 'Tayna',
  'Theodore', 'Veola', 'Vickie', 'Victor', 'Wilhuff', 'Yoshie',
];
