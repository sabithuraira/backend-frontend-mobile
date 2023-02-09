import React, { useState } from "react";
import { View, 
    Text, 
    Button, 
    StyleSheet,
    FlatList,
    TouchableOpacity} 
    from "react-native";


const Index = ({navigation}) => {
    const [todos, setTodos] = useState([])

    React.useEffect(() => {
        const focusHandler = navigation.addListener('focus', () => {
            getTodo();
        })
    });

    const getTodo = async() => {
        try{
            let response = await fetch('http://192.168.100.185/laravel-app/public/api/todo');
            let json = await response.json()
            setTodos(json.result.data)
        }
        catch(error){
            console.log(error)
        }
    };

    useState(() => {
        getTodo();
    });

    return (
        <View style={style.container}>
            <View style={{ flexDirection: 'row', alignSelf: 'flex-end'}}>
                <Button title="+ Add Todo" 
                    onPress={() => navigation.navigate('Form')}
                    ></Button>
            </View>
            <FlatList 
                style={style.flatList}
                data={todos}
                renderItem={({item}) => {
                    return (
                        <TouchableOpacity 
                            onPress={() => {
                                navigation.navigate('Form', {
                                    id: item.encId,
                                    title: item.title, 
                                    description: item.description
                                })
                            }}>
                            <View style={{ borderColor: '#ccc', borderWidth: 1, padding: 8, marginBottom: 8}}>
                                <Text style={{ fontWeight: 'bold'}}>{ item.title }</Text>
                                <Text>{ item.description }</Text>
                            </View>
                        </TouchableOpacity>
                    );
                }}
                />
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16
    }, 
    flatList: {
        marginTop: 16,
    }
});

export default Index;