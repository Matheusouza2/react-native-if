/* //marcio.matheus@univasf.edu.br
import { CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useRef, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function CameraComponent() {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [foto, setFotoUri] = useState(null);
  const [mediaPermission, requestMediaPermission] =
    MediaLibrary.usePermissions();

  const tirarFoto = async () => {
    if (cameraRef.current) {
      try {
        const albuns = await MediaLibrary.getAlbumsAsync();

        let meuAlbum = albuns.find((a) => a.title === "MinhasFotos");

        const novaFoto = await cameraRef.current.takePictureAsync();

        const asset = await MediaLibrary.createAssetAsync(
          novaFoto.uri,
          meuAlbum
        );

        if (!meuAlbum) {
          meuAlbum = await MediaLibrary.createAlbumAsync(
            "MinhasFotos",
            asset,
            false
          );
        }

        Alert.alert("Sucesso", `Foto salva com sucesso no caminho ${meuAlbum}`);
      } catch (error) {
        console.log(error);
        Alert.alert("Erro", "Não foi possivel salvar a foto");
      }
    }
  };

  function toggleFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  if (!permission) {
    return (
      <View>
        <Text>Aguardando permissão</Text>
      </View>
    );
  }

  if (!permission?.granted || !mediaPermission?.granted) {
    return (
      <View style={styles.centered}>
        <Text>Você precisa fornecer a permissão de acesso</Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text>Conceder Permissão</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={requestMediaPermission}>
          <Text>Conceder Permissão aos albuns</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (foto) {
    return (
      <View style={styles.centered}>
        <Image source={{ uri: foto }} style={styles.preview} />
        <TouchableOpacity onPress={() => setFotoUri(null)}>
          <Text style={styles.text}>Tirar outra</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
      <View style={styles.controls}>
        <TouchableOpacity onPress={toggleFacing} style={styles.buttonSwitch}>
          <Text style={styles.text}>🔄</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={tirarFoto}
          style={styles.buttonTakePicture}
        ></TouchableOpacity>
      </View>
    </CameraView>
  );
}

const styles = StyleSheet.create({
  camera: { flex: 1 },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  controls: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    marginBottom: 50,
  },
  buttonTakePicture: {
    backgroundColor: "#ffffff",
    padding: 12,
    width: 70,
    height: 70,
    borderColor: "#000000",
    borderWidth: 2,
    borderRadius: 100,
    margin: 5,
  },

  text: { fontSize: 32, fontWeight: "bold" },
  captureButton: {
    backgroundColor: "#ffffffff",
    padding: 20,
    borderRadius: 50,
    marginVertical: 10,
  },
  preview: {
    width: "90%",
    height: "70%",
    borderRadius: 8,
    marginBottom: 20,
  },
});
 */