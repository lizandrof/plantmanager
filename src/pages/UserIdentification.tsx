import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    Keyboard,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform
 } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function UserIdentification(){
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [name, setName] = useState<string>();

    const navigation = useNavigation();

    function handleInputBlur(){
        setIsFocused(false);
        setIsFilled(!!name);        
    }

    function handleInputFocus(){
        setIsFocused(true);   
    }

    function handleInputChange(value: string){
        setIsFilled(!!value);
        setName(value)  
    }    

    function handleSubmit(){
        navigation.navigate('Confirmation');
    }

    return(
        <View style={styles.container}>
            <KeyboardAvoidingView 
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.form}>
                        
                        <View style={styles.header}>
                            <Text style={styles.emoji}>
                                { isFilled ? '😁' : '😀' }
                            </Text>
                            <Text style={styles.title}>
                            Como podemos { '\n' }
                            chamar você?
                            </Text>
                        </View>                
                        
                        <TextInput
                            style={[
                                styles.input,
                                (isFocused || isFilled) &&
                                { borderColor: colors.green }  
                            ]}
                            placeholder="Digite um nome"
                            onBlur={handleInputBlur}
                            onFocus={handleInputFocus}
                            onChangeText={handleInputChange} 
                        />

                        <View style={styles.footer}>
                            <Button
                            title="Confirmar"
                            onPress={handleSubmit} />                    
                        </View>
                        
                    </View>
                </TouchableWithoutFeedback>      
            </KeyboardAvoidingView>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',        
    },
    form: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center'
    },
    header: {
        alignItems: 'center'
    },
    emoji: {
        fontSize: 44
    },
    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center'
    },
    title: {
        fontSize: 24,
        lineHeight: 32,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        marginTop: 20
    },
    footer: {
        width: '100%',
        marginTop: 40,
        paddingHorizontal: 20
    }

})