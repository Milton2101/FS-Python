from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from config import config
#from flask_cors import CORS

app = Flask(__name__)
#CORS(app)

conexion=MySQL(app)

@app.route('/registros', methods=['GET'])
def listar_registros():
    try:
        cursor=conexion.connection.cursor()
        sql="SELECT * FROM registro"
        cursor.execute(sql)
        datos=cursor.fetchall()
        registros=[]
        for fila in datos:
            registro={'id':fila[0], 
                     'usuario':fila[1], 
                     'nombre':fila[2], 
                     'apellido':fila[3], 
                     'mail':fila[4],
                     'telefono':fila[5],
                     'direccion':fila[6],
                     'consulta':fila[7],
                     'tiempo':fila[8]}
            registros.append(registro)
        print(datos)
        return jsonify({'registros': registros, 'mensaje': "Registros listados."})
    except Exception as ex:
        return "Error"

@app.route('/registros/<usuario>', methods=['GET'])
def leer_registro(usuario):
    try:
        cursor=conexion.connection.cursor()
        sql="SELECT * FROM registro WHERE usuario = '{0}'".format(usuario)
        cursor.execute(sql)
        datos=cursor.fetchone()
        if datos != None:
            registro={'id':datos[0], 
                     'usuario':datos[1], 
                     'nombre':datos[2], 
                     'apellido':datos[3], 
                     'mail':datos[4],
                     'telefono':datos[5],
                     'direccion':datos[6],
                     'consulta':datos[7],
                     'tiempo':datos[8]}
            return jsonify({'registro': registro, 'mensaje': "Registro encontrado."})
        else:
            return jsonify({'mensaje': "Registro no encontrado."})
    except Exception as ex:
        return jsonify({'mensaje': "Error"})

@app.route('/registros', methods=['POST'])
def registrar_registro():
    try:
        cursor=conexion.connection.cursor()
        sql="""INSERT INTO registro (id, usuario, nombre, apellido, mail, telefono, direccion, consulta, tiempo)
        VALUES (NULL, '{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', current_timestamp())""".format(request.json['usuario'],request.json['nombre'],request.json['apellido'],request.json['mail'],request.json['telefono'],request.json['direccion'],request.json['consulta'])
        cursor.execute(sql)
        conexion.connection.commit()
        return jsonify({'mensaje': "Registro registrado."})
    except Exception as ex:
        return jsonify({'mensaje': "Error"})

@app.route('/registros/<usuario>', methods=['PUT'])
def actualizar_registro(usuario):
    try:
        cursor=conexion.connection.cursor()
        sql="""UPDATE registro SET nombre = '{0}', apellido = '{1}', mail = '{2}', telefono = '{3}', direccion = '{4}', consulta = '{5}', tiempo = current_timestamp() WHERE usuario = '{6}'""".format(request.json['nombre'],request.json['apellido'],request.json['mail'],request.json['telefono'],request.json['direccion'],request.json['consulta'], usuario)
        cursor.execute(sql)
        conexion.connection.commit()
        return jsonify({'mensaje': "Registro actualizado."})
    except Exception as ex:
        return jsonify({'mensaje': "Error"})

@app.route('/registros/<usuario>', methods=['DELETE'])
def eliminar_registro(usuario):
    try:
        cursor=conexion.connection.cursor()
        sql="DELETE FROM registro WHERE usuario = '{0}'".format(usuario)
        cursor.execute(sql)
        conexion.connection.commit()
        return jsonify({'mensaje': "Registros eliminado."})
    except Exception as ex:
        return jsonify({'mensaje': "Error"})

def pagina_no_encontrada(error):
    return "<h1>La pagina no existe</h1>", 404


if __name__ == '__main__':
    app.config.from_object(config['development'])
    app.register_error_handler(404, pagina_no_encontrada)
    app.run()