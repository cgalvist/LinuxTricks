angular.module('starter.services', [])

.factory('Diccionarios', function() {
  // Might use a resource here that returns a JSON array

  //datos de los diccionarios
  var diccionarios = [{
    id: 0,
    nombre: 'Linux (general)',
    descripcion: 'Comandos básicos',
    logo: 'img/ionic.png'
  }, {
    id: 1,
    nombre: 'Ubuntu',
    descripcion: 'Sistema operativo',
    logo: 'img/ionic.png'
  }, {
    id: 2,
    nombre: 'Bash',
    descripcion: 'Scripts',
    logo: 'img/ionic.png'
  }, {
    id: 3,
    nombre: 'Emacs',
    descripcion: 'Editor de texto avanzado',
    logo: 'img/ionic.png'
  }, {
    id: 4,
    nombre: 'VI',
    descripcion: 'Editor de texto avanzado',
    logo: 'img/ionic.png'
  }];

  return {
    diccionarios: function() {
      return diccionarios;
    },
    remove: function(item) {
      diccionarios.splice(diccionarios.indexOf(item), 1);
    },
    get: function(itemId) {
      for (var i = 0; i < diccionarios.length; i++) {
        if (diccionarios[i].id === parseInt(itemId)) {
          return diccionarios[i];
        }
      }
      return null;
    }
  };
});
