import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform } from "react-native";
import * as imagePicker from "expo-image-picker";
import { IconButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { selectImage, setImage } from "../../../slices/editorSlice";

export default function ImagePicker() {
  //   const [image, setImage] = useState(null);
  let dispatch = useDispatch();
  let image = useSelector(selectImage);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await imagePicker.launchImageLibraryAsync({
      mediaTypes: imagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      console.log(result);

      dispatch(setImage(result.assets[0].uri));
    }

    // // const split = result.uri.split(".");
    // // const fileName = split[split.length - 1];
    // result = result.assets[0];
    // var filename = result.uri.substring(
    //   result.uri.lastIndexOf("/") + 1,
    //   result.uri.length
    // );

    // console.log(filename);
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <IconButton
        onPress={pickImage}
        icon="camera"
        iconColor="black"
      ></IconButton>
    </View>
  );
}
