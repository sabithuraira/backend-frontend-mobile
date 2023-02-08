import React, {useState} from 'react'
import {
    Button, 
    FlatList, 
    Text, 
    View, 
    StyleSheet
} from 'react-native'


const Form = ({navigation}) => {
    const [todos, setTodos] = useState([]);

    const getTodos = async() => {
        try{
            let response = await fetch('http://192.168.100.170:8000/api/todo');
            let json = await response.json();
            setTodos(json.result.data)
        }
        catch(error){
            console.log(error)
        }
    };

    return (
        <View style={style.container}>
            <Text>Hallo semuanya</Text>
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'fff',
        padding: 16
    }
});

export default Form;