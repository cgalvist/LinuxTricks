angular.module('starter.services', [])

.factory('Diccionarios', function() {
  // Might use a resource here that returns a JSON array

  //datos de los diccionarios
  var diccionarios = [{
    id: 0,
    nombre: 'Linux (general)',
    descripcion: 'Comandos básicos',
    logo: 'img/diccionarios/iconos/linux.svg'
  }, {
    id: 1,
    nombre: 'Ubuntu',
    descripcion: 'Sistema operativo',
    logo: 'img/diccionarios/iconos/ubuntu.svg'
  }, {
    id: 2,
    nombre: 'Bash',
    descripcion: 'Scripts',
    logo: 'img/diccionarios/iconos/terminal.svg'
  }, {
    id: 3,
    nombre: 'VI',
    descripcion: 'Editor de texto avanzado',
    logo: 'img/diccionarios/iconos/vim.svg'
  }];

  return {
    diccionarios: function() {
      return diccionarios;
    },
    /*remove: function(item) {
      diccionarios.splice(diccionarios.indexOf(item), 1);
  },*/
    get: function(itemId) {
      for (var i = 0; i < diccionarios.length; i++) {
        if (diccionarios[i].id === parseInt(itemId)) {
          return diccionarios[i];
        }
      }
      return null;
    }
  };
})

.factory('Programas', function() {
  // Might use a resource here that returns a JSON array

  var programas = [{
    id: 0,
    nombre: 'GIMP',
    descripcion: 'Editor de imágenes',
    logo: 'img/programas/iconos/gimp.svg'
  }, {
    id: 1,
    nombre: 'LibreOffice',
    descripcion: 'Suite de ofimática',
    logo: 'img/programas/iconos/libreoffice.svg'
  }, {
    id: 2,
    nombre: 'Blender',
    descripcion: 'Modelado y edición de gráficos 3d',
    logo: 'img/programas/iconos/blender.svg'
  }, {
    id: 3,
    nombre: 'Audacity',
    descripcion: 'Editor de audio',
    logo: 'img/programas/iconos/audacity.svg'
  }];

  return {
    programas: function() {
      return programas;
    },
    /*remove: function(item) {
      programas.splice(programas.indexOf(item), 1);
  },*/
    get: function(itemId) {
      for (var i = 0; i < programas.length; i++) {
        if (programas[i].id === parseInt(itemId)) {
          return programas[i];
        }
      }
      return null;
    }
  };
});
