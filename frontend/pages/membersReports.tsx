import MainContainerView from "@/components/MainContainer";
import CustomPicker from "@/components/Picker";
import { VOLUMES_SOURCE } from "@/data_source/volumes";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { ActivityIndicator, Card, DataTable, MD3LightTheme, Modal, PaperProvider, Portal, Searchbar, Text, TextInput } from "react-native-paper";
import ResponsiveContainer from "@/components/ResponsiveContainer";
import CustomOutlinedButton from "@/components/Button";
import { useNavigation } from "expo-router";
import CustomScrollView from "@/components/ScrollView";
import { HorizontalSpacer, VerticalSpacer } from "@/components/Spacers";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { SearchBar } from "react-native-screens";

export function MembersReports() {
    const navigator = useNavigation();

    const [volumes, setVolumes] = useState<{ id: number, vol_name: string }[]>([]);
    const [loadingVolumes, setLoadingVolumes] = useState(true);
    const [loadingMembers, setLoadingMembers] = useState(true);
    const [selectedVolumeName, setSelectedVolumeName] = useState('')
    const [members, setMembers] = useState([]);
    const [searchKey, setSearchKey] = useState('');
    const [loadingSearch, setLoadingSearch] = useState(false);

    useEffect(function () { setTimeout(main, 1800); }, []);

    async function main() {
        let volumes = await VOLUMES_SOURCE.allVolumes();
        setTimeout(function () { loadViews(); }, 1200);

        async function loadViews() {

            setVolumes(volumes);
            setLoadingVolumes(false);

            if (volumes.length < 1) {
                let route: any = 'registry';
                return navigator.navigate(route);
            }

            setSelectedVolumeName(volumes.length > 0 ? volumes[0]['vol_name'] : '');
            console.log('selected volume name: ', selectedVolumeName);

            await setVolumeMembers(selectedVolumeName);
        }
    }

    async function fetchMembers(volumeName: string): Promise<{ response: string, data: [] } | any> {
        const volumeDetails = { volume_name: volumeName };

        const response = await fetch(
            'http://localhost:8000/load/members/by/volume',
            {
                'method': 'POST',
                'mode': 'cors',
                'headers': { 'Content-Type': 'application/json' },
                'body': JSON.stringify(volumeDetails),
            }
        );

        return response.json();
    }

    async function setVolumeMembers(volumeName: string) {
        const result = await fetchMembers(volumeName);
        setMembers(result['data'] || []);
        setLoadingMembers(false);
    }

    async function loadMembers() {
        setSelectedVolumeName(selectedVolumeName
            ? selectedVolumeName
            : ((volumes[0]
                ? volumes[0]['vol_name'] : '')))
        await setVolumeMembers(selectedVolumeName);
    }

    function onSearchKeyChange(key: string) {
        setSearchKey(key);

        if (!(searchKey.trim())) {
            setMembers(members);
            return;
        }

        setLoadingSearch(true)
        let filteredMembers = members;
        filteredMembers = filteredMembers.filter(function (member) {
            return (
                `${member['name']}`.toLowerCase().match(searchKey.trim().toLowerCase())
                || `${member['baptismal_number']}`.toLowerCase()
                    .match(searchKey.trim().toLowerCase())
            );
        });
        setMembers(filteredMembers);
        setLoadingSearch(false)
    }

    return (
        <PaperProvider theme={MD3LightTheme}>

            <MainContainerView>
                {
                    loadingVolumes || loadingMembers
                        ? <ActivityIndicator />
                        : (
                            <View>
                                <ResponsiveContainer>
                                    <CustomPicker
                                        style={{ margin: 10 }}
                                        defaultValue={selectedVolumeName}
                                        onChange={function (event: any) {
                                            setMembers([]);
                                            setSelectedVolumeName(event.currentTarget.value);
                                        }}>
                                        {
                                            volumes.map(function (volume, index: number) {
                                                return (
                                                    <option
                                                        key={index}
                                                        label={volume.vol_name.replace('members_', '')}
                                                        value={volume.vol_name}
                                                    />
                                                );
                                            })
                                        }
                                    </CustomPicker>

                                    <HorizontalSpacer />

                                    <CustomOutlinedButton
                                        title={'fetch'}
                                        onPress={loadMembers}
                                    />

                                </ResponsiveContainer>

                                <Portal>
                                    <Searchbar
                                        placeholder="name or baptismal number"
                                        elevation={2}
                                        loading={loadingSearch}
                                        value={searchKey}
                                        style={{ borderRadius: 1 }}
                                        onChangeText={onSearchKeyChange}
                                        onClearIconPress={function () {
                                            setMembers(members);
                                            setLoadingSearch(false);
                                        }}
                                    />
                                </Portal>

                                <Pressable>
                                    <MaterialCommunityIcons name="file-excel-outline" size={50} />
                                </Pressable>

                                <CustomScrollView>
                                    <View style={{ width: 500 }}>
                                        {
                                            members.length < 1
                                                ? (
                                                    <Text style={{ fontWeight: '900' }}>
                                                        NO MEMBERS
                                                    </Text>
                                                )
                                                : members.map(function (member, index) {
                                                    return (
                                                        <Pressable
                                                            key={member['baptismal_number']}
                                                            onPress={async function () {
                                                                navigator.navigate(
                                                                    'MemberViewPage', {
                                                                    'volumename': selectedVolumeName,
                                                                    'id': member['_id']
                                                                }
                                                                );
                                                            }}>
                                                            <DataTable.Row key={member['baptismal_number']}>
                                                                <DataTable.Cell>{index + 1}</DataTable.Cell>
                                                                <DataTable.Cell>{member['name']}</DataTable.Cell>
                                                                <DataTable.Cell>{member['baptismal_number']}</DataTable.Cell>
                                                            </DataTable.Row>
                                                        </Pressable>
                                                    )
                                                })
                                        }
                                    </View>
                                </CustomScrollView>
                            </View>
                        )}
            </MainContainerView>
        </PaperProvider>
    )
}