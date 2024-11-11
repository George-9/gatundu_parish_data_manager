import MainContainerView from "@/components/MainContainer";
import CustomScrollView from "@/components/ScrollView";
import { VOLUMES_SOURCE } from "@/data_source/volumes";
import { useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { ActivityIndicator, DataTable, Text } from "react-native-paper";

export default function VolumesReportPage() {
    const [volumes, setVolumes] = useState<{}[]>([]);
    const [loadingVolumes, setLoadingVolumes] = useState(true);

    useEffect(function () { main(); }, []);

    async function main() {
        setVolumes(await VOLUMES_SOURCE.allVolumes())
        setLoadingVolumes(false);
    }

    return (
        <SafeAreaView>

            <CustomScrollView>

                <MainContainerView>
                    {
                        loadingVolumes
                            ? <ActivityIndicator />
                            : volumes.length > 0
                                ? <View>
                                    < DataTable style={{ minWidth: 400 }}>
                                        <DataTable.Header>
                                            <DataTable.Title>NUMBERING</DataTable.Title>
                                            <DataTable.Title>VOLUME</DataTable.Title>
                                            <DataTable.Title>MEMBER COUNT</DataTable.Title>
                                        </DataTable.Header>
                                        {
                                            volumes.map(function (volume: any, index) {
                                                return (
                                                    <DataTable.Row key={index}>
                                                        <DataTable.Cell>{index + 1}</DataTable.Cell>
                                                        <DataTable.Cell>{`${volume['vol_name']}`.replace('members_', '')}</DataTable.Cell>
                                                        <DataTable.Cell>{`${volume['members_count']}` || 0}</DataTable.Cell>
                                                    </DataTable.Row>
                                                )
                                            })
                                        }
                                    </DataTable>
                                </View>
                                : <Text>NO VOLUMES ADDED YET</Text>
                    }
                </MainContainerView>
            </CustomScrollView>

        </SafeAreaView >
    )
}