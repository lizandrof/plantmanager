// UseEffect carrega e executa algo quando a interface é carregada
// UseState armazena estados (username)
import React, { useEffect, useState} from 'react';
import { 
    StyleSheet,
    Text,
    Image,
    View
} from 'react-native';
// função para recuperar o userName gravado
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import userImg from '../assets/lizandro.png';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Header(){
    // armazena estado do userName e tipa estado como string
    const [userName,setUserName] = useState<string>();
    
    // 
    useEffect (() => {
        // função deve ser async para recuperar o userName
        // não se pode usar AsyncStorage direto no useEffect sem a função
        async function loadStorageUserName() {
            // AsyncStorage.getItem recupera dados do dispositivo do usuário
            const user = await AsyncStorage.getItem('@plantamanager:user');
            // armazena o nome do usuário no estado
            setUserName(user || '');
        }
        // chama a função
        loadStorageUserName();
    // se desejar, pode usar o vetor abaixo para sempre que o [userName[] o useEffect é recarregado    
    },[]);

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá</Text>
                <Text style={styles.userName}>
                    {userName}
                </Text>
            </View>

            <Image 
                source={userImg}
                style={styles.image} 
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: getStatusBarHeight()
        
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 40
    },
    greeting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text        
    },
    userName: {
        fontSize: 32,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 40
    }

});