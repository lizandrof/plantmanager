import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    Keyboard,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    Alert,
    TouchableOpacity,
    Image
 } from 'react-native';
import { useNavigation } from '@react-navigation/core';
// importar AsyncStorage para gravar dados no dispositivo do usuário
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button } from '../components/Button';

import { MaterialIcons } from "@expo/vector-icons";
import * as imagePicker from "expo-image-picker";

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function UserIdentification(){
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [name, setName] = useState<string>();
    const [photo, setPhoto] = useState<string>();

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
    
    async function handleUserImage() {
        const { status } = await imagePicker.requestCameraPermissionsAsync();
    
        if (status !== "granted") {
          return Alert.alert("Aviso", "Você não pode Adicionar uma imagem 🥲")
        }
        const result = await imagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          quality: 1,
          mediaTypes: imagePicker.MediaTypeOptions.Images,
        });
    
        if (result.cancelled) {
          return;
        }
    
        const { uri: image } = result
        await AsyncStorage.setItem('@plantmanager:image', image);
        setPhoto(image)
      }

    // função chamada no onPress do botão (função async)
    async function handleSubmit(){
        // antes de permitir a navegacao, verificar se o user não digitou o nome
        if(!name)
        // se não digitou, exibe mensagem com elemento 'Alert' do React
            return Alert.alert('Me diz como chamar você 😅');
        // try testa se foi recebido o nome de usuário, senão catch dá o alerta    
        try{
            // salvar nome no dispositivo do usuário com AsyncStorage
            // usar uma chave usando o padrão iniciado com @nome-do-app:nome-da-informação
            // o await diz para aguardar o nome ser salvo para depois prosseguir
            await AsyncStorage.setItem('@plantamanager:user', name);        
            // se o nome foi digitado, continua navegação
            navigation.navigate('Confirmation', {
                title: 'Prontinho',
                subtitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado',
                buttonTitle: 'Começar',
                icon: 'smile',
                nextScreen: 'PlantSelect'
            }); 
        }catch {
            Alert.alert('Não foi possível salvar o seu nome 😅');
        }
        
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

                    <Text style={styles.title}>Adicione uma imagem!</Text>
                            <View style={styles.uploaded}>

                            <TouchableOpacity onPress={handleUserImage}>
                            {photo ? (
                                <Image source={{ uri: photo }}
                                style={styles.image}
                                />
                            ) : (
                                <MaterialIcons style={styles.iconPhoto} name="add-a-photo" size={45} />
                            )}
                            </TouchableOpacity>
                        </View>

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
    },
    iconPhoto: {
        color: colors.body_dark,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 40
    },
    uploaded : {
        alignSelf: 'center',
        paddingTop: 10    
    }

})
