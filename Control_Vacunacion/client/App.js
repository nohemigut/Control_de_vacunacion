import React, { Component, useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, Button, View, TouchableOpacity, Modal, ScrollView } from 'react-native';
import Axios from "axios";
import DatePicker from 'react-native-modern-datepicker';

let selectedVacunaId = null;

export default function App() {
  const [selectedValue, setSelectedValue] = useState(null);
  const [open, setOpen] = useState(false); // Fecha 1era Dosis
  const [date, setDate] = useState([]); // Fecha de DatePicker
  const [data, setData] = useState([]);
  const [numero, setNumero] = useState(''); // Cantidad de dosis
  const [estado, setEstado] = useState('');
  const [dosisOptions, setDosisOptions] = useState([]);
  const [selectedDosis, setSelectedDosis] = useState(null);
  const [vacunaDosisMap, setVacunaDosisMap] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    Axios.get("http://192.168.1.26:1000/list")
      .then(response => {
        setData(response.data);
        console.log("LOS TENGO", response.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
  };

  // Lista desplegable de vacunas
  const getPickerItems = () => {
    return data.map((item, index) => (
      <Picker.Item key={index} label={item.nombre} value={item.idVacuna} />
    ));
  };

  const initialState = {
    nombre: '',
    puesto: '',
    estado: '',
  }
  const [state, setState] = useState(initialState);

  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  }

  // Fecha 1ra dosis
  function handleOnPress() {
    setOpen(!open);
  }

  function handleDateChange(selectedDate) {
    setDate(selectedDate); // Almacena la fecha
  }

  // Dosis
  const handleNumeroChange = (text) => {
    // Actualiza el estado cuando el usuario ingrese el número
    setNumero(text);
  };

  const handleSubmit = () => {
    try {
      const idVacuna = selectedValue; // Obtener el valor de IdVacuna del Picker
      const dosis = parseInt(numero, 10);

      // Actualiza el estado de las dosis para la vacuna seleccionada
      setVacunaDosisMap({
        ...vacunaDosisMap,
        [idVacuna]: dosis,
      });

      let estado;

      switch (`${idVacuna}-${dosis}`) {
        case '0-0':
          estado = 'En riesgo';
          console.log("En riesgo", dosis);
          break;
        case '1-1':
          estado = 'En progreso';
          console.log("En progreso", dosis);
          break;
        case '2-2':
          estado = 'Protegido';
          console.log("Protegido", dosis);
          break;
        default:
          estado = 'Estado desconocido';
          console.log("Estado desconocido", dosis);
          break;
      }
    } catch (error) {
      // Maneja las excepciones
      alert(error.message);
    }
  }

  // Registrar un empleado
  const guardarEmpleado = () => {
    try {
      Axios.post("http://192.168.1.26:1000/create", {
        nombre: state.nombre,
        puesto: state.puesto,
        estado: state.estado,
        opcionSeleccionada: selectedValue,
        fecha: date,
        dosisAdmin: vacunaDosisMap
      }).then(() => {
        console.log("REGISTRADO")
      });
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.titulo}>Formulario para empleados</Text>

        <View style={{ margin: 10 }}>
          <TextInput style={styles.input} placeholder="NOMBRE" onChangeText={(value) => handleChangeText(value, 'nombre')} value={state.nombre} />
        </View>

        <View style={{ margin: 10 }}>
          <TextInput style={styles.input} placeholder="PUESTO LABORAL" onChangeText={(value) => handleChangeText(value, 'puesto')} value={state.puesto} />
        </View>

        <View style={{ margin: 10 }}>
          <TextInput style={styles.input} placeholder="CANTIDAD DOSIS (ESTADO VACUNACION)" value={numero} onChangeText={handleNumeroChange} keyboardType="numeric" />
        </View>

        <View>
          <TouchableOpacity onPress={handleOnPress}>
            <Text style={styles.input}>PRESIONA PARA SELECCIONAR FECHA</Text>
          </TouchableOpacity>
          <Modal
            animationType='slide'
            transparent={true}
            visible={open}
            style={styles.input}
          >
            <View>
              <DatePicker
                mode='calendar'
                onSelectedChange={selectedDate => handleDateChange(selectedDate)}
              />
            </View>
            <TouchableOpacity onPress={handleOnPress}>
              <Text>CLOSE</Text>
            </TouchableOpacity>
          </Modal>
        </View>

        <View style={{ margin: 10 }}>
          <Picker
            style={styles.picker}
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) => { setSelectedValue(itemValue); selectedVacunaId = itemValue }}
          >
            {data.map((item, index) => (
              <Picker.Item key={index} label={item.nombre} value={item.idVacuna} />
            ))}
          </Picker>
          <Text style={styles.label}>Opcion seleccionada: {selectedValue}</Text>
        </View>

        <View style={styles.button}>
          <Button title="Enviar" onPress={guardarEmpleado} />
        </View>

        <View style={styles.button}>
          <Button title="Actualizar empleado" onPress={guardarEmpleado} />
        </View>

        <View style={styles.button}>
          <Button title="Eliminar empleado" onPress={guardarEmpleado} />
        </View>

        <View style={styles.button}>
          <Button title="Deshabilitar empleado" onPress={guardarEmpleado} />
        </View>

        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25
  },
  input:{
    width: 300,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    color: '#ccc'
  },
  titulo:{
    fontSize: 20,
    textAlign: 'center',
    marginTop: 12,
    marginBottom:20,
    fontWeight: 'bold',
    color: '#333'
  },
  inputgroup:{
    flex:1,
    padding:0,
    marginBottom:20,
    borderBottomWidth:1,
    borderBottomColor:'#ccc'
  },
  listItem:{
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom:10,
  },
  button:{
    backgroundColor: '#007BFF',
    color: 'white',
    borderRadius: 5,
    padding: 2,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
    textAlign: 'center'
  },
  picker:{
    height: 40,
    color: '#ccc',
    width: 300,
    borderRadius: 10,
    borderWidth: 10,
    borderColor: '#333',
    padding: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#ccc',
    height: 40,
    width: 300,
    padding: 10
  },
});
