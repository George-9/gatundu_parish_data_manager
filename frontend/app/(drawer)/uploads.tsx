import CustomOutlinedButton from "@/components/Button";
import MainContainerView from "@/components/MainContainer";
import CustomPicker from "@/components/Picker";
import { VOLUMES_SOURCE } from "@/data_source/volumes";
import { CAPITALISED_AND_TRIMMED_OBJECT } from "@/utils/objectValidator";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { View } from "react-native";
import * as reactNativePaper from "react-native-paper";
import { Portal } from "react-native-paper";

import * as XLSX from "xlsx";

export default function UploadMembersPage() {
    const [data, setData] = useState<File | null>(null);
    const [loadingVolumes, setLoadingVolumes] = useState(true);
    const [volumes, setVolumes] = useState<{ id: number, vol_name: string }[]>([]);
    const [selectedVolumeName, setSelectedVolumeName] = useState('');
    const [isUploadingMembers, setUploading] = useState(false);
    const [msg, setMsg] = useState('');
    const [feedMsg, setFeedMsg] = useState('');
    const [displayingUploadResult, setDisplayingUploadResult] = useState(false);

    const duplicateBaptismalNumbers: string[] = [];

    function onSnackbarDismiss() {
        setFeedMsg('');
    }

    function closeUploadResults() {
        setDisplayingUploadResult(false);
        setMsg('');
    }

    useEffect(function () {
        main()
    }, [])

    async function main() {
        let volumes = await VOLUMES_SOURCE.allVolumes();

        setVolumes(volumes);
        setLoadingVolumes(false);

        setSelectedVolumeName(volumes.length > 0 ? volumes[0]['vol_name'] : '');
    }

    if (loadingVolumes || isUploadingMembers) {
        return (
            <View>
                <reactNativePaper.ActivityIndicator />
            </View>
        )
    }
    return (
        <reactNativePaper.PaperProvider theme={reactNativePaper.MD3LightTheme} >
            <MainContainerView>

                <CustomPicker
                    style={{ margin: 10 }}
                    defaultValue={selectedVolumeName}
                    onChange={function (event: any) {
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

                <input
                    type="file"
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    style={{ padding: 5, fontSize: 18, maxWidth: 300 }}
                    onChange={async function (ev) {
                        if (ev.target.files) {
                            setData(ev.target.files[0]);
                        }
                    }}
                />

                <CustomOutlinedButton
                    title="UPLOAD"
                    disabled={isUploadingMembers}
                    onPress={
                        async function () {
                            setUploading(true);

                            if (volumes.length < 1) {
                                setFeedMsg('please create at least one volume and refresh to proceed');
                                setUploading(false);
                                return;
                            }

                            else if (!data || data === null) {
                                setFeedMsg('please select a file to proceed');
                                setUploading(false);
                                return;
                            } else {


                                let fileReader = new FileReader()
                                fileReader.onload = async function () {
                                    const allMembers = [];
                                    const verifiedMembers = [];

                                    const fileData = fileReader.result;
                                    const sheetData = XLSX.read(fileData, { 'type': 'binary' });

                                    const sheetNames = sheetData.SheetNames;
                                    // get members
                                    for (let i = 0; i < sheetNames.length; i++) {
                                        const sheetName = sheetNames[i];
                                        const worksheet = sheetData.Sheets[sheetName];
                                        const jsonArray = XLSX.utils.sheet_to_json(worksheet);

                                        allMembers.push(...jsonArray);
                                    }

                                    const volumeDetails = { volume_name: selectedVolumeName };
                                    const response = await fetch(
                                        'http://localhost:8708/load/members/by/volume',
                                        {
                                            'method': 'POST',
                                            'mode': 'cors',
                                            'headers': { 'Content-Type': 'application/json' },
                                            'body': JSON.stringify(volumeDetails),
                                        }
                                    );

                                    // get existing
                                    const existingMembers: any[] = (await response.json())['data'];

                                    // remove duplicate "BAPTISMAL NUMBER MEMBERS"
                                    for (let l = 0; l < allMembers.length; l++) {
                                        const newMember: any = CAPITALISED_AND_TRIMMED_OBJECT(allMembers[l]);

                                        if (!newMember['BAPTISMAL NUMBER'] || existingMembers.find(function (member) {
                                            return (
                                                `${member['BAPTISMAL NUMBER']}`
                                                    .toUpperCase()
                                                    .trim()
                                                    .toString() === `${newMember['BAPTISMAL NUMBER']}`
                                                        .toUpperCase()
                                                        .trim()
                                                        .toString()
                                            )
                                        })) {
                                            duplicateBaptismalNumbers.push(newMember['BAPTISMAL NUMBER']);
                                        } else {
                                            newMember['ADDED ON'] = (new Date()).toLocaleDateString()
                                            verifiedMembers.push(CAPITALISED_AND_TRIMMED_OBJECT(newMember));
                                        }
                                    }


                                    if (verifiedMembers.length < 1) {
                                        setFeedMsg('uploaded 0 members');
                                        setUploading(false);
                                    } else {


                                        const body = {
                                            volume_name: selectedVolumeName,
                                            members: verifiedMembers
                                        }

                                        const uploadResult = await fetch(
                                            'http://localhost:8708/upload/members',
                                            {
                                                'method': 'POST',
                                                'mode': 'cors',
                                                'headers': { 'Content-Type': 'application/json' },
                                                'body': JSON.stringify(body),
                                            }
                                        );

                                        const result = await uploadResult.json();

                                        setMsg(result['msg']);
                                        setDisplayingUploadResult(true);
                                        setUploading(false);

                                        setData(null);
                                    }
                                }
                                fileReader.readAsArrayBuffer(data);
                            }
                        }
                    }
                />

            </MainContainerView >

            <reactNativePaper.Portal>
                <reactNativePaper.Dialog visible={displayingUploadResult}>
                    <reactNativePaper.Card>
                        <reactNativePaper.Card.Title title={"UPLOAD RESULTS"} />

                        <reactNativePaper.Card.Content>
                            <reactNativePaper.Text style={{ fontWeight: '800', marginVertical: 5 }}>{msg}</reactNativePaper.Text>
                            <reactNativePaper.Divider />
                            <reactNativePaper.Text>DUPLICATES SKIPPED</reactNativePaper.Text>

                            {
                                duplicateBaptismalNumbers.length < 1
                                    ? <reactNativePaper.Text>NONE</reactNativePaper.Text>
                                    : <>
                                        <reactNativePaper.DataTable>
                                            <reactNativePaper.DataTable.Header>
                                                <reactNativePaper.DataTable.Title>NO</reactNativePaper.DataTable.Title>
                                                <reactNativePaper.DataTable.Title>MEMBER NUMBER</reactNativePaper.DataTable.Title>
                                            </reactNativePaper.DataTable.Header>
                                            {
                                                duplicateBaptismalNumbers.map(function (number: string, index: number) {
                                                    return (
                                                        <reactNativePaper.DataTable.Row key={index}>
                                                            <reactNativePaper.DataTable.Cell>{index + 1}</reactNativePaper.DataTable.Cell>
                                                            <reactNativePaper.DataTable.Cell>{number}</reactNativePaper.DataTable.Cell>
                                                        </reactNativePaper.DataTable.Row>
                                                    )
                                                })
                                            }
                                        </reactNativePaper.DataTable>
                                    </>
                            }
                        </reactNativePaper.Card.Content>

                        <reactNativePaper.Tooltip title="close">
                            <reactNativePaper.Card.Actions>
                                <Ionicons
                                    name="close-outline"
                                    size={30}
                                    accessibilityHint="close"
                                    onPress={closeUploadResults} />
                            </reactNativePaper.Card.Actions>
                        </reactNativePaper.Tooltip>

                    </reactNativePaper.Card>
                </reactNativePaper.Dialog>
            </reactNativePaper.Portal>


            <Portal>
                <reactNativePaper.Snackbar
                    visible={msg.length > 0}
                    onDismiss={onSnackbarDismiss}
                    duration={2000}
                >
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center'
                        }}>
                        <reactNativePaper.Text style={{ color: 'white' }}>
                            {feedMsg}
                        </reactNativePaper.Text>
                    </View>
                </reactNativePaper.Snackbar>
            </Portal>

        </reactNativePaper.PaperProvider >
    )
}