import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import { TextInput, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { style } from "../assets/Style";

class Suratin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      deskripsi: "",
      listData: [],
      idEdit: null,
      open: 0,
    };
    this.url = "http://192.168.0.102/api/notes.php";
  }
  componentDidMount() {
    this.ambilListData();
  }
  async ambilListData() {
    await fetch(this.url)
      .then((response) => response.json())
      .then((json) => {
        console.log("Hasil yang didapat: " + JSON.stringify(json.data.result));
        this.setState({ listData: json.data.result });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  klikSimpan() {
    if (
      this.state.title == "" ||
      this.state.deskripsi == ""
    ) {
      alert("Silakan lengkapi form");
    } else {
      if (this.state.idEdit) {
        var urlAksi = this.url + "/?op=update&id=" + this.state.idEdit;
      } else {
        var urlAksi = this.url + "/?op=create";
      }

      fetch(urlAksi, {
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body:"title="+this.state.title+"&deskripsi="+this.state.deskripsi
      })
        .then((response) => response.json())
        .then((json) => {
          this.setState({ title: "" });
          this.setState({ deskripsi: "" });
          this.setState({ idEdit: "" });
          this.ambilListData();
        });
    }
  }
  async klikEdit(id) {
    await fetch(this.url + "/?op=detail&id=" + id)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ title: json.data.result[0].title });
        this.setState({ deskripsi: json.data.result[0].deskripsi });
        this.setState({ idEdit: id });
      });
  }
  async klikDelete(id) {
    await fetch(this.url + "/?op=delete&id=" + id)
      .then((response) => response.json())
      .then((json) => {
        alert("Data berhasil didelete");
        this.ambilListData();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <View style={style.viewWrapper}>
        
        <ScrollView style={style.viewData}>
          {this.state.listData.map((val, index) => (
            <View style={style.viewList} key={index}>
              <Text style={style.textListNama}>{val.title}</Text>
              <Button
                style={style.textListEdit}
                onPress={() => this.klikEdit(val.id)}>
                <Icon name="pencil" size={20} solid />
              </Button>
              <Button
                style={style.textListDelete}
                onPress={() => this.klikDelete(val.id)}>
                <Icon name="trash-can-outline" size={20} color="#900" solid />
              </Button>
            </View>
          ))}
        </ScrollView>
        <View style={style.viewForm}>
          <Text style={style.title}>Form Input</Text>
        <ScrollView>
          <TextInput
            style={style.textInput}
            mode="outlined"
            label="Title"
            placeholder="Masukkan Judul"
            value={this.state.title}
            onChangeText={(text) =>
              this.setState({ title: text })
            }></TextInput>
          <TextInput
            style={style.textInput}
            mode="outlined"
            label="Deskripsi"
            multiline={true}
            numberOfLines={4}
            placeholder="Masukkan Deskripsi"
            value={this.state.deskripsi}
            onChangeText={(text) =>
              this.setState({ deskripsi: text })
            }></TextInput>
          <Button
            mode="contained"
            onPress={() => this.klikSimpan()}>Masukkan Data</Button>
        </ScrollView>
        </View>
      </View>
    );
  }
}

export default Suratin;
