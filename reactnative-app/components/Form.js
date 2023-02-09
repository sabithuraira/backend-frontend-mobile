import { useState } from "react";
import { View, 
    Text, 
    Button, 
    StyleSheet,
    TextInput} 
    from "react-native";

const Form = ({route, navigation}) => {
    const [todo, setTodo] = useState(() => {
        if(route.params) return route.params;
        else return {
            id: '',
            title: '', 
            description: ''
        }
    })

    const onChangeTitle = (value) => {
        setTodo({ ...todo, title: value});
    };

    const onChangeDescription = (value) => {
        setTodo({ ...todo, description: value});
    };

    const saveData = () => {
        var header = new Headers();
        header.append('Content-Type', 'application/json');
        const { id, ...onlyTitleDesc } = todo

        if(todo.id==''){//STORE NEW DATA
            fetch('http://192.168.100.185/laravel-app/public/api/todo', {
                method: 'POST', 
                'headers': header, 
                body: JSON.stringify(onlyTitleDesc)
            })
            .then((response) => {
                navigation.goBack();
            })
            .catch((error) => console.log(error));
        }
        else{ //UPDATE EXISTING DATA
            fetch('http://192.168.100.185/laravel-app/public/api/todo/' + todo.id, {
                method: 'PATCH', 
                'headers': header, 
                body: JSON.stringify(onlyTitleDesc)
            })
            .then((response) => {
                navigation.goBack();
            })
            .catch((error) => console.log(error));
        }
    }

    const deleteData = () => {
        var header = new Headers();
        header.append('Content-Type', 'application/json');

        fetch('http://192.168.100.185/laravel-app/public/api/todo/' + todo.id, {
            method: 'DELETE', 
            'headers': header, 
        })
        .then((response) => {
            navigation.goBack();
        })
        .catch((error) => console.log(error));
    }

    return (
        <View style={style.container}>
            {todo.id.length > 0 &&
            <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginBottom: 16}}>
                <Button title="Delete" 
                    onPress={deleteData}
                    ></Button>
            </View>
            }

            <TextInput 
                value={todo.title}
                placeholder={'Title'} 
                style={style.formInput}
                onChangeText={(value) => onChangeTitle(value)}
            />    
            
            <TextInput 
                value={todo.description}
                placeholder={'Description'} 
                style={style.formInput}
                onChangeText={(value) => onChangeDescription(value)}
            />    
                  

            <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginBottom: 16}}>
                <Button title="Submit" 
                    onPress={saveData}
                    ></Button>
            </View>
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16
    }, 
    formInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        height: 40, 
        paddingStart: 8, 
        marginBottom: 8
    }
});

export default Form;