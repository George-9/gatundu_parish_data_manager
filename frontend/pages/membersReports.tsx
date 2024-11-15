import MainContainerView from "@/components/MainContainer";
import CustomPicker from "@/components/Picker";
import { VOLUMES_SOURCE } from "@/data_source/volumes";
import { useEffect, useState } from "react";
import { useWindowDimensions, View } from "react-native";
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

    const deviceSize = useWindowDimensions();

    const [msg, setMsg] = useState('');

    function onDismiss() {
        setMsg('');
    }

    function getExportProperties() {
        if (members.length < 1) {
            return [];
        }
        const neededProps = Object.keys(members[0]).filter(function (prop: string) {
            return !(prop.toLocaleLowerCase().match('_id'))
        });

        return neededProps;
    }

    const [fetchingMembers, setFetchingMmebers] = useState(false);
    const [printingMember, setPrintingMember]: any | null = useState(null);

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
            'http://64.227.66.13:8708/load/members/by/volume',
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
        navigator.navigate('searchresultview', { 'search_key': searchKey })
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
                                                const div = document.createElement('div');
                                                div.style.width = '100%';
                                                div.style.display = 'flex';
                                                div.style.justifyContent = 'center';
                                                div.style.alignItems = 'center';
                                                div.style.alignContent = 'center';

                                                const keys = Object.keys(printingMember);

                                                let str = '';

                                                for (let i = 0; i < keys.length; i++) {
                                                    const key = keys[i];
                                                    if (key.match('_id')) {
                                                        continue;
                                                    }
                                                    str += `<p style={min-width: 200px; font-weight: 700;}><span style={min-width: 100px; font-weight: 700;}>${key}</span>: <span>${printingMember[key]}</span></p>`
                                                }

                                                div.innerHTML = str;
                                                // printJS({
                                                //     printable: div,
                                                //     type: 'html',
                                                //     properties: getExportProperties(),
                                                //     style: 'div { text-align: center; } p { text-align: start; }',
                                                //     header: printingMember['NAME']
                                                // });
                                            }}
                                        />
                                        : null
                                }
                                <Ionicons
                                    name="close"
                                    size={30}
                                    onPress={function () {
                                        setPrintingMember(null);
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
                                                                }}
                                                            >

                                                                <reactNativePaper.Text style={{ fontWeight: '800' }}>
                                                                    {key.toUpperCase()}
                                                                </reactNativePaper.Text>

                                                                <reactNativePaper.Text style={{ fontWeight: '400' }}>
                                                                    {printingMember[key]}
                                                                </reactNativePaper.Text>
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

                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                                        <reactNativePaper.Tooltip title="export to excel">
                                            <MaterialCommunityIcons
                                                name="file-excel-outline"
                                                size={30}
                                                color={'green'}
                                                style={{ margin: 4 }}
                                                onPress={function () {
                                                    if (members.length < 1) {
                                                        setMsg('LOAD SOME MEMBERS BEFORE EXPORTING');
                                                        return;
                                                    }

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
                                                            const tmp = members[0] || {};
                                                            delete tmp['_id'];

                                                            const properties = Object.keys(tmp);
                                                            properties.filter(function (prop: string) {
                                                                return prop !== '_id';
                                                            });

                                                            for (let i = 0; i < members.length; i++) {
                                                                const member: any = members[i];

                                                                for (let j = 0; j < properties.length; j++) {
                                                                    const property = properties[j];

                                                                    if (!member[property]) {
                                                                        member[property] = '_';
                                                                    }
                                                                }
                                                            }

                                                            if (members.length < 1) {
                                                                setMsg('LOAD SOME MEMBERS BEFORE PRINTING')
                                                                return;
                                                            }

                                                            // printJS({
                                                            //     printable: members,
                                                            //     type: 'json',
                                                            //     properties: properties,
                                                            //     style: '* { min-width: 100px; text-align: start; }',
                                                            //     gridHeaderStyle: 'color: royalblue;  border: 2px solid royalblue; text-align: center;',
                                                            //     gridStyle: 'border: 1px solid blue;'
                                                            // });
                                                        }}
                                                    />
                                            }
                                        </reactNativePaper.Tooltip>
                                    </View>

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
                                            />
                                    }
                                </reactNativePaper.Portal>

                                <ScrollView horizontal={true} style={{ maxWidth: deviceSize.width, maxHeight: 700 }}>
                                    <View>
                                        <reactNativePaper.DataTable>
                                            <reactNativePaper.DataTable.Header>
                                                <reactNativePaper.DataTable.Title>NO</reactNativePaper.DataTable.Title>
                                                <reactNativePaper.DataTable.Title style={{ minWidth: 180 }}>NAME</reactNativePaper.DataTable.Title>
                                                <reactNativePaper.DataTable.Title style={{ minWidth: 80 }}>MEMBER NUMBER</reactNativePaper.DataTable.Title>
                                                <reactNativePaper.DataTable.Title>{' '}</reactNativePaper.DataTable.Title>
                                                <reactNativePaper.DataTable.Title style={{ minWidth: 80 }}>EDIT</reactNativePaper.DataTable.Title>
                                            </reactNativePaper.DataTable.Header>
                                            {
                                                members.length < 1
                                                    ? (
                                                        <reactNativePaper.Text style={{ fontWeight: '900' }}>
                                                            NO MEMBERS
                                                        </reactNativePaper.Text>
                                                    )
                                                    : <ScrollView style={{ maxHeight: 700, paddingBottom: 400 }}>
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
                                                                                minWidth: 300
                                                                            }}
                                                                        >
                                                                            {member['NAME']}
                                                                        </reactNativePaper.DataTable.Cell>
                                                                        <reactNativePaper.DataTable.Cell
                                                                            style={{ minWidth: 100 }}>{member['BAPTISMAL NUMBER']}
                                                                        </reactNativePaper.DataTable.Cell>

                                                                        <reactNativePaper.DataTable.Cell
                                                                            style={{
                                                                                minWidth: 150
                                                                            }}
                                                                        >
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
                                                                    </reactNativePaper.DataTable.Row>
                                                                )
                                                            })
                                                        }
                                                    </ScrollView>
                                            }
                                        </reactNativePaper.DataTable>
                                    </View>
                                </ScrollView>
                            </View>
                        )}

            </MainContainerView>

            <reactNativePaper.Portal>
                <reactNativePaper.Snackbar
                    visible={msg.length > 0}
                    onDismiss={onDismiss}
                    duration={2200}>
                    {msg}
                </reactNativePaper.Snackbar>
            </reactNativePaper.Portal>
        </reactNativePaper.PaperProvider>
    )
}