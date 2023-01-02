import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    viewWrapper: {
        flex: 1,
    },
    viewForm: {
        flex: 2.5,
        padding: 10,
    },
    viewData: {
        flex: 1,
        marginTop: 30,
    },
    textInput: {
        padding: 10,
        fontSize: 15,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#CCCCCC",
        marginBottom: 10,
        backgroundColor: "#dedede",
    },
    viewList: {
        flexDirection: "row",
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: "#dedede",
    },
    textListNama: {
        flex: 3,
        fontSize: 20,
        fontWeight: "bold",
    },
    textListEdit: {
        color: "blue",
        marginRight: 20,
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
