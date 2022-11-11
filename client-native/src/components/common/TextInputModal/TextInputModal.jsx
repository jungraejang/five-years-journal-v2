import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Modal,
  TouchableOpacity,
} from "react-native";
import Editor from "../Editor/Editor";
import { setEditorMode, selectEditorMode } from "../../../slices/editorSlice";
import { useDispatch, useSelector } from "react-redux";

function TextInputModal() {
  let dispatch = useDispatch();
  let editorMode = useSelector(selectEditorMode);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={editorMode}
      onRequestClose={() => {
        console.log("modal closed");
        dispatch(setEditorMode(false));
      }}
    >
      {/* <TouchableOpacity
          // style={styles.container}
          activeOpacity={1}
          onPressOut={() => {
            dispatch(setEditorMode(false));
          }}
        > */}
      <Editor />
      {/* </TouchableOpacity> */}
    </Modal>
  );
}

export default TextInputModal;
