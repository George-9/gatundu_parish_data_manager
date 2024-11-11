import { StyleSheet } from 'react-native';

export class STYLES {
    static get Containers() {
        return StyleSheet.create({
            main: {
                'justify-content': 'center',
                'alignItems': 'center',
                'display': 'flex',
                'flexDirection': 'column',
                'paddingVertical': 10,
                'paddingHorizontal': 20,
                'paddingBottom': 50
            }
        })
    };
}