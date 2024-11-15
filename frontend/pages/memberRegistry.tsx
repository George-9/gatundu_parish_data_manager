import { SafeAreaView, View } from "react-native";
import MainContainerView from "@/components/MainContainer";
import CustomTextInput from "@/components/TextInput";
import CustomScrollView from "@/components/ScrollView";
import ResponsiveContainer from "@/components/ResponsiveContainer";
import { useEffect, useState } from "react";
import { ActivityIndicator, MD3DarkTheme, MD3LightTheme, Snackbar, Text } from "react-native-paper";
import CustomOutlinedButton from "@/components/Button";
import { CAPITALISED_AND_TRIMMED_OBJECT } from "@/utils/objectValidator";
import CustomPicker from "@/components/Picker";
import { VOLUMES_SOURCE } from "@/data_source/volumes";
import VolumesRegistryPage from "./volumesRegistry";
import { HorizontalSpacer } from "@/components/Spacers";

// export interface MemberObject {
//     NAME: string,
//     "BAPTISMAL NUMBER": string,
//     GENDER: string,
//     "DATE OF BAPTISM": string,
//     "DATE OF BIRTH": string,
//     "FATHER": string,
//     "MOTHER": string,
//     "CONFIRMATION": string,
//     "HOME ADDRESS": string,
//     "FIRST COMMUNION": string,
//     "GOD FATHER": memberGodFather,
//     "GOD MOTHER": memberGodMother,
//     "BAPTISMAL MINISTER": memberBaptismalMinister,
//     "CONFIRMATION MINISTER": memberConfirmationMinister,
//     "SPOUSE": memberSpouse,
//     "MARRIAGE": memberMarriageKind,
//     "DATE OF MARRIAGE": memberDateOfMarriage,
//     "NOTE": memberObservation,
//     "TRIBE": memberTribe,
//     "DEATH": memberDeathDate
// }

