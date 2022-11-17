import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform } from "react-native";
import * as imagePicker from "expo-image-picker";
import { IconButton } from "react-native-paper";

export default function ImagePicker() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await imagePicker.launchImageLibraryAsync({
      mediaTypes: imagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <IconButton onPress={pickImage} icon="camera" iconColor="black">
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
      </IconButton>
    </View>
  );
}
