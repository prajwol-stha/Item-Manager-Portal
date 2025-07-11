import { StyleSheet} from 'react-native'

export const FONTSIZES = {
    LARGE:20,
    MEDIUM:16,
    SMALL:14,
    EXTRASMALL:12,
}

export const COLORS={
    PRIMARY:'#B0DB9C',
    WHITE:'#FFFFFF',
    DARK:'#222222',
    DARK_L:'#555',
    GRAY_L:'#f2f2f2',
    GREEN:'#009688'
}

export const globalStyles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:COLORS.WHITE,
        padding:16,
    },
    heading1:{
        fontSize:FONTSIZES.LARGE,
        color:COLORS.DARK,
        fontWeight:600,
    },
    heading2:{
        fontSize:FONTSIZES.MEDIUM,
        color:COLORS.DARK,
        fontWeight:500,
    },
    heading3:{
        fontSize:FONTSIZES.SMALL,
        color:COLORS.DARK_L,
        fontWeight:400,
    }
})