export default function MembersRegistry() {
    const [volumes, setVolumes] = useState<{ id: number, vol_name: string }[]>([]);
    const [loadingVolumes, setLoadingVolumes] = useState(true);
    const [selectedVolumeName, setSelecteVolumeName] = useState('')

    useEffect(function () { main(); }, []);

    async function main() {
        setVolumes(await VOLUMES_SOURCE.allVolumes())
        setLoadingVolumes(false);
        setSelecteVolumeName(volumes.length > 0 ? volumes[0]['vol_name'] : '');
    }

    const [currentMessege, setCurrentMessege] = useState('');
    const [showingMessege, setShowingMessege] = useState(false);

    // const [memberName, setMemberName] = useState('JOHN DOE');
    // const [memberBaptismalNumber, setMemberBaptismalNumber] = useState('1210-KJ');
    // const [memberDateOfBirth, setMemberDateOfBirth] = useState('12/MAR/1999');
    // const [memberGender, setMemberGender] = useState('M');
    // const [memberDateOfBaptism, setMemberDateOfBaptism] = useState('1/MAY/2000');
    // const [memberDateOfConfirmation, setMemberDateOfConfirmation] = useState('13/JUN/2010');
    // const [memberFatherName, setMemberFatherName] = useState('JERRY NJENGA');
    // const [memberMotherName, setMemberMotherName] = useState('LOISE MUTHAGA');
    // const [memberHomeAddress, setMemberHomeAddress] = useState('GATURA');
    // const [memberDateFirstCommunion, setMemberDateFirstCommunion] = useState('12/MAR/1999');
    // const [memberGodFather, setMemberGodFather] = useState('MR. JAMES K');
    // const [memberGodMother, setMemberGodMother] = useState('MRS. LUCY KENDA');
    // const [memberBaptismalMinister, setMemberBaptismalMinister] = useState('FR. PETER');
    // const [memberConfirmationMinister, setMemberConfirmationMinister] = useState('FR. THOMAS');
    // const [memberSpouse, setMemberSpouse] = useState('LOISE NJERI');
    // const [memberDateOfMarriage, setMemberDateOfMarriage] = useState('20/NOV/2024');
    // const [memberObservation, setMemberObservation] = useState('LIT');
    // const [memberTribe, setMemberTribe] = useState('GIKUYU');
    // const [memberDeathDate, setMemberDeathDate] = useState('12/FEB/2099');
    // const [memberMarriageKind, setMemberMarriageKind] = useState('SPOUSE');

    const [memberName, setMemberName] = useState('');
    const [memberBaptismalNumber, setMemberBaptismalNumber] = useState('');
    const [memberDateOfBirth, setMemberDateOfBirth] = useState('');
    const [memberGender, setMemberGender] = useState('M');
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

    const memberDetails: any = {
        NAME: memberName,
        "BAPTISMAL NUMBER": memberBaptismalNumber,
        GENDER: memberGender,
        "DATE OF BAPTISM": memberDateOfBaptism,
        "DATE OF BIRTH": memberDateOfBirth,
        "FATHER": memberFatherName,
        "MOTHER": memberMotherName,
        "CONFIRMATION": memberDateOfConfirmation,
        "HOME ADDRESS": memberHomeAddress,
        "FIRST COMMUNION": memberDateFirstCommunion,
        "GOD FATHER": memberGodFather,
        "GOD MOTHER": memberGodMother,
        "BAPTISMAL MINISTER": memberBaptismalMinister,
        "CONFIRMATION MINISTER": memberConfirmationMinister,
        "SPOUSE": memberSpouse,
        "MARRIAGE": memberMarriageKind,
        "DATE OF MARRIAGE": memberDateOfMarriage,
        "NOTE": memberObservation,
        "TRIBE": memberTribe,
        "DEATH": memberDeathDate
    }


    function clearTextInputsValues() {
        setMemberName('');
        setMemberBaptismalNumber('');
        setMemberDateOfBirth('');
        setMemberGender('');
        setMemberDateOfBaptism('');
        setMemberDateOfConfirmation('');
        setMemberFatherName('');
        setMemberMotherName('');
        setMemberHomeAddress('');
        setMemberDateFirstCommunion('');
        setMemberGodFather('');
        setMemberGodMother('');
        setMemberBaptismalMinister('');
        setMemberConfirmationMinister('');
        setMemberSpouse('');
        setMemberDateOfMarriage('');
        setMemberObservation('');
        setMemberTribe('');
        setMemberDeathDate('');
    }

    async function onRegisterMember() {
        try {
            // function isValid(value: string) {
            //     return value && `${value}`.trim() && `${value}`.trim().length >= 3
            // }

            // function isValidDate(value: string) {
            //     const theDateString = `${value}`.trim();
            //     if (!theDateString) {
            //         return true;
            //     }

            //     const date = new Date(theDateString).toDateString();

            //     console.log('verifying: ', value, date);
            //     return (theDateString.trim().length > 4) && (date !== 'Invalid Date');
            // }

            // function warnInvalidDate(dateName: string) {
            //     console.log('date name: ', dateName);

            //     setCurrentMessege(`invalid date ${dateName}`);
            //     setShowingMessege(true);
            //     return;
            // }

            // const keys = Object.keys(memberDetails);

            // for (let i = 0; i < keys.length; i++) {
            //     const key = keys[i];
            //     if (
            //         key === 'name'
            //         ||
            //         key === 'date_of_baptism'
            //         ||
            //         key === 'home_address'
            //         ||
            //         key === 'baptismal_number'
            //         ||
            //         key === 'date_of_birth'
            //     ) {
            //         let field: string = memberDetails[key];
            //         if (!isValid(field)) {
            //             setCurrentMessege(`error: invalid field ${key.split('_').join(' ')}`);
            //             setShowingMessege(true);
            //             return;
            //         }
            //     }
            // }

            // if (!isValidDate(memberDetails.date_of_birth)) {
            //     warnInvalidDate('date of birth');
            //     return;
            // }

            // if (!isValidDate(memberDetails.date_of_baptism)) {
            //     warnInvalidDate('date of baptism');
            //     return;
            // }

            // if (!isValidDate(memberDetails.date_of_marriage)) {
            //     warnInvalidDate('date of marriage');
            //     return;
            // }

            // if (!isValidDate(memberDetails.Fisrt_Communion_Date)) {
            //     warnInvalidDate('date of First Communion');
            //     return;
            // }

            // if (!isValidDate(memberDetails.death_date)) {
            //     warnInvalidDate('date of death');
            //     return;
            // }

            // const k = Object.keys(memberDetails);

            // for (let i = 0; i < k.length; i++) {
            //     const key: string = k[i];

            //     if (memberDetails[key]) {
            //         console.log('key -: ', key);

            //         if (key.toLowerCase().split('_').includes('date')) {
            //             const theDate = memberDetails[key];
            //             console.log('converting date: ', theDate);

            //             // convert date to MYSQL compatible format
            //             const fixedSQLFormatDate = new Date(theDate)
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

            // if (!memberDetails['Fisrt_Communion_Date']) {
            //     memberDetails['Fisrt_Communion_Date'] = '1010/01/01';
            // }

            if (memberDetails['GOD FATHER'] && memberDetails['GOD MOTHER']) {
                memberDetails['GOD PARENTS'] = (
                    (memberDetails['GOD FATHER'] || '')
                    + ' . '
                    + (memberDetails['GOD MOTHER'] || '')
                )
            } else if (memberDetails['GOD FATHER'] && !memberDetails['GOD MOTHER']) {
                memberDetails['GOD PARENTS'] = (
                    (memberDetails['GOD FATHER'])
                )
            } else {
                memberDetails['GOD PARENTS'] = (
                    + (memberDetails['GOD MOTHER'] || '')
                )
            }

            delete memberDetails['GOD FATHER'];
            delete memberDetails['GOD MOTHER'];

            const result = await fetch(
                'http://64.227.66.13:8708/:8708/register/member',
                {
                    'method': 'POST',
                    'mode': 'cors',
                    'headers': {
                        'Content-Type': 'application/json',
                    },
                    'body': JSON.stringify({
                        volume_name: (volumes.length < 2 || !`${selectedVolumeName}`.trim())
                            ? volumes[0]['vol_name']
                            : selectedVolumeName,
                        member: CAPITALISED_AND_TRIMMED_OBJECT(memberDetails),
                    }),
                });

            const response = await result.json();
            const msg = response['msg'];
            setCurrentMessege(msg);
            setShowingMessege(true);

            console.log('messege: ', msg);

            if (`${msg}`.toLowerCase().match('success')) {
                clearTextInputsValues();
            }

            // console.warn(
            //     'invalid details provided,'
            //     + ' member: name,'
            //     + ' home address'
            //     + ' baptismal minister'
            //     + ' baptismal number'
            //     + ' date of birth'
            //     + ' date of baptism'
            //     + ' date of confirmation'
            //     + ' cannot be shorter than 4 letters'
            // );


            // if (
            //     isValid(memberDetails.name)
            //     &&
            //     isValid(memberDetails.date_of_baptism)
            //     &&
            //     isValid(memberDetails.date_of_confirmation)
            //     &&
            //     isValid(memberDetails.home_address)
            //     &&
            //     isValid(memberDetails.baptismal_minister)
            //     &&
            //     isValid(memberDetails.baptismal_number)
            //     &&
            //     isValid(memberDetails.date_of_birth)
            //     &&
            //     isValid(memberDetails.confirmation_minister)
            // ) {
            //     console.table(memberDetails);
            // }                             

        } catch (error) {
            setCurrentMessege(`${error}`);
            setShowingMessege(true);
        }
    }

    return (
        volumes.length < 1
            ? <VolumesRegistryPage />
            : <SafeAreaView>
                {
                    loadingVolumes ? <ActivityIndicator /> :
                        <CustomScrollView>

                            <MainContainerView>

                                <ResponsiveContainer>
                                    <CustomTextInput
                                        label="name"
                                        value={memberDetails.name}
                                        onChangeText={onNameChange}
                                    />

                                </ResponsiveContainer>

                                <ResponsiveContainer>
                                    <CustomTextInput
                                        label="baptismal number"
                                        value={memberDetails.baptismal_number}
                                        onChangeText={onBaptismalNumberChange}
                                    />


                                    <CustomTextInput
                                        label="date of birth"
                                        value={memberDetails.date_of_birth}
                                        onChangeText={onDateOfBirthChange}
                                    />
                                </ResponsiveContainer>

                                <ResponsiveContainer>
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
                                </ResponsiveContainer>

                                <ResponsiveContainer>
                                    <CustomTextInput
                                        label="date of baptism"
                                        value={memberDetails.date_of_baptism}
                                        onChangeText={onDateOfBaptismChange}
                                    />

                                    <CustomTextInput
                                        label="date of confirmation"
                                        value={memberDetails.date_of_confirmation}
                                        onChangeText={onDateOfConfirmationChange}
                                    />
                                </ResponsiveContainer>

                                <ResponsiveContainer>
                                    <CustomTextInput
                                        label="father"
                                        value={memberDetails.father}
                                        onChangeText={onFatherNameChange}
                                    />

                                    <CustomTextInput
                                        label="mother"
                                        value={memberDetails.mother}
                                        onChangeText={onMotherNameChange}
                                    />
                                </ResponsiveContainer>

                                <ResponsiveContainer>
                                    <CustomTextInput
                                        label="home address/parent home address"
                                        value={memberDetails.home_address}
                                        onChangeText={onHomeAddressChange}
                                    />

                                    <CustomTextInput
                                        label="tribe"
                                        value={memberDetails.tribe}
                                        onChangeText={onMemberTribeChange}
                                    />

                                </ResponsiveContainer>

                                <ResponsiveContainer>
                                    <CustomTextInput
                                        label="Baptismal Minister"
                                        value={memberDetails.baptismal_minister}
                                        onChangeText={onBaptismalMinisterChange}
                                    />
                                    <CustomTextInput
                                        label="Confirmation Minister"
                                        value={memberDetails.confirmation_minister}
                                        onChangeText={onConfirmationMinisterChange}
                                    />
                                </ResponsiveContainer>

                                <ResponsiveContainer>
                                    <CustomTextInput
                                        label="God Father"
                                        onChangeText={onGodFatherNameChange}
                                        value={memberDetails.God_Father}
                                    />

                                    <CustomTextInput
                                        label="God Mother"
                                        value={memberDetails.God_Mother}
                                        onChangeText={onGodMotherNameChange}
                                    />
                                </ResponsiveContainer>

                                <ResponsiveContainer>
                                    <CustomTextInput
                                        label="spouse"
                                        onChangeText={onSpouseNameChange}
                                        value={memberDetails.spouse}
                                    />
                                    <CustomTextInput
                                        label="date of marriage/wedding"
                                        value={memberDetails.date_of_marriage}
                                        onChangeText={onDateOfWeddingChange}
                                    />
                                </ResponsiveContainer>

                                <ResponsiveContainer>
                                    <CustomTextInput
                                        label="observation"
                                        value={memberDetails.member_observation}
                                        onChangeText={onMemberObservsationChange}
                                    />
                                    <CustomTextInput
                                        label="Date of First Communion"
                                        value={memberDetails.Fisrt_Communion_Date}
                                        onChangeText={onChangeDateOfFirstCommunion}
                                    />
                                </ResponsiveContainer>

                                <ResponsiveContainer>
                                    <CustomTextInput
                                        label="death date"
                                        value={memberDetails.death_date}
                                        onChangeText={onMemberDateOfDeathChange}
                                    />

                                    <CustomPicker
                                        style={{ margin: 10 }}
                                        defaultValue={selectedVolumeName}
                                        onChange={function (event: any) {
                                            setSelecteVolumeName(event.currentTarget.value);
                                        }}>
                                        {
                                            volumes.map(function (volume, index: number) {
                                                return (
                                                    <option
                                                        key={index}
                                                        label={volume.vol_name.replace('members_', '')}
                                                        value={volume.vol_name.replace('members_', '')} />
                                                );
                                            })
                                        }
                                    </CustomPicker>

                                    <HorizontalSpacer width={20} />
                                </ResponsiveContainer>

                                <CustomOutlinedButton
                                    mode="contained-tonal"
                                    theme={MD3LightTheme}
                                    title={"SUBMIT"}
                                    onPress={onRegisterMember}
                                />

                            </MainContainerView>

                        </CustomScrollView>
                }

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

            </SafeAreaView>
    )
}
