import MainContainerView from "@/components/MainContainer";
import { useState } from "react";
import { Button } from "react-native";
import { MD3LightTheme, Text, ThemeProvider } from "react-native-paper";

export default function UploadMembersPage() {
    const [data, setData] = useState<File | null>(null)

    return (
        <ThemeProvider theme={MD3LightTheme}>
            <MainContainerView>
                <Text>Pick File</Text>
                <input
                    type="file"
                    onChange={async function (ev) {
                        if (ev.target.files) {
                            setData(ev.target.files[0]);
                        }
                    }}
                />

                <Button
                    title="UPLOAD"
                    onPress={async function () {
                        let fileREader = new FileReader()
                        fileREader.onload = function () {
                            console.log(fileREader.result);
                        }
                        fileREader.readAsArrayBuffer(data);
                    }}
                />
            </MainContainerView>
        </ThemeProvider>
    )
}