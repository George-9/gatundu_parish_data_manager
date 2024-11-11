import CustomOutlinedButton from "@/components/Button";
import MainContainerView from "@/components/MainContainer";
import CustomPicker from "@/components/Picker";
import CustomScrollView from "@/components/ScrollView";
import { HorizontalSpacer } from "@/components/Spacers";
import TextInput from "@/components/TextInput";
import { MemberObject } from "@/pages/memberRegistry";
import { CAPITALISED_AND_TRIMMED_OBJECT } from "@/utils/objectValidator";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, SafeAreaView } from "react-native";
import { ActivityIndicator, Text, MD3DarkTheme, MD3LightTheme, Snackbar, Portal, PaperProvider } from "react-native-paper";
import { SearchBar } from "react-native-screens";

export default function MemberView() {
    const params = useLocalSearchParams();

    const [loadingMember, setloadingMember] = useState<boolean>(true);

    const [currentMessege, setCurrentMessege] = useState('');
    const [showingMessege, setShowingMessege] = useState(false);

    const [memberName, setMemberName] = useState('');
    const [memberBaptismalNumber, setMemberBaptismalNumber] = useState('');
    const [memberDateOfBirth, setMemberDateOfBirth] = useState('');
    const [memberGender, setMemberGender] = useState('');
    const [memberDateOfBaptism, setMemberDateOfBaptism] = useState('');
    const [memberDateOfConfirmation, setMemberDateOfConfirmation] = useState('');
    const [memberFatherName, setMemberFatherName] = useState('');
    const [memberMotherName, setMemberMotherName] = useState('');
    const [memberHomeAddress, setMemberHomeAddress] = useState('');
    const [memberDateFirstCommunion, setMemberDateFirstCommunion] = useState('');
    const [memberGodFather, setMemberGodFather] = useState('');
    const [memberGodMother, setMemberGodMother] = useState('');
    const [memberBaptismalMinister, setMemberBaptismalMinister] = useState('');
    const [memberConfirmationMinister, setMemberConfirmationMinister] = useState('');
    const [memberSpouse, setMemberSpouse] = useState('');
    const [memberDateOfMarriage, setMemberDateOfMarriage] = useState('');
    const [memberObservation, setMemberObservation] = useState('');
    const [memberTribe, setMemberTribe] = useState('');
    const [memberDeathDate, setMemberDeathDate] = useState('');
    const [memberMarriageKind, setMemberMarriageKind] = useState('');


    useEffect(function () { setTimeout(() => { main(); }, 800); }, []);
    async function main() {
        const body = {
            'volume_name': params['volumename'],
            'id': params['id']
        }

        const result = await fetch(
            'http://localhost:8000/get/member/by/baptismal/number',
            {
                'method': 'POST',
                'body': JSON.stringify(body),
                'headers': {
                    'Content-Type': 'application/json'
                }
            }
        );

        const completeMemberDetails = await result.json();
        const memberDetails = completeMemberDetails['data'];

        setloadingMember(false)
        console.log('memberDetails: ', memberDetails);
        delete memberDetails['marriage_kind'];

        setMemberName(memberDetails['name'] || '');
        setMemberBaptismalNumber(memberDetails['baptismal_number'] || '');
        setMemberDateOfBirth(memberDetails['date_of_birth'] || '');
        setMemberGender(memberDetails['gender'] || '');
        setMemberDateOfBaptism(memberDetails['date_of_baptism'] || '');
        setMemberDateOfConfirmation(memberDetails['date_of_confirmation'] || '');
        setMemberFatherName(memberDetails['father'] || '');
        setMemberMotherName(memberDetails['mother'] || '');
        setMemberHomeAddress(memberDetails['home_address'] || '');
        setMemberGodFather(memberDetails['God_Father'] || '');
        setMemberGodMother(memberDetails['God_Mother'] || '');
        setMemberBaptismalMinister(memberDetails['baptismal_minister'] || '');
        setMemberDateFirstCommunion(memberDetails['First_Communion'] || '');
        setMemberSpouse(memberDetails['spouse'] || '');
        setMemberDateOfMarriage(memberDetails['date_of_marriage'] || '');
        setMemberTribe(memberDetails['tribe'] || '');
        setMemberDeathDate(memberDetails['death_date'] || '');
        setMemberObservation(memberDetails['observation'] || '');
        setMemberConfirmationMinister(memberDetails['confirmation_minister'] || '');
    }

    function onNameChange(value: string) {
        console.log(value);

        setMemberName(value);
    }

    function onBaptismalNumberChange(value: string) {
        setMemberBaptismalNumber(value);
    }

    function onDateOfBirthChange(value: string) {
        setMemberDateOfBirth(value);
    }

    function onGenderChange(value: string, index: number) {
        setMemberGender(value);
        console.error('selected index: ', index);
    }

    function onDateOfBaptismChange(value: string) {
        setMemberDateOfBaptism(value);
    }

    function onDateOfConfirmationChange(text: string) {
        setMemberDateOfConfirmation(text);
    }

    function onFatherNameChange(value: string) {
        setMemberFatherName(value);
    }

    function onMotherNameChange(value: string) {
        setMemberMotherName(value);
    }

    function onHomeAddressChange(value: string) {
        setMemberHomeAddress(value);
    }

    function onGodFatherNameChange(value: string) {
        setMemberGodFather(value);
    }

    function onGodMotherNameChange(value: string) {
        setMemberGodMother(value);
    }

    function onBaptismalMinisterChange(value: string) {
        setMemberBaptismalMinister(value);
    }

    function onChangeDateOfFirstCommunion(value: string) {
        setMemberDateFirstCommunion(value);
    }

    function onSpouseNameChange(value: string) {
        setMemberSpouse(value);
    }

    function onDateOfWeddingChange(value: string) {
        setMemberDateOfMarriage(value);
    }

    function onMemberTribeChange(value: string) {
        setMemberTribe(value);
    }

    function onMemberDateOfDeathChange(value: string) {
        setMemberDeathDate(value);
    }

    function onMemberObservsationChange(value: string) {
        setMemberObservation(value);
    }

    function onConfirmationMinisterChange(value: string) {
        setMemberConfirmationMinister(value);
    }

    const memberDetails: MemberObject | any = {
        name: memberName,
        baptismal_number: memberBaptismalNumber,
        gender: memberGender,
        date_of_baptism: memberDateOfBaptism,
        date_of_birth: memberDateOfBirth,
        father: memberFatherName,
        mother: memberMotherName,
        date_of_confirmation: memberDateOfConfirmation,
        home_address: memberHomeAddress,
        Fisrt_Communion_Date: memberDateFirstCommunion,
        God_Father: memberGodFather,
        God_Mother: memberGodMother,
        baptismal_minister: memberBaptismalMinister,
        confirmation_minister: memberConfirmationMinister,
        spouse: memberSpouse,
        marriage_kind: memberMarriageKind,
        date_of_marriage: memberDateOfMarriage,
        member_observation: memberObservation,
        tribe: memberTribe,
        death_date: memberDeathDate
    }

    async function onUpdateMemberDetails() {
        console.table(memberDetails);
        try {
            //         function isValid(value: string) {
            //             return value && `${value}`.trim() && `${value}`.trim().length >= 3
            //         }

            //         function isValidDate(value: string) {
            //             const theDateString = `${value}`.trim();
            //             if (!theDateString) {
            //                 return true;
            //             }

            //             const date = new Date(theDateString).toDateString();

            //             console.log('verifying: ', value, date);
            //             return (theDateString.trim().length > 4) && (date !== 'Invalid Date');
            //         }

            //         function warnInvalidDate(dateName: string) {
            //             console.log('date name: ', dateName);

            //             setCurrentMessege(`invalid date ${dateName}`);
            //             setShowingMessege(true);
            //             return;
            //         }

            //         const keys = Object.keys(memberDetails);
            //         if (!memberDetails['Fisrt_Communion_Date']) {
            //             memberDetails['Fisrt_Communion_Date'] = '1010/01/01';
            //         }

            //         for (let i = 0; i < keys.length; i++) {
            //             const key = keys[i];
            //             if (
            //                 key === 'name'
            //                 ||
            //                 key === 'date_of_baptism'
            //                 ||
            //                 key === 'home_address'
            //                 ||
            //                 key === 'baptismal_number'
            //                 ||
            //                 key === 'date_of_birth'
            //             ) {
            //                 let field: string = memberDetails[key];
            //                 if (!isValid(field)) {
            //                     setCurrentMessege(`error: invalid field ${key.split('_').join(' ')}`);
            //                     setShowingMessege(true);
            //                     return;
            //                 }
            //             }
            //         }

            //         if (!isValidDate(memberDetails.date_of_birth)) {
            //             warnInvalidDate('date of birth');
            //             return;
            //         }

            //         if (!isValidDate(memberDetails.date_of_baptism)) {
            //             warnInvalidDate('date of baptism');
            //             return;
            //         }

            //         if (!isValidDate(memberDetails.date_of_marriage)) {
            //             warnInvalidDate('date of marriage');
            //             return;
            //         }

            //         if (!isValidDate(memberDetails.Fisrt_Communion_Date)) {
            //             warnInvalidDate('date of First Communion');
            //             return;
            //         }

            //         if (!isValidDate(memberDetails.death_date)) {
            //             warnInvalidDate('date of death');
            //             return;
            //         }

            //         const k = Object.keys(memberDetails);

            //         for (let i = 0; i < k.length; i++) {
            //             const key: string = k[i];

            //             if (memberDetails[key]) {
            //                 console.log('key -: ', key);

            //                 if (key.toLowerCase().split('_').includes('date')) {
            //                     const theDate = memberDetails[key];
            //                     console.log('converting date: ', theDate);

            //                     // convert date to MYSQL compatible format
            //                     const fixedSQLFormatDate = new Date(theDate)
            //                 .toISOString()
            //                 .split('T')[0];
            //             console.log('fixedSQLFormatDate', fixedSQLFormatDate);

            //             memberDetails[key] = fixedSQLFormatDate.includes('undefined')
            //                 ? '1010/01/01'
            //                 : fixedSQLFormatDate
            //                     .trim()
            //                     .toLowerCase();

            //             if (!memberDetails[key]) {
            //                 memberDetails[key] = '1010/01/01';
            //             }
            //             console.log('key:: ', key);

            //         }
            //     }
            // }

            memberDetails['id'] = params['id'];
            console.table(CAPITALISED_AND_TRIMMED_OBJECT(memberDetails));
            const result = await fetch(
                'http://localhost:8000/update/member',
                {
                    'method': 'POST',
                    'mode': 'cors',
                    'headers': {
                        'Content-Type': 'application/json',
                    },
                    'body': JSON.stringify({
                        volume_name: params['volumename'],
                        member: memberDetails,
                    }),
                });

            const response = await result.json();
            const msg = response['msg'];
            setCurrentMessege(msg);
            setShowingMessege(true);

            console.log('messege: ', msg);
        } catch (error) {
            setCurrentMessege(`${error}`);
            setShowingMessege(true);
        }
    }

    return (
        <PaperProvider> {
            loadingMember
                ? <ActivityIndicator />
                : memberDetails
                    ? (
                        <SafeAreaView>
                            <Portal>
                                <Snackbar
                                    visible={showingMessege}
                                    duration={2000}
                                    theme={MD3DarkTheme}
                                    icon={'information'}
                                    onDismiss={function () { setShowingMessege(false); }}
                                >
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ color: 'black' }}>{currentMessege}</Text>
                                    </View>
                                </Snackbar>
                            </Portal>
                            {
                                !memberDetails
                                    ? <ActivityIndicator />
                                    : <CustomScrollView>

                                        <MainContainerView>

                                            <>
                                                <TextInput
                                                    label="name"
                                                    value={memberDetails.name}
                                                    onChangeText={onNameChange}
                                                />
                                            </>

                                            <>
                                                <TextInput
                                                    label="baptismal number"
                                                    value={memberDetails.baptismal_number}
                                                    onChangeText={onBaptismalNumberChange}
                                                />

                                                <TextInput
                                                    label="date of birth"
                                                    value={memberDetails.date_of_birth}
                                                    onChangeText={onDateOfBirthChange}
                                                />
                                            </>

                                            <>
                                                <View>
                                                    <Text>GENDER</Text>
                                                    <CustomPicker
                                                        defaultValue={'M'}
                                                        onChange={function (event: any) {
                                                            setMemberGender(event.target.value);
                                                        }}>
                                                        <option>M</option>
                                                        <option>F</option>
                                                    </CustomPicker>
                                                </View>

                                                <HorizontalSpacer />

                                                <View>
                                                    <Text>MARRIAGE KIND</Text>

                                                    <CustomPicker
                                                        defaultValue={'SPOUSE'}
                                                        onChange={function (event: any) {
                                                            setMemberMarriageKind(event.target.value);
                                                        }}>
                                                        <option>SPOUSE</option>
                                                        <option>PRIESTHOOD</option>
                                                    </CustomPicker>
                                                </View>
                                            </>

                                            <>
                                                <TextInput
                                                    label="date of baptism"
                                                    value={memberDetails.date_of_baptism}
                                                    onChangeText={onDateOfBaptismChange}
                                                />

                                                <TextInput
                                                    label="date of confirmation"
                                                    value={memberDetails.date_of_confirmation}
                                                    onChangeText={onDateOfConfirmationChange}
                                                />
                                            </>

                                            <>
                                                <TextInput
                                                    label="father"
                                                    value={memberDetails.father}
                                                    onChangeText={onFatherNameChange}
                                                />

                                                <TextInput
                                                    label="mother"
                                                    value={memberDetails.mother}
                                                    onChangeText={onMotherNameChange}
                                                />
                                            </>

                                            <>
                                                <TextInput
                                                    label="home address/parent home address"
                                                    value={memberDetails.home_address}
                                                    onChangeText={onHomeAddressChange}
                                                />

                                                <TextInput
                                                    label="tribe"
                                                    value={memberDetails.tribe}
                                                    onChangeText={onMemberTribeChange}
                                                />
                                            </>

                                            <>
                                                <TextInput
                                                    label="Baptismal Minister"
                                                    value={memberDetails.baptismal_minister}
                                                    onChangeText={onBaptismalMinisterChange}
                                                />
                                                <TextInput
                                                    label="Confirmation Minister"
                                                    value={memberDetails.confirmation_minister}
                                                    onChangeText={onConfirmationMinisterChange}
                                                />
                                            </>

                                            <>
                                                <TextInput
                                                    label="God Father"
                                                    onChangeText={onGodFatherNameChange}
                                                    value={memberDetails.God_Father}
                                                />

                                                <TextInput
                                                    label="God Mother"
                                                    value={memberDetails.God_Mother}
                                                    onChangeText={onGodMotherNameChange}
                                                />
                                            </>

                                            <>
                                                <TextInput
                                                    label="spouse"
                                                    onChangeText={onSpouseNameChange}
                                                    value={memberDetails.spouse}
                                                />
                                                <TextInput
                                                    label="date of marriage/wedding"
                                                    value={memberDetails.date_of_marriage}
                                                    onChangeText={onDateOfWeddingChange}
                                                />
                                            </>

                                            <>
                                                <TextInput
                                                    label="observation"
                                                    value={memberDetails.member_observation}
                                                    onChangeText={onMemberObservsationChange}
                                                />
                                                <TextInput
                                                    label="Date of First Communion"
                                                    value={memberDetails.Fisrt_Communion_Date}
                                                    onChangeText={onChangeDateOfFirstCommunion}
                                                />
                                            </>

                                            <>
                                                <TextInput
                                                    label="death date"
                                                    value={memberDetails.death_date}
                                                    onChangeText={onMemberDateOfDeathChange}
                                                />

                                                <HorizontalSpacer width={20} />
                                            </>

                                        </MainContainerView>


                                    </CustomScrollView>
                            }

                            <View style={{ display: 'flex', flexDirection: 'row', 'justifyContent': 'center' }}>
                                <CustomOutlinedButton
                                    mode="contained-tonal"
                                    theme={MD3LightTheme}
                                    title={"SAVE CHANGES"}
                                    onPress={onUpdateMemberDetails}
                                />
                            </View>

                        </SafeAreaView>
                    ) : <></>}
        </PaperProvider>
    )
}
