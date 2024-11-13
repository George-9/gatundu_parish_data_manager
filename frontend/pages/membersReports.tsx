import MainContainerView from "@/components/MainContainer";
import CustomPicker from "@/components/Picker";
import { VOLUMES_SOURCE } from "@/data_source/volumes";
import { useEffect, useState } from "react";
import { View } from "react-native";
import * as reactNativePaper from "react-native-paper";
import ResponsiveContainer from "@/components/ResponsiveContainer";
import CustomOutlinedButton from "@/components/Button";
import { useNavigation } from "expo-router";
import { HorizontalSpacer } from "@/components/Spacers";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import * as XLSX from "xlsx";
import printJS from "print-js";

export function MembersReports() {
    const navigator = useNavigation();

    const [loadingVolumes, setLoadingVolumes] = useState(true);
    const [volumes, setVolumes] = useState<{ id: number, vol_name: string }[]>([]);
    const [loadingMembers, setLoadingMembers] = useState(true);
    const [selectedVolumeName, setSelectedVolumeName] = useState('')
    const [members, setMembers] = useState([]);
    const [searchKey, setSearchKey] = useState('');
    const [loadingSearch, setLoadingSearch] = useState(false);

    const [fetchingMembers, setFetchingMmebers] = useState(false);

    const [printingMember, setPrintingMember]: any | null = useState(null);

    // let selectedMembersIds: any[] = [];
    const [isPrintingMembers, setPrintingMembers] = useState(false);

    const [canPerformSearch, setCanPerformSearch] = useState(true);

    useEffect(function () { setTimeout(main, 1800); }, []);

    // function memberIdInSelectionList(member: any) {
    //     return selectedMembersIds.includes(member['_id']);
    // }

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

            setSelectedVolumeName(
                volumes.length > 0
                    ? volumes[0]['vol_name']
                    : ''
            );
            // console.log('selected volume name: ', selectedVolumeName);

            await setVolumeMembers(selectedVolumeName);
        }
    }

    async function fetchMembers(volumeName: string): Promise<{ response: string, data: [] } | any> {
        const volumeDetails = { volume_name: volumeName };

        const response = await fetch(
            'http://localhost:8708/load/members/by/volume',
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
        setFetchingMmebers(true);

        setSelectedVolumeName(selectedVolumeName
            ? selectedVolumeName
            : ((volumes[0]
                ? volumes[0]['vol_name'] : '')))
        await setVolumeMembers(selectedVolumeName);

        setFetchingMmebers(false);
    }

    function onSearchKeyChange(key: string) {
        setSearchKey(key);
    }

    function searchMembersByKey() {
        if (canPerformSearch) {
            setLoadingSearch(true);

            if (!(searchKey.trim())) {
                setMembers(members);
                return;
            }

            setCanPerformSearch(false);

            const timeOutTimer = setTimeout(() => {
                setLoadingSearch(true)
                let filteredMembers = members.filter(function (member) {
                    return (
                        `${member['NAME']}`.toLowerCase().match(searchKey.trim().toLowerCase())
                        || `${member['BAPTISMAL NUMBER']}`.toLowerCase()
                            .match(searchKey.trim().toLowerCase())
                    );
                });

                setMembers(filteredMembers);
                setLoadingSearch(false)

                setCanPerformSearch(true);
                setLoadingSearch(false);
                clearTimeout(timeOutTimer)
            }, 1800);
        }
    }

    return (
        <reactNativePaper.PaperProvider theme={reactNativePaper.MD3LightTheme}>

            <MainContainerView>
                <reactNativePaper.Portal>
                    <reactNativePaper.Dialog
                        visible={printingMember !== null}
                        style={{ maxHeight: 200 }}
                    >
                        <reactNativePaper.Card theme={reactNativePaper.MD3LightTheme}>
                            <reactNativePaper.Card.Actions>
                                {
                                    printingMember
                                        ? <Ionicons
                                            name="print"
                                            size={20}
                                            onPress={function () {
                                                printJS({
                                                    printable: printingMember || {},
                                                    type: 'json',
                                                    properties: Object.keys(printingMember)
                                                });
                                            }}
                                        />
                                        : null
                                }
                                <Ionicons
                                    name="close"
                                    size={30}
                                    onPress={function () {
                                        setPrintingMember(null)
                                    }}
                                />
                            </reactNativePaper.Card.Actions>
                            {
                                printingMember ?
                                    <>
                                        <ScrollView
                                            contentContainerStyle={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                marginVertical: 4,
                                                maxHeight: 600
                                            }}>
                                            {
                                                Object.keys(printingMember).map(function key(key) {
                                                    return key.match('_id')
                                                        ? null
                                                        : (
                                                            <View
                                                                key={key}
                                                                style={{
                                                                    display: 'flex',
                                                                    flexDirection: 'row',
                                                                    justifyContent: 'space-between',
                                                                    width: 250,
                                                                    marginVertical: 4
                                                                }}>

                                                                <reactNativePaper.Text style={{ fontWeight: '800' }}>
                                                                    {key.toUpperCase()}
                                                                </reactNativePaper.Text>

                                                                <reactNativePaper.Text style={{ fontWeight: '400' }}>{printingMember[key]}</reactNativePaper.Text>
                                                            </View>
                                                        )
                                                })
                                            }
                                        </ScrollView>
                                    </>
                                    : <></>
                            }
                        </reactNativePaper.Card>

                    </reactNativePaper.Dialog>
                </reactNativePaper.Portal>

                {
                    loadingVolumes || loadingMembers
                        ? <reactNativePaper.ActivityIndicator />
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

                                    <>
                                        {
                                            fetchingMembers
                                                ? <reactNativePaper.ActivityIndicator />
                                                : <CustomOutlinedButton
                                                    title={'fetch'.toUpperCase()}
                                                    onPress={loadMembers}
                                                />
                                        }
                                    </>

                                    <reactNativePaper.Tooltip title="export to excel">
                                        <MaterialCommunityIcons
                                            name="file-excel-outline"
                                            size={30}
                                            color={'green'}
                                            style={{ margin: 4 }}
                                            onPress={function () {
                                                const workbook = XLSX.utils.book_new();
                                                const worksheet = XLSX.utils.json_to_sheet(members);
                                                XLSX.utils.book_append_sheet(workbook, worksheet, selectedVolumeName);
                                                XLSX.writeFile(workbook, `gatundu_${selectedVolumeName}_members.xlsx`);
                                            }}
                                        />
                                    </reactNativePaper.Tooltip>


                                    <reactNativePaper.Tooltip title="print all members">
                                        {
                                            printingMember
                                                ? <reactNativePaper.ActivityIndicator />
                                                : <MaterialCommunityIcons
                                                    name="printer"
                                                    color={'blue'}
                                                    size={30}
                                                    style={{ margin: 4 }}
                                                    onPress={function () {
                                                        setPrintingMember(true);

                                                        const tmp = members[0] || {};
                                                        delete tmp['_id'];

                                                        const properties = Object.keys(tmp);
                                                        for (let i = 0; i < members.length; i++) {
                                                            const member: any = members[i];

                                                            for (let j = 0; j < properties.length; j++) {
                                                                const property = properties[j];

                                                                if (!member[property]) {
                                                                    member[property] = '_';
                                                                }
                                                            }
                                                        }

                                                        printJS({
                                                            printable: members,
                                                            type: 'json',
                                                            properties: properties,
                                                            style: '* { min-width: 100px; text-align: start; }',
                                                            gridHeaderStyle: 'color: royalblue;  border: 2px solid royalblue; text-align: center;',
                                                            gridStyle: 'border: 1px solid blue;'
                                                        });

                                                        setPrintingMember(false);
                                                    }}
                                                />
                                        }
                                    </reactNativePaper.Tooltip>
                                </ResponsiveContainer>

                                <reactNativePaper.Portal>
                                    {
                                        printingMember
                                            ? null
                                            : <reactNativePaper.Searchbar
                                                placeholder="name or baptismal number"
                                                elevation={2}
                                                loading={loadingSearch}
                                                value={searchKey}
                                                style={{ borderRadius: 1 }}
                                                onChangeText={onSearchKeyChange}
                                                onSubmitEditing={searchMembersByKey}
                                                onClearIconPress={function () {
                                                    setMembers(members);
                                                    setLoadingSearch(false);
                                                }}
                                            />
                                    }
                                </reactNativePaper.Portal>

                                <View>
                                    <reactNativePaper.DataTable>
                                        <reactNativePaper.DataTable.Header>
                                            <reactNativePaper.DataTable.Title>NO</reactNativePaper.DataTable.Title>
                                            <reactNativePaper.DataTable.Title style={{ minWidth: 200 }}>NAME</reactNativePaper.DataTable.Title>
                                            <reactNativePaper.DataTable.Title style={{ minWidth: 200 }}>NUMBER/BAPTISMAL NUMBER</reactNativePaper.DataTable.Title>
                                            <reactNativePaper.DataTable.Title>{' '}</reactNativePaper.DataTable.Title>
                                            <reactNativePaper.DataTable.Title>{' '}</reactNativePaper.DataTable.Title>
                                        </reactNativePaper.DataTable.Header>
                                        {
                                            members.length < 1
                                                ? (
                                                    <reactNativePaper.Text style={{ fontWeight: '900' }}>
                                                        NO MEMBERS
                                                    </reactNativePaper.Text>
                                                )
                                                : <ScrollView style={{ maxHeight: 400 }}>
                                                    {
                                                        members.map(function (member: any, index) {
                                                            return (
                                                                <reactNativePaper.DataTable.Row key={member['_id']}>
                                                                    <reactNativePaper.DataTable.Cell>{index + 1}</reactNativePaper.DataTable.Cell>
                                                                    {/* <reactNativePaper.DataTable.Cell>
                                                                    <Ionicons
                                                                        name={checking
                                                                            ? 'text-sharp'
                                                                            : selectedMembersIds.length > 1
                                                                                ? 'remove-outline'
                                                                                : 'add-outline'}
                                                                        onPress={function () {
                                                                            setChecking(true);

                                                                            if (memberIdInSelectionList(member)) {
                                                                                selectedMembersIds = selectedMembersIds.filter(function (id) {
                                                                                    return id !== member['_id'];
                                                                                });
                                                                            } else {
                                                                                selectedMembersIds.push(member['_id']);
                                                                                console.log('selectedMembersIds::', selectedMembersIds);
                                                                            }
                                                                            setChecking(false);
                                                                        }}
                                                                    />
                                                                </reactNativePaper.DataTable.Cell> */}
                                                                    <reactNativePaper.DataTable.Cell
                                                                        style={{
                                                                            flexGrow: 1,
                                                                            margin: 3,
                                                                            minWidth: 200
                                                                        }}
                                                                    >
                                                                        {member['NAME']}
                                                                    </reactNativePaper.DataTable.Cell>
                                                                    <reactNativePaper.DataTable.Cell
                                                                        style={{ minWidth: 200 }}>{member['BAPTISMAL NUMBER']}
                                                                    </reactNativePaper.DataTable.Cell>

                                                                    <reactNativePaper.DataTable.Cell>
                                                                        <MaterialCommunityIcons
                                                                            name="book-edit-outline"
                                                                            size={20}
                                                                            onPress={async function () {
                                                                                navigator.navigate(
                                                                                    'memberview',
                                                                                    {
                                                                                        'volumename': selectedVolumeName,
                                                                                        'id': member['_id']
                                                                                    }
                                                                                );
                                                                            }}
                                                                        />
                                                                    </reactNativePaper.DataTable.Cell>

                                                                    <reactNativePaper.DataTable.Cell>
                                                                        <Ionicons
                                                                            name="print"
                                                                            size={20}
                                                                            onPress={async function () {
                                                                                setPrintingMember(member);
                                                                            }}
                                                                        />
                                                                    </reactNativePaper.DataTable.Cell>
                                                                </reactNativePaper.DataTable.Row>
                                                            )
                                                        })
                                                    }
                                                </ScrollView>
                                        }
                                    </reactNativePaper.DataTable>
                                </View>
                            </View>
                        )}

            </MainContainerView>
        </reactNativePaper.PaperProvider>
    )
}