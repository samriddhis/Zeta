import React from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import {SearchBar} from 'react-native-elements';
import styles from "./styles";
import ModalPage from "./ModalPage"

class ListItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: '', //data.items,
      searchTxt: '',
      isVisible:false,
      modalResponse:{}
    };
  }
  componentDidMount() {}
  _openModal=(item)=>{
    //
    this.setState({isVisible:true,modalResponse:item})
  }
  _renderItem = ({item, index}) => {
    let src = item.pagemap.cse_image;
    let imagePath;
    if (src) {
      imagePath = {uri: item.pagemap.cse_image[0].src};
    } else {
      imagePath = require('./bg.png');
    }
    return (
      <TouchableOpacity style={styles.button} onPress={()=>this._openModal(item)}>
        <Image source={imagePath} style={{width: 200, height: 200}} />
        <Text>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  getResponseForCall = async (txt) => {
    try {
      let resp = await this.apiCall(txt);
      if (resp) {
        //do something
        this.setState({response: resp.items});
      } else {
        //
      }
    } catch (error) {
      console.log(error);
    }
  };

  apiCall = (txt) => {
    const url =
      'https://customsearch.googleapis.com/customsearch/v1?cx=59c8884fec3cc929b&key=AIzaSyDnmdDyt9TESuOJZOezbQzX_vMhByhzkqk&num=10&q=' +
      txt;
    return new Promise(function (resolve, reject) {
      try {
        fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'cache-control': 'no-cache',
          },
        })
          .then((response) => resolve(response.json()))
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  };
  textChange = (search) => {
    this.setState({searchTxt: search});
    this.getResponseForCall(search);
  };
  render() {
    return (
      <View>
        {this.state.isVisible?(
          <ModalPage modalResponse={this.state.modalResponse}/>
        ):(
        <View>
        <SearchBar
          placeholder={'type here...'}
          onChangeText={this.textChange}
          value={this.state.searchTxt}
        />
        <FlatList
          ref={(ref) => (this.listRef = ref)}
          data={this.state.response}
          renderItem={this._renderItem}
        />
        </View>)}
      </View>
    );
  }
}

export default ListItems;
