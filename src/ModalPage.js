import React from "react";
import { View, Text, StyleSheet, Dimensions, Image,Modal } from "react-native";
import { Icon, Button } from "react-native-elements";
const { width, height } = Dimensions.get("window");

class ModalPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
      itemDetails:props.modalResponse
    };
  }

  _backButtonPress() {
    this.setState({isVisible:false})
  }

  render() {
    let src = this.state.itemDetails.pagemap.cse_image;
    let imagePath;
    if (src) {
      imagePath = {uri: this.state.itemDetails.pagemap.cse_image[0].src};
    } else {
      imagePath = require('./bg.png');
    }
    return (
      <Modal visible={this.props.isVisible}>
         <View style={styles.outerContainerStyle}>
        <View style={[styles.headerStyle]}>
          <Icon
            color="#fff"
            name="arrow-left"
            type="font-awesome"
            size={20}
            underlayColor="transparent"
            onPress={() => this._backButtonPress()}
          />
        </View>
        <View style={styles.detailsContainerStyle}>
          <View style={styles.upperContainerStyle}>
            <Image
              style={styles.imageStyle}
              source={imagePath}
            />
          </View>
          <View style={styles.bottomContainerStyle}>
            <View style={styles.eventNameStyle}>
              <Text style={styles.eventNameTxtStyle}>Event</Text>
            </View>
            <Text style={styles.nameTxtStyle}>
              {this.state.itemDetails.title}
            </Text>
            <View style={styles.detailContainerStyle}>
              <View style={styles.wrapperViewStyle}>
                <Icon
                  name="calendar-o"
                  type="font-awesome"
                  color="#666666"
                  size={18}
                  underlayColor="transparent"
                />
                <Text style={styles.itemTxtStyle}>
                  Sun 31 May 2020 at 5:30 AM
                </Text>
              </View>

              <View style={styles.wrapperViewStyle}>
                <Icon
                  name="location-pin"
                  type="simple-line-icon"
                  color="#666666"
                  size={18}
                  underlayColor="transparent"
                />
                <Text style={styles.itemTxtStyle}>
                  {this.state.itemDetails.Location}
                </Text>
              </View>
              <View style={styles.wrapperViewStyle}>
                <Icon
                  name="money"
                  type="font-awesome"
                  color="#666666"
                  size={18}
                  underlayColor="transparent"
                />
                <Text style={styles.itemTxtStyle}>
                  {this.state.itemDetails.snippet}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.footerButtonStyle}>
          <Button
            title={this.state.trackId}
            onPress={() => {
              this._changeTrackId();
            }}
            buttonStyle={styles.trackButtonStyle}
          />
        </View>
      </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  outerContainerStyle: {
    flex: 1,
    backgroundColor: "#F6F6F6",
  },
  headerStyle: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
    width: width,
    backgroundColor: "#0966aa",
    elevation: 20,
  },
  detailsContainerStyle: {
    flex: 1,
    backgroundColor: "#EFF0F1",
    flexDirection: "column",
  },
  upperContainerStyle: {
    flex: 0.3,
  },
  imageStyle: {
    width: width,
    height: 200,
  },
  nameTxtStyle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222222",
  },
  itemTxtStyle: {
    fontSize: 16,
    color: "#222222",
    marginLeft: 10,
  },
  bottomContainerStyle: {
    flex: 0.7,
    margin: 10,
  },

  footerButtonStyle: {
    left: 0,
    right: 0,
    bottom: 0,
    height: 64,
    width: width,
    borderStyle: "solid",
    borderTopWidth: 1,
    borderColor: "darkgray",
    alignItems: "flex-end",
    backgroundColor: "#F6F6F6",
  },
  trackButtonStyle: {
    minWidth: 64,
    padding: 10,
    margin: 10,
    height: 40,
    width: 150,
  },
  wrapperViewStyle: {
    flexDirection: "row",
    margin: 3,
  },
  eventNameStyle: {
    width: 45,
    height: 20,
    backgroundColor: "#2B3148",
    alignItems: "center",
    textAlign: "center",
  },
  eventNameTxtStyle: {
    color: "white",
  },
  detailContainerStyle: {
    marginTop: 10,
  },
});

export default ModalPage;