
var Articulo = require('./articuloModel.js');

module.exports.insertarArticulo = function (data, callback) {
	let newArticulo = new Articulo(data);

	newArticulo.save((error) => {
		if(error) callback(error);
		callback(null,"Artículo nuevo guardado");
	});
};

module.exports.consultarArticulos = function (callback) {
	Articulo.find((err, articulos) => {
		if(err)
			callback(err);
		else {
      		callback(null,articulos);
      	}
	});
};

module.exports.actualizarArticulos = function (data, callback) {
	let err = "";
	for (var i = 0; i < data.length; i++) {
		Articulo.update({_id: data[i]._id}, {stock: data[i].stock}, (error, result) => {
			if(error) err = " "+data[i].nombre+",";
		});
	}
	if (err != "") callback("Problemas para actualizar:"+err);
	else callback(null,"Artículo actualizado");
};

module.exports.eliminarArticulo = function (id, callback) {
	Articulo.remove({_id: id}, (error) => {
		if(error) callback(error);
		callback(null,"Articulo eliminado");
	});
};

module.exports.eliminarAllArticulos = function (callback) {
	Articulo.remove({}, (error) => {
		if(error) callback(error);
		callback(null,"Articulos eliminados");
	});
};
