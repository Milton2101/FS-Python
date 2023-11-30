from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from config import config

app = Flask(__name__)

conexion=MySQL(app)

@app.route('/clientes', methods=['GET'])
def listar_clientes():
    try:
        cursor=conexion.connection.cursor()
        sql="SELECT * FROM clientes"
        cursor.execute(sql)
        datos=cursor.fetchall()
        clientes=[]
        for fila in datos:
            cliente={'usuario':fila[0], 
                     'nombre':fila[1], 
                     'apellido':fila[2], 
                     'mail':fila[3], 
                     'telefono':fila[4],
                     'direccion':fila[5],}
            clientes.append(cliente)
        print(datos)
        return jsonify({'clientes': clientes, 'mensaje': "Clientes listados."})
    except Exception as ex:
        return "Error"

@app.route('/clientes/<usuario>', methods=['GET'])
def leer_cliente(usuario):
    try:
        cursor=conexion.connection.cursor()
        sql="SELECT * FROM clientes WHERE usuario = '{0}'".format(usuario)
        cursor.execute(sql)
        datos=cursor.fetchone()
        if datos != None:
            cliente={'usuario':datos[0], 
                     'nombre':datos[1], 
                     'apellido':datos[2], 
                     'mail':datos[3], 
                     'telefono':datos[4],
                     'direccion':datos[5],}
            return jsonify({'cliente': cliente, 'mensaje': "Cliente encontrado."})
        else:
            return jsonify({'mensaje': "Cliente no encontrado."})
    except Exception as ex:
        return jsonify({'mensaje': "Error"})

@app.route('/clientes', methods=['POST'])
def registrar_cliente():
    try:
        cursor=conexion.connection.cursor()
        sql="""INSERT INTO clientes (usuario, nombre, apellido, mail, telefono, direccion)
        VALUES ('{0}', '{1}', '{2}', '{3}', '{4}', '{5}')""".format(request.json['usuario'],request.json['nombre'],request.json['apellido'],request.json['mail'],request.json['telefono'],request.json['direccion'])
        cursor.execute(sql)
        conexion.connection.commit()
        return jsonify({'mensaje': "Cliente registrado."})
    except Exception as ex:
        return jsonify({'mensaje': "Error"})

@app.route('/clientes/<usuario>', methods=['PUT'])
def actualizar_cliente(usuario):
    try:
        cursor=conexion.connection.cursor()
        sql="""UPDATE clientes SET nombre = '{0}', apellido = '{1}', mail = '{2}', telefono = '{3}', direccion = '{4}' WHERE usuario = '{5}'""".format(request.json['nombre'],request.json['apellido'],request.json['mail'],request.json['telefono'],request.json['direccion'], usuario)
        cursor.execute(sql)
        conexion.connection.commit()
        return jsonify({'mensaje': "Cliente actualizado."})
    except Exception as ex:
        return jsonify({'mensaje': "Error"})

@app.route('/clientes/<usuario>', methods=['DELETE'])
def eliminar_cliente(usuario):
    try:
        cursor=conexion.connection.cursor()
        sql="DELETE FROM clientes WHERE usuario = '{0}'".format(usuario)
        cursor.execute(sql)
        conexion.connection.commit()
        return jsonify({'mensaje': "Cliente eliminado."})
    except Exception as ex:
        return jsonify({'mensaje': "Error"})

def pagina_no_encontrada(error):
    return "<h1>La pagina no existe</h1>", 404


if __name__ == '__main__':
    app.config.from_object(config['development'])
    app.register_error_handler(404, pagina_no_encontrada)
    app.run()