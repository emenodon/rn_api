import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    viewWrapper: {
        backgroundColor: "#efefef",
        flex: 1,
    },
    viewForm: {
        backgroundColor: "#ffffff",
        bacgroundRadius: 2,
        flex: 0.7,
        padding: 10,
    },
    viewData: {
        flex: 1,
        marginTop: 30,
        padding: 10,
    },
    title: {
        fontSize: 20,
        marginBottom:10,
    },
    textInput: {
        borderRadius: 20,
        marginBottom: 10,
    },
    viewList: {
        flexDirection: "row",
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: "#dcdcdc",
    },
    textListNama: {
        flex: 3,
        fontSize: 20,
        fontWeight: "bold",
    },
    textListEdit: {
        color: "blue",
        marginRight: -15,
    },
    textListDelete: {
        color: "red",
    },
    datePickerStyle: {
        width: 200,
        marginTop: 20,
        flex: 1,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
    },
});
