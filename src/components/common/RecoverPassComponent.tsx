import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import React from 'react';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


type Props = {
  toggleModal: () => void,
  toggleModalVisible: boolean,
}
interface child {
  children: React.ReactNode,

}


const RecoverPassComponent: React.FC<Props & child> = ({ toggleModal, toggleModalVisible, children }: Props & child) => {

  return (
    <Modal
      onBackdropPress={toggleModal} //       onBackdropPress={() => setModalVisible(false)}
      onBackButtonPress={toggleModal}//        onBackdropPress={() => setModalVisible(false)}
      isVisible={toggleModalVisible}
      swipeDirection="down"
      onSwipeComplete={toggleModal}
      animationIn="bounceInUp"
      animationOut="bounceOutDown"
      animationInTiming={900}
      animationOutTiming={500}
      backdropTransitionInTiming={1000}
      backdropTransitionOutTiming={500}
      style={styles.modal}
    >
      <View style={styles.modalContent}>
        <View style={styles.center}>
          {children}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  // Modal Design <------
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "#FAF9F6",
    paddingHorizontal: 12,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    minHeight: 200,
    paddingBottom: 20,
  },
  center: {
    alignItems: "center",
  },
  barIcon: {
    width: 60,
    height: 5,
    backgroundColor: "#000",
    borderRadius: 3,
  },
  buttonBack: {
    height: 50,
    marginTop: 10,
    marginLeft: 25,
    marginRight: 25,
    borderRadius: 15,
    fontSize: 20,
    padding: 4,
    textAlign: 'center'
  }
})

export default RecoverPassComponent;