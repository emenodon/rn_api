import React, { Component } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { style } from "../assets/Style";
// import DatePicker from "react-native-date-picker";
// import { Picker } from "@react-native-picker/picker";

class Suratin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      no_surat: "",
      dari_klien: "",
      tgl_surat: "",
      tgl_terima: "",
      penerima: "",
      deskripsi: "",
      subject_id: "",
      listData: [],
      idEdit: null,
      open: 0,
    };
    this.url = "http://192.168.0.102/api/suratin.php";
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
      this.state.no_surat == "" ||
      this.state.dari_klien == "" ||
      this.state.tgl_surat == "" ||
      this.state.tgl_terima == "" ||
      this.state.penerima == "" ||
      this.state.deskripsi == "" ||
      this.state.subject_id == ""
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
        body:"no_surat="+this.state.no_surat+"&dari_klien="+this.state.dari_klien+"&tgl_surat="+this.state.tgl_surat+"&tgl_terima="+this.state.tgl_terima+"&penerima="+this.state.penerima+"&deskripsi="+this.state.deskripsi+"&subject_id="+this.state.subject_id
      })
        .then((response) => response.json())
        .then((json) => {
          this.setState({ no_surat: "" });
          this.setState({ dari_klien: "" });
          this.setState({ tgl_surat: "" });
          this.setState({ tgl_terima: "" });
          this.setState({ penerima: "" });
          this.setState({ deskripsi: "" });
          this.setState({ subject_id: "" });
          this.ambilListData();
        });
    }
  }
  async klikEdit(id) {
    await fetch(this.url + "/?op=detail&id=" + id)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ no_surat: json.data.result[0].no_surat });
        this.setState({ dari_klien: json.data.result[0].dari_klien });
        this.setState({ tgl_surat: json.data.result[0].tgl_surat });
        this.setState({ tgl_terima: json.data.result[0].tgl_terima });
        this.setState({ penerima: json.data.result[0].penerima });
        this.setState({ deskripsi: json.data.result[0].deskripsi });
        this.setState({ subject_id: json.data.result[0].subject_id });
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
        <View style={style.viewData}>
          {this.state.listData.map((val, index) => (
            <View style={style.viewList} key={index}>
              <Text style={style.textListNama}>{val.dari_klien}</Text>
              <Text
                style={style.textListEdit}
                onPress={() => this.klikEdit(val.id)}>
                Edit
              </Text>
              <Text
                style={style.textListDelete}
                onPress={() => this.klikDelete(val.id)}>
                Delete
              </Text>
            </View>
          ))}
        </View>
        <View style={style.viewForm}>
          <TextInput
            style={style.textInput}
            placeholder="Masukkan No Surat"
            value={this.state.no_surat}
            onChangeText={(text) =>
              this.setState({ no_surat: text })
            }></TextInput>
          <TextInput
            style={style.textInput}
            placeholder="Masukkan Klien"
            value={this.state.dari_klien}
            onChangeText={(text) =>
              this.setState({ dari_klien: text })
            }></TextInput>

          <TextInput
            style={style.textInput}
            placeholder="Masukkan tanggal surat"
            value={this.state.tgl_surat}
            onChangeText={(text) =>
              this.setState({ tgl_surat: text })
            }></TextInput>

          <TextInput
            style={style.textInput}
            placeholder="Masukkan tanggal terima"
            value={this.state.tgl_terima}
            onChangeText={(text) =>
              this.setState({ tgl_terima: text })
            }></TextInput>

          <TextInput
            style={style.textInput}
            placeholder="Masukkan Penerima"
            value={this.state.penerima}
            onChangeText={(text) =>
              this.setState({ penerima: text })
            }></TextInput>
          <TextInput
            style={style.textInput}
            multiline={true}
            numberOfLines={4}
            placeholder="Masukkan Deskripsi"
            value={this.state.deskripsi}
            onChangeText={(text) =>
              this.setState({ deskripsi: text })
            }></TextInput>
          <TextInput
            style={style.textInput}
            placeholder="Masukkan subject_id"
            value={this.state.subject_id}
            onChangeText={(text) =>
              this.setState({ subject_id: text })
            }></TextInput>
          <Button
            title="Masukkan Data"
            onPress={() => this.klikSimpan()}></Button>
        </View>
      </View>
    );
  }
}

export default Suratin;
