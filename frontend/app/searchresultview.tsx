import MainContainerView from "@/components/MainContainer";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { useGlobalSearchParams, useNavigation } from "expo-router";
import printJS from "print-js";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import * as reactNativePaper from "react-native-paper";

export default function MembersSearchResultView() {
    const params = useGlobalSearchParams();
    const navigator = useNavigation();

    const [loadingMmebers, setLoadingMembers] = useState(true);
    const [members, setMembers] = useState([]);

    const [printingMember, setPrintingMember]: any | null = useState(null);

    useEffect(function () {
        fetchMembers();
    }, []);

    async function fetchMembers() {
        const body = { search_key: `${params['search_key']}`.trim().toUpperCase() };

        const response = await fetch(
            'http://64.227.66.13:8708/search/members/from/all/volumes',
            {
                'method': 'POST',
                'mode': 'cors',
                'headers': { 'Content-Type': 'application/json' },
                'body': JSON.stringify(body),
            }
        );

        const result = await response.json();
        if (`${result['msg']}`.toLowerCase().match('bad') || `${result['msg']}`.toLowerCase().match('error')) {
            navigator.goBack();
        }

        const members = result['data'];
        setMembers(members);

        setLoadingMembers(false);
    }

    return (
        <reactNativePaper.PaperProvider>
            <ScrollView
                contentContainerStyle={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginVertical: 4,
                }}>
                <MainContainerView>
                    {
                        printingMember ?
                            <>
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
                                                        {
                                                            printingMember[key]
                                                                ? key.toUpperCase().match('DATE')
                                                                    ? new Date(`${parseInt(printingMember[key])}`.length === `${printingMember[key]}`.length ? parseInt(printingMember[key]) : printingMember[key]).toLocaleDateString()
                                                                    : printingMember[key]
                                                                :
                                                                ''
                                                        }
                                                    </reactNativePaper.Text>
                                                </View>
                                            )
                                    })
                                }
                            </>
                            : <></>
                    }

                    <View style={{ flex: 1 }}>
                        {
                            loadingMmebers
                                ? <reactNativePaper.ActivityIndicator />
                                : (
                                    <View>
                                        <reactNativePaper.DataTable>
                                            <reactNativePaper.DataTable.Header>
                                                <reactNativePaper.DataTable.Title>NO</reactNativePaper.DataTable.Title>
                                                <reactNativePaper.DataTable.Title style={{ minWidth: 200 }}>NAME</reactNativePaper.DataTable.Title>
                                                <reactNativePaper.DataTable.Title style={{ minWidth: 100 }}>FROM VOLUME</reactNativePaper.DataTable.Title>
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
                                                    : <>
                                                        {
                                                            members.map(function (member: any, index) {
                                                                return (
                                                                    <reactNativePaper.DataTable.Row key={member['_id']}>
                                                                        <reactNativePaper.DataTable.Cell>{index + 1}</reactNativePaper.DataTable.Cell>
                                                                        {
                                                                            /* <reactNativePaper.DataTable.Cell>
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
                                                                            </reactNativePaper.DataTable.Cell> */
                                                                        }
                                                                        <reactNativePaper.DataTable.Cell
                                                                            style={{
                                                                                flexGrow: 1,
                                                                                margin: 3,
                                                                                minWidth: 200
                                                                            }}
                                                                        >
                                                                            {member['NAME']}
                                                                        </reactNativePaper.DataTable.Cell>

                                                                        {/* owner volume */}
                                                                        <reactNativePaper.DataTable.Cell
                                                                            style={{ minWidth: 100 }}>{member['vol']}
                                                                        </reactNativePaper.DataTable.Cell>

                                                                        <reactNativePaper.DataTable.Cell
                                                                            style={{ minWidth: 100 }}>{member['BAPTISMAL NUMBER']}
                                                                        </reactNativePaper.DataTable.Cell>

                                                                        <reactNativePaper.DataTable.Cell>
                                                                            <MaterialCommunityIcons
                                                                                name="book-edit-outline"
                                                                                size={20}
                                                                                onPress={async function () {
                                                                                    navigator.navigate(
                                                                                        'memberview',
                                                                                        {
                                                                                            'volumename': member['vol'],
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
                                                    </>
                                            }
                                        </reactNativePaper.DataTable>
                                    </View>
                                )
                        }


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
                                                        //     style: 'div { flex: 1; justify-content: center; align-items: center; align-content: center; } p { text-align: start; }',
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
                                </reactNativePaper.Card>

                            </reactNativePaper.Dialog>
                        </reactNativePaper.Portal>
                    </View>
                </MainContainerView>
            </ScrollView >
        </reactNativePaper.PaperProvider>
    )
}

// if (canPerformSearch) {
//     setLoadingSearch(true);

//     if (!(searchKey.trim())) {
//         setMembers(members);
//         return;
//     }

//     setCanPerformSearch(false);

//     const timeOutTimer = setTimeout(() => {
//         setLoadingSearch(true)
//         let filteredMembers = members.filter(function (member) {
//             return (
//                 `${member['NAME']}`.toLowerCase().match(searchKey.trim().toLowerCase())
//                 || `${member['BAPTISMAL NUMBER']}`.toLowerCase()
//                     .match(searchKey.trim().toLowerCase())
//             );
//         });

//         setMembers(filteredMembers);
//         setLoadingSearch(false)

//         setCanPerformSearch(true);
//         setLoadingSearch(false);
//         clearTimeout(timeOutTimer);
//     }, 1800);
// }