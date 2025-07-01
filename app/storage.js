import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Button, View } from "react-native-web";

export default function Storage() {

    const [nome, setNome] = useState("");

    const salvarTexto = async () => {
        try {
            
            AsyncStorage.setItem("nome", nome);
            AsyncStorage.setItem("email", nome);
            AsyncStorage.setItem("idade", nome);

            let obj = {
                nome: "",
                email: "",
                senha: ""
            }

            AsyncStorage.setItem("usuario", JSON.stringify(obj));

            let usuarioRec = AsyncStorage.getItem("usuario");
            usuarioRec = JSON.parse(usuarioRec);

            let nomeRecuperado = AsyncStorage.getItem("nome");
            
            AsyncStorage.removeItem("nome");

            AsyncStorage.clear();
        } catch (error) {
            
        }
    }

    return (
        <View>
            <Text>Armazenamento Local</Text>
            <Button title="Salvar" onPress={() => salvarTexto()}/>
        </View>
    ); 
}