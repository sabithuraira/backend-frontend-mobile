import React, {useState} from 'react'
import {
    Button, 
    FlatList, 
    Text, 
    View, 
    StyleSheet
} from 'react-native'


const Index = ({navigation}) => {
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
            <View style={{ flexDirection: 'row', alignSelf: 'flex-end'}}>
                <Button title="+ Tambah"></Button>
            </View>

            <FlatList
                style=""
            ></FlatList>
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'fff',
        padding: 16
    }, 
    flatList: {
        marginTop: 16
    }
});

export default Index;