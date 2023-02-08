import * as React from 'react';
import Index from '../components/Index';
import Form from '../components/Form';
import {createNativeStackNavigator} from '@react-navigation/native-stack'

const Stack =  createNativeStackNavigator();

const Routes = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Index" component={Index} />
            <Stack.Screen name="Form" component={Form} />
        </Stack.Navigator>
    );
}

export default Routes;