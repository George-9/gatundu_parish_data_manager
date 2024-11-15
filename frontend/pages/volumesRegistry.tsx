import CustomOutlinedButton from "@/components/Button";
import MainContainerView from "@/components/MainContainer";
import CustomScrollView from "@/components/ScrollView";
import CustomTextInput from "@/components/TextInput";
import { VOLUMES_SOURCE } from "@/data_source/volumes";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, useWindowDimensions, View } from "react-native";
import * as reactNativePaper from "react-native-paper";

export default function VolumesRegistryPage() {
    const [volumeName, setVolumeName] = useState('');

    const [currentMessege, setCurrentMessege] = useState('');
    const [showingMessege, setShowingMessege] = useState(false);

    const [volumes, setVolumes] = useState<{}[]>([]);
    const [loadingVolumes, setLoadingVolumes] = useState(true);

    useEffect(function () {
        main();
    }, []);

    async function main() {
        setVolumes(await VOLUMES_SOURCE.allVolumes())
        setLoadingVolumes(false);
    }


    function onVolumeNameChange(name: string) {
        setVolumeName(name);
        // console.log('vol name: ', volumeName);
    }

    async function onSaveVolume() {
        // console.log(volumeName, volumes);
        const volumeAlreadyExists = volumes.find(function (volume: any) {
            return volume['vol_name'] === volumeName;
        });

        // console.log('already existsing: ', volumeAlreadyExists);
        if (volumeAlreadyExists) {
            setCurrentMessege(`a volume(${volumeName}) by the provided name already exists`);
            setShowingMessege(true);
            return;
        }
        const body = { 'volume_name': volumeName.trim() }

        const result = await fetch(
            'http://64.227.66.13:8708/:8708/create/volume',
            {
                'method': 'POST',
                'body': JSON.stringify(body),
                'headers': { 'Content-Type': 'application/json' },
            }
        )
        const details = await result.json();
        const msg = details['msg'];
        const newVolumeId = details['data'][0];

        setCurrentMessege(msg);
        setShowingMessege(true);

        if (newVolumeId) {
            VOLUMES_SOURCE.addVolume({
                id: newVolumeId,
                vol_name: `members_${volumeName}`,
                members_count: 0
            });

            window.location.reload();
        }
    }

    function hideSnackBar() {
        setCurrentMessege('');
        setShowingMessege(false);
    }

    return (
        <reactNativePaper.PaperProvider theme={reactNativePaper.MD3LightTheme}>
            <SafeAreaView>
                {
                    loadingVolumes
                        ? <reactNativePaper.ActivityIndicator />
                        : <CustomScrollView>
                            <MainContainerView>

                                <View style={{ height: 10 }} />
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <CustomTextInput
                                        label="VOLUME NAME"
                                        value={volumeName}
                                        onChangeText={onVolumeNameChange}
                                        style={{ maxWidth: 400 }}
                                    />

                                    <CustomOutlinedButton
                                        title={"save"}
                                        onPress={onSaveVolume}
                                        style={{ maxWidth: 400 }}
                                    />

                                    <reactNativePaper.Text style={{ fontWeight: '800' }}>hint</reactNativePaper.Text>
                                    <reactNativePaper.Text style={{ fontWeight: '100', lineHeight: 20, marginTop: 3 }}>
                                        IF AUTOMATICALLY TAKEN TO THIS PAGE, THERE EXISTS NO VOLUMES FOR THERE TO BE ANY OPERATIONS,
                                        PLEASE CREATE SOME VOLUMES
                                    </reactNativePaper.Text>
                                    <View style={{ height: 10 }} />
                                    <reactNativePaper.Text>
                                        IT IS PREFFERED THAT YOU CREATE VOLUMES BY YEARS,
                                        FOR EXAMPLE; A VOLUME "1997" or "2020"
                                    </reactNativePaper.Text>
                                </View>

                            </MainContainerView>
                        </CustomScrollView>
                }

                <reactNativePaper.Portal theme={reactNativePaper.MD2LightTheme}>
                    <reactNativePaper.Snackbar
                        style={{ backgroundColor: 'white' }}
                        duration={3200}
                        visible={showingMessege}
                        onDismiss={hideSnackBar}
                        theme={reactNativePaper.MD2LightTheme}
                    >
                        <reactNativePaper.Text>{currentMessege}</reactNativePaper.Text>
                    </reactNativePaper.Snackbar>
                </reactNativePaper.Portal>

            </SafeAreaView>

        </reactNativePaper.PaperProvider>
    )
}